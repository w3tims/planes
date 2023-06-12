import { InputHandler } from "./input-handler.class";
import { Plane } from "./objects/plane.class";

export class Game {
  width: number;
  height: number;
  inputHandler: InputHandler;
  plane: Plane;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.inputHandler = new InputHandler(this);
    this.plane = new Plane(this);
  }

  drawAndUpdate(context: CanvasRenderingContext2D): void {
    this.plane.render(context);
  }
}
