console.log("Three.js - Cambiar material al hacer resize");

const canvas = document.getElementById("canvas");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Cámara
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 5);
camera.lookAt(0, 0, 0);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

// Geometría del objeto central
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

// Paleta de materiales
const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff6b6b, roughness: 0.4, metalness: 0.2 }),
  new THREE.MeshStandardMaterial({ color: 0x6bc5ff, roughness: 0.2, metalness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0xf5e960, roughness: 0.6, metalness: 0.1 }),
  new THREE.MeshStandardMaterial({ color: 0xc792ea, roughness: 0.3, metalness: 0.5 }),
  new THREE.MeshNormalMaterial(), // arcoíris según las normales
];

let materialIndex = 0;
let cube = new THREE.Mesh(geometry, materials[materialIndex]);
scene.add(cube);

// Función para cambiar al siguiente material
function changeMaterial() {
  materialIndex = (materialIndex + 1) % materials.length;
  cube.material = materials[materialIndex];
  console.log("Nuevo material index:", materialIndex);
}

// Resize: ajustar renderer/cámara y cambiar material
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

  // Cambiar color/material en cada resize
  changeMaterial();
}

window.addEventListener("resize", onWindowResize);

// Animación básica (rotación lenta para que se vea bonito)
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;
  cube.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();
