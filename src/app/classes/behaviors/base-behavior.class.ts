import { InputHandler } from "../input-handler.class";
import { State2d } from "src/app/typings/interfaces/state-2d.interface";

export class BaseBehavior {
  state2d: State2d;

  inputHandler: InputHandler;
  constructor(state2d) {
    this.state2d = state2d
  }
  render(context: CanvasRenderingContext2D) {}
  update(inputHandler: InputHandler) {};
}
