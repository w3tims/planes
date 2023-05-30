var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function sin(degrees) {
    var radians = degrees * Math.PI / 180;
    return Math.sin(radians);
}
function cos(degrees) {
    var radians = degrees * Math.PI / 180;
    return Math.cos(radians);
}
var KeyName;
(function (KeyName) {
    KeyName["ArrowLeft"] = "ArrowLeft";
    KeyName["ArrowRight"] = "ArrowRight";
    KeyName["ArrowUp"] = "ArrowUp";
    KeyName["ArrowDown"] = "ArrowDown";
})(KeyName || (KeyName = {}));
var GAME_CONFIG = {
    width: 1024,
    height: 1024,
};
var Game = /** @class */ (function () {
    function Game(width, height) {
        this.width = width;
        this.height = height;
        this.inputHandler = new InputHandler(this);
        this.plane = new Plane(this);
    }
    Game.prototype.render = function (context) {
        this.plane.render(context);
    };
    return Game;
}());
var InputHandler = /** @class */ (function () {
    function InputHandler(game) {
        var _this = this;
        this.keysPressed = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false
        };
        this.game = game;
        window.addEventListener('keydown', function (e) { return _this.keysPressed[e.key] = true; });
        window.addEventListener('keyup', function (e) { return _this.keysPressed[e.key] = false; });
    }
    return InputHandler;
}());
var BaseBehavior = /** @class */ (function () {
    function BaseBehavior(x, y, image, width, height, inputHandler) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.inputHandler = inputHandler;
    }
    BaseBehavior.prototype.render = function (context) {
        this.draw(context);
        this.update(context);
    };
    BaseBehavior.prototype.draw = function (context) { };
    ;
    BaseBehavior.prototype.update = function (context) { };
    ;
    return BaseBehavior;
}());
var SidePlaneBehavior = /** @class */ (function (_super) {
    __extends(SidePlaneBehavior, _super);
    function SidePlaneBehavior(x, y, image, width, height, inputHandler) {
        var _this = _super.call(this, x, y, image, width, height, inputHandler) || this;
        _this.speed = 0;
        _this.maxSpeed = 8;
        _this.spinState = -15;
        _this.spinPower = 3;
        _this.spinSpeed = 0;
        _this.maxSpinSpeed = 12;
        _this.mass = 50;
        _this.power = 1300;
        _this.logger = document.getElementById('log');
        return _this;
    }
    SidePlaneBehavior.prototype.log = function (text) {
        this.logger.innerHTML = text;
    };
    SidePlaneBehavior.prototype.render = function (context) {
        this.draw(context);
        this.update(context);
    };
    SidePlaneBehavior.prototype.draw = function (context) {
        context.save();
        context.translate(this.x + 120, this.y + 60);
        context.rotate(this.spinState * Math.PI / 180);
        context.drawImage(this.image, 0 - this.width * 2 / 3, 0 - this.height / 3, 120, 60);
        context.restore();
    };
    SidePlaneBehavior.prototype.update = function (context) {
        this.updateSpeed();
        this.updateCoordinates();
        this.updateCoordinatesHeavy();
    };
    SidePlaneBehavior.prototype.updateSpeed = function () {
        var _a = this.inputHandler.keysPressed, ArrowUp = _a.ArrowUp, ArrowDown = _a.ArrowDown, ArrowLeft = _a.ArrowLeft, ArrowRight = _a.ArrowRight;
        if (ArrowUp && !ArrowDown)
            this.addSpeed(1);
        if (ArrowDown && !ArrowUp)
            this.addSpeed(-1);
        if ((!ArrowUp && !ArrowDown) || (ArrowUp && ArrowDown))
            this.retard();
        if (ArrowLeft && !ArrowRight)
            this.addSpinSpeed(-this.spinPower);
        if (ArrowRight && !ArrowLeft)
            this.addSpinSpeed(this.spinPower);
        if ((!ArrowLeft && !ArrowRight) || (ArrowLeft && ArrowRight))
            this.retardSpinning();
    };
    SidePlaneBehavior.prototype.updateCoordinates = function () {
        this.x = this.x + this.speed * cos(this.spinState);
        if (this.x > GAME_CONFIG.width)
            this.x = this.x % GAME_CONFIG.width;
        if (this.x < 0)
            this.x = GAME_CONFIG.width + this.x;
        if (this.y > GAME_CONFIG.height)
            this.y = this.y % GAME_CONFIG.height;
        if (this.y < 0)
            this.y = GAME_CONFIG.height + this.y;
        this.y = this.y + this.speed * sin(this.spinState);
        // TODO before or after ?
        this.spinState += this.spinSpeed;
        this.spinState = this.spinState % 360;
        this.log("spinState: ".concat(this.spinState));
    };
    SidePlaneBehavior.prototype.updateCoordinatesHeavy = function () {
        this.y += 5;
    };
    SidePlaneBehavior.prototype.addSpinSpeed = function (add) {
        if (Math.abs(this.spinSpeed) < this.maxSpinSpeed)
            this.spinSpeed += add;
    };
    SidePlaneBehavior.prototype.addSpeed = function (addSpeed) {
        if (Math.abs(this.speed) < this.maxSpeed)
            this.speed += addSpeed;
    };
    SidePlaneBehavior.prototype.retard = function () {
        if (this.speed > 0)
            this.speed += -1;
        if (this.speed < 0)
            this.speed += 1;
    };
    SidePlaneBehavior.prototype.retardSpinning = function () {
        // if (this.spinSpeed > 0) this.spinSpeed += -this.spinPower;
        // if (this.spinSpeed < 0) this.spinSpeed += this.spinPower;
        this.spinSpeed = 0;
    };
    return SidePlaneBehavior;
}(BaseBehavior));
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
var Plane = /** @class */ (function () {
    function Plane(game) {
        this.image = document.getElementById('planeimage');
        this.game = game;
        this.behavior = new SidePlaneBehavior(200, 200, this.image, 120, 60, this.game.inputHandler);
    }
    Plane.prototype.render = function (context) {
        this.behavior.render(context);
    };
    return Plane;
}());
window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    canvas.width = GAME_CONFIG.width;
    canvas.height = GAME_CONFIG.height;
    var game = new Game(canvas.width, canvas.height);
    game.render(ctx);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
