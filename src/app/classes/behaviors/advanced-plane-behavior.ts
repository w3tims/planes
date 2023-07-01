import { BaseBehavior } from "./base-behavior.class";
import { Vector } from "src/app/typings/interfaces/vector.interface";
import { InputHandler } from "src/app/classes/input-handler.class";
import { sumVectors } from "../../helpers/sum-vectors.function";
import { sin } from "../../helpers/sin.function";
import { GAME_CONFIG } from "../../../app/game-config";

const cos = (degrees: number): number => {
  let radians = degrees * Math.PI/180;
  return Math.cos(radians);
}


export class AdvancedPlaneBehavior extends BaseBehavior {
  rotationPower = 3;
  rotationSpeed = 0;
  maxRotationSpeed = 6;

  motorLoad = 0;
  maxMotorLoad = 7;

  // todo change with resistance
  maxSpeed: 4;

  gravityForce: Vector = {
    direction: 90,
    value: this.massKg * this.g
  };

  get thurst(): Vector {
    return { direction: this.rotationAngle, value: this.motorLoad };
  }

  logger: HTMLElement;
  logger1: HTMLElement;
  logger2: HTMLElement;
  logger3: HTMLElement;
  logger4: HTMLElement;
  logger5: HTMLElement;

  constructor(state2d, inputHandler) {
    super(state2d, inputHandler);

    this.logger = document.getElementById('log');
    this.logger1 = document.getElementById('log1');
    this.logger2 = document.getElementById('log2');
    this.logger3 = document.getElementById('log3');
    this.logger4 = document.getElementById('log4');
    this.logger5 = document.getElementById('log5');
  }

  log(text: string): void {
    this.logger.innerHTML = text;
  }

  log1(text: string): void {
    this.logger1.innerHTML = text;
  }

  log2(text: string): void {
    this.logger2.innerHTML = text;
  }

  log3(text: string): void {
    this.logger3.innerHTML = text;
  }

  log4(text: string): void {
    this.logger4.innerHTML = text;
  }

  log5(text: string): void {
    this.logger5.innerHTML = text;
  }

