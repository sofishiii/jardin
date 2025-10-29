import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

// Crear escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0d0d);

// Cámara
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

// Renderizador
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luz
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// Geometría y material (puedes cambiar por torus, box, etc.)
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x8a2be2,
  metalness: 0.8,
  roughness: 0.2,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Animación
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  // Movimiento de levitación (seno)
  sphere.position.y = Math.sin(t) * 0.5; // sube y baja suavemente

  // Rotación suave
  sphere.rotation.y += 0.01;
  sphere.rotation.x = Math.cos(t) * 0.1;

  renderer.render(scene, camera);
}

animate();

// Responsivo
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
