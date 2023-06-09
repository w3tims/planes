import { KeyName } from "../typings/enums/key-name.enum";
import { Game } from "./game.class";

export class InputHandler {
  keysPressed: {
    [keyName in KeyName]: boolean
  } = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
  }
  game: Game;
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown',  e => this.keysPressed[e.key] = true);
    window.addEventListener('keyup',  e => this.keysPressed[e.key] = false);
  }
}
