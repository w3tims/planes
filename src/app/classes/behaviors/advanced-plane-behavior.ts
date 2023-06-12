import { cos } from "../../helpers/cos.function";
import { sin } from "../../helpers/sin.function";
import { BaseBehavior } from "./base-behavior.class";
import { GAME_CONFIG } from "../../game-config";
import { Vector } from "src/app/typings/interfaces/vector.interface";


export class AdvancedPlaneBehavior extends BaseBehavior {
  // gravity
  massKg = 2;
  g = 10;

  // spin
  spinState = -15;
  spinPower = 3;
  spinSpeed = 0;
  maxSpinSpeed = 12;

  // thurst
  motorLoad = 0;
  maxMotorLoad = 8;

  // gravity
  gravityForce: Vector = {
    direction: 90,
    value: this.massKg * this.g
  };

  // thurst
  get thurst(): Vector {
    return { direction: this.spinState, value: this.motorLoad };
  }

  // lift
  get lift(): Vector {
    return { direction: this.spinState, value: this.motorLoad };
  }

  logger: HTMLElement;

  constructor(x, y, image, width, height, inputHandler) {
    super(x, y, image, width, height, inputHandler);

    this.logger = document.getElementById('log');
  }

  log(text: string): void {
    this.logger.innerHTML = text;
  }

  override draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x + 120, this.y + 60);
    context.rotate(this.spinState * Math.PI/180);
    context.drawImage(this.image as CanvasImageSource, 0 - this.width * 2 / 3, 0 - this.height / 3, 120, 60)
    context.restore();
  }

  override update(context: CanvasRenderingContext2D) {
    this.updateThurst();
    const sumOfForces: Vector =  sumVectors(
      this.gravityForce,
      this.thurst
    );

    // this.updateSpeed();
    this.updateCoordinates();
    // this.updateCoordinatesHeavy();
  }

  updateThurst() {
    const { ArrowUp, ArrowDown } = this.inputHandler.keysPressed;
    if (ArrowUp && !ArrowDown) this.addSpeed(1);
    if (ArrowDown && !ArrowUp) this.addSpeed(-1);
    if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retard();
  }

  updateSpeed() {
    const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight} = this.inputHandler.keysPressed;
    if (ArrowUp && !ArrowDown) this.addSpeed(1);
    if (ArrowDown && !ArrowUp) this.addSpeed(-1);
    if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retard();


    if (ArrowLeft && !ArrowRight) this.addSpinSpeed(-this.spinPower);
    if (ArrowRight && !ArrowLeft) this.addSpinSpeed(this.spinPower);
    if ((!ArrowLeft && !ArrowRight) || (ArrowLeft && ArrowRight)) this.retardSpinning();
  }

  updateCoordinates() {
    // this.x = this.x + this.speed * cos(this.spinState);
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
    if (Math.abs(this.spinSpeed) < this.maxSpinSpeed) this.spinSpeed += add;
  }

  addSpeed(addSpeed: number) {
    if (Math.abs(this.motorLoad) < this.maxMotorLoad) this.motorLoad += addSpeed;
  }

  retard(): void {
    if (this.motorLoad > 0) this.motorLoad += -1;
    if (this.motorLoad < 0) this.motorLoad += 1;
  }

  retardSpinning(): void {
    // if (this.spinSpeed > 0) this.spinSpeed += -this.spinPower;
    // if (this.spinSpeed < 0) this.spinSpeed += this.spinPower;
    this.spinSpeed = 0;
  }
}
