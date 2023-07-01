import { GAME_CONFIG } from "./game-config";
import { Game } from "./classes/game.class";
import '../style.css';
import '../assets/plane-24bit.png';


window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;

  const ctx = canvas.getContext('2d');
  canvas.width = GAME_CONFIG.width;
  canvas.height = GAME_CONFIG.height;
  const game = new Game(canvas.width, canvas.height);
  game.drawAndUpdate(ctx, 0);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    console.log('deltatime:', deltaTime)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.drawAndUpdate(ctx, deltaTime);
    requestAnimationFrame(animate);
  }

  animate(lastTime);
})
