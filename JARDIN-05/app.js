console.log("Op Art estilo líneas convergentes");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

const centerX = width / 2;
const centerY = height / 2;

const numLines = 60;
const spacing = 15;
ctx.strokeStyle = "black";
ctx.lineWidth = 1;

for (let i = -numLines; i <= numLines; i++) {
  const offset = i * spacing;

  ctx.beginPath();
  ctx.moveTo(0, centerY + offset);
  ctx.lineTo(centerX, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width, centerY + offset);
  ctx.lineTo(centerX, centerY);
  ctx.stroke();
}

const vCount = 30;
for (let i = -vCount; i <= vCount; i++) {
  const x = centerX + i * spacing;

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(centerX, centerY);
  ctx.stroke();
}

for (let i = -vCount; i <= vCount; i++) {
  const x = centerX + i * spacing;

  ctx.beginPath();
  ctx.moveTo(x, height);
  ctx.lineTo(centerX, centerY);
  ctx.stroke();
}
