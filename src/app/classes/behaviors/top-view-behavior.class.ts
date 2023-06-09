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
