// THREE.JS – escena con 3 objetos metálicos que reaccionan al mouse

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Tamaño basado en el canvas en píxeles CSS
function resizeRenderer() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height, false);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Cámara
const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  100
);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

// Luces: ambiente + direccional para resaltar “metal”
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.6);
scene.add(hemiLight);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight1.position.set(5, 8, 10);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight2.position.set(-6, -4, 5);
scene.add(dirLight2);

// Material metálico
const metalMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0.18,
});

// Grupo principal que contiene los 3 objetos
const group = new THREE.Group();
scene.add(group);

// Geometrías por defecto
const geo1 = new THREE.SphereGeometry(1.3, 64, 64);
const geo2 = new THREE.TorusKnotGeometry(0.9, 0.35, 200, 32);
const geo3 = new THREE.BoxGeometry(2.0, 1.6, 1.2);

// Meshes
const mesh1 = new THREE.Mesh(geo1, metalMaterial.clone());
const mesh2 = new THREE.Mesh(geo2, metalMaterial.clone());
const mesh3 = new THREE.Mesh(geo3, metalMaterial.clone());

// Posiciones tipo “V A P”
mesh1.position.set(-3, 0, 0);
mesh2.position.set(0, 0, 0);
mesh3.position.set(3, 0, 0);

// Opcional: ligeros tintes de color en cada uno
mesh1.material.color.setHex(0xf7f7ff);
mesh2.material.color.setHex(0xfefefe);
mesh3.material.color.setHex(0xf7f3f0);

group.add(mesh1, mesh2, mesh3);

// Variables para la interacción con el mouse
let mouseX = 0;
let mouseY = 0;

function onMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const nx = (x / rect.width) * 2 - 1; // -1 a 1
  const ny = (y / rect.height) * 2 - 1;

  mouseX = nx;
  mouseY = ny;
}

window.addEventListener("mousemove", onMouseMove);

// Animación
function animate() {
  requestAnimationFrame(animate);

  // Rotación suave basada en el mouse
  group.rotation.y = mouseX * 0.6;
  group.rotation.x = -mouseY * 0.3;

  // Rotación continua de cada pieza para dar vida
  mesh1.rotation.y += 0.01;
  mesh2.rotation.x += 0.015;
  mesh3.rotation.y -= 0.008;
  mesh3.rotation.z += 0.004;

  renderer.render(scene, camera);
}

resizeRenderer();
animate();
window.addEventListener("resize", resizeRenderer);
