import { InputHandler } from "../input-handler.class";
import { IState2d } from "src/app/typings/interfaces/state-2d.interface";
import { State2d } from "../../typings/classes/state-2d.class";

export class BaseBehavior extends State2d {
  inputHandler: InputHandler;
  constructor(state2d: IState2d, inputHandler: InputHandler) {
    super(state2d)
    this.inputHandler = inputHandler;
  }
  render(context: CanvasRenderingContext2D) {}
  update(inputHandler: InputHandler) {};
}
