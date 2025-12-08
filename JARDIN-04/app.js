console.log("sesión 09. Tareas - MATCAPS en 3D mejorado");
console.log(THREE);

// Configurar canvas y renderer
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); 

// Cámara con perspectiva y ligera inclinación
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 600);
camera.lookAt(0, 0, 0);

// Luces para destacar profundidad y formas
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const palette = [
  "#84D4F2", "#E3F5A1", "#DEC3E6",
  "#BFEAE0", "#DE9BC3", "#F7F7F7"
];

// Medidas del espacio
const width = window.innerWidth;
const height = window.innerHeight;
const halfWidth = width / 2;
const halfHeight = height / 2;

// Crear "líneas 3D" como cajas
const numLines = 100;

for (let i = 0; i < numLines; i++) {
  const isHorizontal = Math.random() < 0.5;
  const thickness = Math.floor(Math.random() * 4) + 1;
  const depth = Math.random() * 40 + 10; //profundidad
  const color = palette[Math.floor(Math.random() * palette.length)];

  let geometry;
  if (isHorizontal) {
    geometry = new THREE.BoxGeometry(width, thickness, depth);
  } else {
    geometry = new THREE.BoxGeometry(thickness, height, depth);
  }

  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 });
  const box = new THREE.Mesh(geometry, material);

  // Posicionar caja en plano XY
  box.position.x = isHorizontal ? 0 : Math.random() * width - halfWidth;
  box.position.y = isHorizontal ? Math.random() * height - halfHeight : 0;
  box.position.z = Math.random() * 200 - 100; // Algunas cajas más cerca, otras más lejos

  scene.add(box);
}

// Animación y rotación para dar más sensación de 3D
function animate() {
  requestAnimationFrame(animate);

  scene.rotation.y += 0.0015;
  scene.rotation.x += 0.0007;

  renderer.render(scene, camera);
}
animate();
