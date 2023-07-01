import { InputHandler } from "./input-handler.class";
import { Plane } from "./objects/plane.class";

export class Game {
  width: number;
  height: number;
  inputHandler = new InputHandler();
  plane: Plane;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.plane = new Plane(this);
  }

  drawAndUpdate(context: CanvasRenderingContext2D, deltaTime: number): void {
    this.plane.render(context);
    this.plane.update(this.inputHandler, deltaTime);
  }
}
