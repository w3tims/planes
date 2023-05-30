function sin(degrees: number): number {
  let radians = degrees * Math.PI/180;
  return Math.sin(radians);
}

function cos(degrees: number): number {
  let radians = degrees * Math.PI/180;
  return Math.cos(radians);
}

enum KeyName {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown'
}

const GAME_CONFIG = {
  width: 1024,
  height: 1024,
}

class Game {
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

  render(context: CanvasRenderingContext2D): void {
    this.plane.render(context);
  }
}

class InputHandler {
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

class BaseBehavior {
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

class SidePlaneBehavior extends BaseBehavior {
  speed = 0;
  maxSpeed = 8;

  spinState = -15;
  spinPower = 3;
  spinSpeed = 0;
  maxSpinSpeed = 12;
  logger: HTMLElement;

  mass = 50;
  power = 1300;

  constructor(x, y, image, width, height, inputHandler) {
    super(x, y, image, width, height, inputHandler);

    this.logger = document.getElementById('log');
  }

  log(text: string): void {
    this.logger.innerHTML = text;
  }

  render(context: CanvasRenderingContext2D): void {
    this.draw(context);
    this.update(context);
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x + 120, this.y + 60);
    context.rotate(this.spinState * Math.PI/180);
    context.drawImage(this.image as CanvasImageSource, 0 - this.width * 2 / 3, 0 - this.height / 3, 120, 60)
    context.restore();
  }

  update(context: CanvasRenderingContext2D) {
    this.updateSpeed();
    this.updateCoordinates();
    this.updateCoordinatesHeavy();
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
    this.x = this.x + this.speed * cos(this.spinState);
    if (this.x > GAME_CONFIG.width) this.x = this.x % GAME_CONFIG.width
    if (this.x < 0) this.x = GAME_CONFIG.width + this.x;

    if (this.y > GAME_CONFIG.height) this.y = this.y % GAME_CONFIG.height
    if (this.y < 0) this.y = GAME_CONFIG.height + this.y;

    this.y = this.y + this.speed * sin(this.spinState);
    // TODO before or after ?
    this.spinState += this.spinSpeed;
    this.spinState = this.spinState % 360;
    this.log(`spinState: ${this.spinState}`);
  }

  updateCoordinatesHeavy() {
    this.y += 5;
  }

  addSpinSpeed(add: number): void {
    if (Math.abs(this.spinSpeed) < this.maxSpinSpeed) this.spinSpeed += add;
  }

  addSpeed(addSpeed: number) {
    if (Math.abs(this.speed) < this.maxSpeed) this.speed += addSpeed;
  }

  retard(): void {
    if (this.speed > 0) this.speed += -1;
    if (this.speed < 0) this.speed += 1;
  }

  retardSpinning(): void {
    // if (this.spinSpeed > 0) this.spinSpeed += -this.spinPower;
    // if (this.spinSpeed < 0) this.spinSpeed += this.spinPower;
    this.spinSpeed = 0;
  }
}

// class TopViewBehavior extends AbstractBehavior {
//   x = 200;
//   y = 200;
//   width = 120;
//   height = 60;
//
//   // x: number;
//   // y: number;
//   // width: number;
//   // height: number;
//
//   // move
//   speedX = 0;
//   speedY = 0;
//   maxSpeed = 15;
//
//   render(context: CanvasRenderingContext2D): void {
//     this.draw(context);
//     this.update(context);
//   }
//
//   draw(context: CanvasRenderingContext2D) {
//     // context.save();
//     context.translate(this.x + 120, this.y + 60);
//     // context.rotate(this.spinState * Math.PI/360);
//     // TODO formula
//     context.drawImage(this.image as CanvasImageSource, 0 - this.width * 2 / 3, 0 - this.height / 3, 120, 60)
//     // context.restore();
//   }
//
//   update(context: CanvasRenderingContext2D) {
//     this.updateSpeedXY();
//     this.updateCoordinatesXY();
//   }
//
//   updateSpeedXY() {
//     const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight} = this.game.inputHandler.keysPressed;
//     if (ArrowUp && !ArrowDown) this.striveY(-1);
//     if (ArrowDown && !ArrowUp) this.striveY(1);
//     if (ArrowLeft && !ArrowRight) this.striveX(-1);
//     if (ArrowRight && !ArrowLeft) this.striveX(1);
//
//     if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown)) this.retardY();
//     if ((!ArrowLeft && !ArrowRight) || (ArrowLeft && ArrowRight)) this.retardX();
//   }
//
//   updateCoordinatesXY() {
//     this.x = this.x + this.speedX;
//     this.y = this.y + this.speedY;
//   }
//
//   striveX(speed: number): void {
//     if (speed > 0 && this.speedX < this.maxSpeed) this.speedX += speed;
//     if (speed < 0 && this.speedX > -this.maxSpeed) this.speedX += speed;
//   }
//
//   retardX(): void {
//     if (this.speedX > 0) this.speedX += -1;
//     if (this.speedX < 0) this.speedX += 1;
//   }
//
//   striveY(speed: number): void {
//     if (speed > 0 && this.speedY < this.maxSpeed) this.speedY += speed;
//     if (speed < 0 && this.speedY > -this.maxSpeed) this.speedY += speed;
//   }
//
//   retardY(): void {
//     if (this.speedY > 0) this.speedY += -1;
//     if (this.speedY < 0) this.speedY += 1;
//   }
// }

class Plane {
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

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;

  const ctx = canvas.getContext('2d');
  canvas.width = GAME_CONFIG.width;
  canvas.height = GAME_CONFIG.height;
  const game = new Game(canvas.width, canvas.height);
  game.render(ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})
