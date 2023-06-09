import { Game } from "../game.class";
import { BaseBehavior } from "../behaviors/base-behavior.class";
import { SidePlaneBehavior } from "../behaviors/side-plane-behavior";

export class Plane {
  game: Game;
  image = document.getElementById('planeimage');
  behavior: BaseBehavior;

  constructor(game) {
    this.game = game;
    this.behavior = new SidePlaneBehavior(200, 200, this.image, 120, 60, this.game.inputHandler);
  }

  render(context: CanvasRenderingContext2D) {
    this.behavior.render(context);
  }
}
