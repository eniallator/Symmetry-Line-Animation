const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const minDim = Math.min(window.innerWidth, window.innerHeight);
canvas.width = canvas.height = minDim;

const maxDim = { x: canvas.width, y: canvas.height };
const minSpawnTime = minDim / 7;
const spawnRandomness = minDim / 20;
const maxLines = 15;

const lines = [new Line(0, 0, (Math.random() * Math.PI) / 4)];

ctx.fillStyle = "black";
ctx.strokeStyle = "white";
ctx.lineWidth = minDim / 108;

function run() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let line of lines) {
    line.update(maxDim, lines);
    line.draw(ctx, maxDim);
  }

  requestAnimationFrame(run);
}

run();
