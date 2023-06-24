import { BaseBehavior } from "./base-behavior.class";
import { Vector } from "src/app/typings/interfaces/vector.interface";
// import { sumVectors } from "src/app/helpers/sum-vectors.function";
import { InputHandler } from "src/app/classes/input-handler.class";
// import { IState2d } from "src/app/typings/interfaces/state-2d.interface";
// import { cos } from "src/app/helpers/cos.function";

const cos = (degrees: number): number => {
  let radians = degrees * Math.PI/180;
  return Math.cos(radians);
}


export class AdvancedPlaneBehavior extends BaseBehavior {
  rotationPower = 3;
  rotationSpeed = 0;
  maxRotationSpeed = 12;

  motorLoad = 0;
  maxMotorLoad = 8;

  gravityForce: Vector = {
    direction: 90,
    value: this.massKg * this.g
  };

  get thurst(): Vector {
    return { direction: this.rotationAngle, value: this.motorLoad };
  }

  get lift(): Vector {
    return { direction: this.speed.direction, value: this.motorLoad };
  }

  logger: HTMLElement;

  constructor(state2d, inputHandler) {
    super(state2d, inputHandler);

    this.logger = document.getElementById('log');
  }

  log(text: string): void {
    this.logger.innerHTML = text;
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
    this.updateSpeed();

    this.updateThurst();

    // ======= count overall power



    // ======= adding overall power to current speed, so getting new speed




    // adding new speed to coordinates


    // const sumOfForces: Vector =  sumVectors(
    //   this.gravityForce,
    //   this.thurst
    // );

    // this.updateSpeed();
    this.updateCoordinates();
    // this.updateCoordinatesHeavy();
  }

  updateThurst() {
    const { ArrowUp, ArrowDown } = this.inputHandler.keysPressed;
    if (ArrowUp && !ArrowDown) this.loadMotor(1);
    if (ArrowDown && !ArrowUp) this.loadMotor(-1);
    if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retard();
  }

  updateSpeed() {
    const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight} = this.inputHandler.keysPressed;
    if (ArrowUp && !ArrowDown) this.loadMotor(1);
    if (ArrowDown && !ArrowUp) this.loadMotor(-1);
    if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retard();


    if (ArrowLeft && !ArrowRight) this.addSpinSpeed(-this.rotationPower);
    if (ArrowRight && !ArrowLeft) this.addSpinSpeed(this.rotationPower);
    if ((!ArrowLeft && !ArrowRight) || (ArrowLeft && ArrowRight)) this.retardSpinning();
  }

  updateCoordinates() {
    this.x = this.x + this.speed.value * cos(this.speed.direction);
    // if (this.x > GAME_CONFIG.width) this.x = this.x % GAME_CONFIG.width
    // if (this.x < 0) this.x = GAME_CONFIG.width + this.x;
    //
    // if (this.y > GAME_CONFIG.height) this.y = this.y % GAME_CONFIG.height
    // if (this.y < 0) this.y = GAME_CONFIG.height + this.y;
    //
    // this.y = this.y + this.speed * sin(this.spinState);
    // // TODO before or after ?
    // this.spinState += this.spinSpeed;
    // this.spinState = this.spinState % 360;
    // this.log(`spinState: ${this.spinState}`);
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
