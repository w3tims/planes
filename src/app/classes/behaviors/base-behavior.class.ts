import { InputHandler } from "../input-handler.class";

export class BaseBehavior {
  x: number;
  y: number;
  image: CanvasImageSource;
  width: number;
  height: number;
  inputHandler: InputHandler;
  constructor(x, y, image, width, height, inputHandler) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = width;
    this.height = height;
    this.inputHandler = inputHandler;
  }
  render(context: CanvasRenderingContext2D) {
    this.draw(context);
    this.update(context);
  }
  draw(context: CanvasRenderingContext2D) {};
  update(context: CanvasRenderingContext2D) {};
}
