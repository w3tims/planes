import { Game } from "../game.class";
import { BaseBehavior } from "../behaviors/base-behavior.class";
import { AdvancedPlaneBehavior } from "../behaviors/advanced-plane-behavior";
import { InputHandler } from "src/app/classes/input-handler.class";

export class Plane {
  game: Game;
  image = document.getElementById('planeimage');
  behavior: BaseBehavior;

  constructor(game) {
    this.game = game;
    this.behavior = new AdvancedPlaneBehavior({
      x: 200,
      y: 200,
      image: this.image,
      width: 120,
      height: 60,
      speed: { direction: -15, value: 0 },
      centerFromLeft: 80,
      centerFromTop: 20,
      rotationAngle: -15,
      massKg: 2,
      g: 1,

    }, this.game.inputHandler);
  }

  render(context: CanvasRenderingContext2D) {
    this.behavior.render(context);
  }

  update(inputHandler: InputHandler, deltaTime: number) {
    this.behavior.update(inputHandler);
  }
}
