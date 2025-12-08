const canvas = document.getElementById("portrait");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// Helpers
function drawRect(x, y, w, h, color, stroke = true, fill = true, lineWidth = 4) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  if (fill && color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }
}

function drawCircle(x, y, r, color, stroke = true, fill = true, lineWidth = 4) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill && color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }
}

function drawLine(x1, y1, x2, y2, lineWidth = 4) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#000";
  ctx.stroke();
}

// Fondo tipo Mondrian / Kandinsky
function drawBackground() {
  // fondo base
  drawRect(0, 0, W, H, "#f4f4f4", false, true);

  // bloques de color
  drawRect(0, 0, W * 0.35, H * 0.35, "#f2d64b"); // amarillo
  drawRect(W * 0.65, 0, W * 0.35, H * 0.25, "#e04b3f"); // rojo
  drawRect(0, H * 0.65, W * 0.30, H * 0.35, "#3f7ae0"); // azul
  drawRect(W * 0.7, H * 0.6, W * 0.3, H * 0.4, "#ffffff"); // blanco

  // líneas negras gruesas
  drawLine(W * 0.35, 0, W * 0.35, H, 8);
  drawLine(W * 0.7, 0, W * 0.7, H, 8);
  drawLine(0, H * 0.35, W, H * 0.35, 8);
  drawLine(0, H * 0.65, W, H * 0.65, 8);

  // líneas diagonales tipo Kandinsky
  drawLine(40, 40, 200, 180, 3);
  drawLine(420, 80, 560, 10, 3);
  drawLine(80, 400, 260, 560, 3);
}

// Rostro abstracto (inspirado en cubismo / Picasso)
function drawFace() {
  const faceX = W * 0.2;
  const faceY = H * 0.18;
  const faceW = W * 0.6;
  const faceH = H * 0.55;

  // cara principal (rectángulo grande)
  drawRect(faceX, faceY, faceW, faceH, "#f7d6c5", true, true, 5);

  // dividir el rostro en dos planos (línea vertical)
  const midFaceX = faceX + faceW * 0.55;
  drawLine(midFaceX, faceY, midFaceX, faceY + faceH, 5);

  // lado derecho del rostro sombreado (rectángulo encima)
  drawRect(midFaceX, faceY, faceW * 0.45, faceH, "rgba(200, 170, 190, 0.8)", false, true);

  // ojo izquierdo (círculo)
  const leftEyeX = faceX + faceW * 0.3;
  const eyeY = faceY + faceH * 0.32;
  drawCircle(leftEyeX, eyeY, 26, "#ffffff", true, true, 3);
  drawCircle(leftEyeX, eyeY, 10, "#000");

  // ojo derecho (ojo más geométrico / rectangular)
  const rightEyeX = faceX + faceW * 0.7;
  drawRect(rightEyeX - 25, eyeY - 18, 50, 36, "#ffffff", true, true, 3);
  drawCircle(rightEyeX, eyeY, 8, "#000", true, true, 2);

  // cejas (líneas)
  drawLine(leftEyeX - 35, eyeY - 30, leftEyeX + 35, eyeY - 35, 4);
  drawLine(rightEyeX - 30, eyeY - 32, rightEyeX + 28, eyeY - 25, 4);

  // nariz (línea quebrada)
  const noseTopX = midFaceX;
  const noseTopY = faceY + faceH * 0.25;
  const noseMidY = faceY + faceH * 0.5;
  const noseBottomX = midFaceX - 15;
  const noseBottomY = faceY + faceH * 0.58;

  drawLine(noseTopX, noseTopY, noseTopX - 8, noseMidY, 4);
  drawLine(noseTopX - 8, noseMidY, noseBottomX, noseBottomY, 4);

  // boca (rectángulo y línea)
  const mouthY = faceY + faceH * 0.72;
  const mouthW = faceW * 0.45;
  const mouthX = faceX + faceW * 0.3;

  drawRect(mouthX, mouthY, mouthW, 26, "#c34a5b", true, true, 3);
  // línea dentro de la boca
  drawLine(mouthX + 8, mouthY + 13, mouthX + mouthW - 8, mouthY + 13, 2);

  // mejillas (círculos)
  drawCircle(faceX + faceW * 0.18, faceY + faceH * 0.55, 18, "#f49bb3", true, true, 2);
  drawCircle(faceX + faceW * 0.82, faceY + faceH * 0.57, 16, "#f49bb3", true, true, 2);

  // orejas (rectángulos)
  drawRect(faceX - 18, faceY + faceH * 0.3, 18, 55, "#f7d6c5", true, true, 3);
  drawRect(faceX + faceW, faceY + faceH * 0.32, 18, 55, "#f7d6c5", true, true, 3);

  // cuello (rectángulo)
  const neckW = faceW * 0.22;
  const neckH = faceH * 0.25;
  const neckX = faceX + faceW * 0.39;
  const neckY = faceY + faceH;
  drawRect(neckX, neckY, neckW, neckH, "#f0c3aa", true, true, 4);

  // hombros / torso (rectángulo grande)
  drawRect(faceX + faceW * 0.1, neckY + neckH, faceW * 0.8, H * 0.22, "#3a3a7a", true, true, 5);

  // bloques extra tipo ropa / formas geométricas
  drawRect(faceX + faceW * 0.1, neckY + neckH, faceW * 0.3, H * 0.08, "#eecf48", true, true, 3);
  drawRect(faceX + faceW * 0.6, neckY + neckH + H * 0.04, faceW * 0.25, H * 0.07, "#e04b3f", true, true, 3);

  // detalles decorativos (círculos estilo Kandinsky)
  drawCircle(faceX + faceW * 0.1, faceY + faceH * 0.18, 10, "#3f7ae0", true, true, 2);
  drawCircle(faceX + faceW * 0.9, faceY + faceH * 0.2, 8, "#e04b3f", true, true, 2);
  drawCircle(faceX + faceW * 0.5, faceY + faceH * 0.08, 12, "#f2d64b", true, true, 2);
}

// Cabello abstracto con líneas y rectángulos
function drawHair() {
  const faceX = W * 0.2;
  const faceY = H * 0.18;
  const faceW = W * 0.6;
  const faceH = H * 0.55;

  // bloque principal de cabello
  drawRect(faceX, faceY - 70, faceW * 0.7, 80, "#1b1b1b", true, true, 4);

  // mechones cuadrados
  drawRect(faceX - 10, faceY - 10, 30, 60, "#1b1b1b", true, true, 4);
  drawRect(faceX + faceW * 0.6, faceY - 10, 30, 70, "#1b1b1b", true, true, 4);

  // líneas verticales dentro del cabello
  const startX = faceX + 20;
  for (let i = 0; i < 6; i++) {
    drawLine(startX + i * 30, faceY - 65, startX + i * 30, faceY + 10, 2);
  }
}

// Dibuja todo
function drawPortrait() {
  drawBackground();
  drawHair();
  drawFace();
}

drawPortrait();