  override render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x + 120, this.y + 60);
    context.rotate(this.rotationAngle * Math.PI/180);
    context.drawImage(this.image as CanvasImageSource, 0 - this.width * 2 / 3, 0 - this.height / 3, 120, 60)
    context.restore();
  }

  override update(inputHandler: InputHandler): void {
    // ======= update powers
    this.updateMotor(inputHandler);


    const angleOfAttack = this.rotationAngle - this.speed.direction;
    const liftCoefficient = Math.abs(angleOfAttack) > 90 ? 0 : cos(Math.abs(angleOfAttack)) * cos(Math.abs(angleOfAttack));
    const liftValue = this.speed.value * this.speed.value * liftCoefficient * 0.003;

    this.log1('angleOfAttack:' + angleOfAttack);
    this.log2('lift:' + angleOfAttack);
    console.log('liftCoefficient:', liftCoefficient);


    const relationToAngle = sin(Math.abs(this.speed.direction - this.rotationAngle));

    const allPowerVectors = sumVectors(
      // thurst,
      { direction: this.rotationAngle, value: this.motorLoad * 0.3 },
      // lift // todo make related to angle

      { direction: this.speed.direction - 90, value: liftValue },


      // { direction: this.speed.direction - 90, value: Math.pow(this.speed.value, 2) * 0.02 * liftCoefficient },


      // gravityForce, // fixme crutch
      { direction: 90, value: this.isOnEarth() ? 0 : this.massKg * this.g },
      // resistance // todo make related to angle


      // power of resistance
      { direction: this.speed.direction - 180, value: Math.pow(this.speed.value, 2) * 0.005},

      // power of sliding
      { direction: this.speed.direction - Math.abs(this.speed.direction - this.rotationAngle), value: Math.pow(this.speed.value, 2) * 0.005 * (relationToAngle + 0.2) },

      // { direction: this.speed.direction + 180, value: Math.pow(this.speed.value, 2) * 0.06 },

      // collision
    );

    // ======= adding overall power to current speed, so getting new speed
    const resultPower = this.y >= GAME_CONFIG.height ? {
      value: cos(allPowerVectors.direction) * allPowerVectors.value,
      direction: allPowerVectors.direction
    } : allPowerVectors




    // adding new speed to coordinates

    this.speed = sumVectors(this.speed, resultPower);
    // if (this.speed.value > this.maxSpeed) this.speed.value = this.maxSpeed;
    // if (this.speed.value >= 1) this.speed.value--;
    if (this.speed.value < 1) this.speed.value = 0

    // const sumOfForces: Vector =  sumVectors(
    //   this.gravityForce,
    //   this.thurst
    // );


    // if (liftValue > 0) {
    //   this.log(`this.speed: ${this.speed.value}`);
    //   this.log2(`this.resultPower: ${resultPower.value}`);
    //   this.log3(`this.y: ${this.y}`);
    //   this.log3(`lift: ${liftValue}`);
    //   this.log5(`angle: ${angleOfAttack}`);
    //   console.log("this:", this);
    //   throw new Error('hi');
    // }
    //

    // this.updateSpeed();
    this.updateCoordinates();
    // this.updateCoordinatesHeavy();
  }

  isOnEarth(): boolean {
    return this.y >= 2300;
  }

  updateThurst(inputHandler: InputHandler) {
    const { ArrowUp, ArrowDown } = inputHandler.keysPressed;
    if (ArrowUp && !ArrowDown) this.loadMotor(1);
    if (ArrowDown && !ArrowUp) this.loadMotor(-1);
    if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retard();
  }

  updateMotor(inputHandler: InputHandler) {
    const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight} = this.inputHandler.keysPressed;
    if (ArrowUp && !ArrowDown) this.loadMotor(1);
    if (ArrowDown && !ArrowUp) this.loadMotor(-1);
    if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retard();
    if (this.y >= GAME_CONFIG.height) this.speed.value = 0;


    if (ArrowLeft && !ArrowRight) this.addSpinSpeed(-this.rotationPower);
    if (ArrowRight && !ArrowLeft) this.addSpinSpeed(this.rotationPower);
    if ((!ArrowLeft && !ArrowRight) || (ArrowLeft && ArrowRight)) this.retardSpinning();
  }

  updateCoordinates() {
    this.x = this.x + this.speed.value * cos(this.speed.direction);
    if (this.x > GAME_CONFIG.width) this.x = this.x % GAME_CONFIG.width
    if (this.x < 0) this.x = GAME_CONFIG.width + this.x;
    //
    this.y = this.y + this.speed.value * sin(this.speed.direction);
    // if (this.y > GAME_CONFIG.height) this.y = this.y % GAME_CONFIG.height
    if (this.y > GAME_CONFIG.height - 100) this.y = GAME_CONFIG.height - 100
    if (this.y < 0) this.y = GAME_CONFIG.height + this.y;
    //
    // // TODO before or after ?
    this.rotationAngle += this.rotationSpeed;
    this.rotationAngle = this.rotationAngle % 360;
  }


  addSpinSpeed(add: number): void {
    if (Math.abs(this.rotationSpeed) < this.maxRotationSpeed) this.rotationSpeed += add;
  }

  loadMotor(addSpeed: number) {
    if (Math.abs(this.motorLoad) < this.maxMotorLoad) this.motorLoad += addSpeed;
  }

  retard(): void {
    if (this.motorLoad > 0) this.motorLoad += -1;
    if (this.motorLoad < 0) this.motorLoad += 1;
  }

  retardSpinning(): void {
    // if (this.spinSpeed > 0) this.spinSpeed += -this.spinPower;
    // if (this.spinSpeed < 0) this.spinSpeed += this.spinPower;
    this.rotationSpeed = 0;
  }
}
