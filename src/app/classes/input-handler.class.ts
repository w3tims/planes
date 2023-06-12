import { KeyName } from "../typings/enums/key-name.enum";

export type KeysPressed = {
  [keyName in KeyName]: boolean
}

export class InputHandler {
  keysPressed: KeysPressed = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
  }
  constructor() {
    window.addEventListener('keydown',  e => this.keysPressed[e.key] = true);
    window.addEventListener('keyup',  e => this.keysPressed[e.key] = false);
  }
}
