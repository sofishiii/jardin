console.log("Composición Canvas 2D - sólo líneas verticales y horizontales");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;

// Ajustar tamaño real del canvas
function resizeCanvas() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Paleta similar a la que usaste
const palette = [
  "#84D4F2", "#E3F5A1", "#DEC3E6",
  "#BFEAE0", "#DE9BC3", "#F7F7F7"
];

// Definición de una “línea” (en realidad un rectángulo largo)
class Line {
  constructor() {
    this.reset();
  }

  reset() {
    this.isHorizontal = Math.random() < 0.5;

    // Grosor de la línea
    this.thickness = Math.floor(Math.random() * 14) + 3; // 3 a 16 px

    // Largo (un poco más que el canvas para que se pierda en los bordes)
    if (this.isHorizontal) {
      this.length = W * (0.6 + Math.random() * 0.8); // 60% a 140% del ancho
    } else {
      this.length = H * (0.6 + Math.random() * 0.8); // 60% a 140% del alto
    }

    // Posiciones iniciales
    if (this.isHorizontal) {
      this.x = (Math.random() - 0.5) * W; // puede iniciar fuera
      this.y = Math.random() * H;
      this.vx = (Math.random() * 0.6 + 0.1) * (Math.random() < 0.5 ? 1 : -1);
      this.vy = 0;
    } else {
      this.x = Math.random() * W;
      this.y = (Math.random() - 0.5) * H;
      this.vx = 0;
      this.vy = (Math.random() * 0.6 + 0.1) * (Math.random() < 0.5 ? 1 : -1);
    }

    this.color = palette[Math.floor(Math.random() * palette.length)];
    this.alpha = Math.random() * 0.7 + 0.3; // 0.3 a 1
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Si se va MUCHO fuera del canvas, la reseteamos
    if (this.isHorizontal) {
      if (this.x > W * 1.2 || this.x + this.length < -W * 0.2) {
        this.reset();
      }
    } else {
      if (this.y > H * 1.2 || this.y + this.length < -H * 0.2) {
        this.reset();
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.fillStyle = this.color;

    // Sin rotar, sólo rectángulos axis-aligned
    if (this.isHorizontal) {
      ctx.fillRect(this.x, this.y - this.thickness / 2, this.length, this.thickness);
    } else {
      ctx.fillRect(this.x - this.thickness / 2, this.y, this.thickness, this.length);
    }

    ctx.restore();
  }
}

// Crear muchas líneas
const numLines = 80;
const lines = [];
for (let i = 0; i < numLines; i++) {
  lines.push(new Line());
}

// Animación principal
function animate() {
  requestAnimationFrame(animate);

  // Fondo con un ligero fade para que deje “rastros”
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, W, H);

  // Dibujar y actualizar líneas
  for (const line of lines) {
    line.update();
    line.draw(ctx);
  }
}

animate();
