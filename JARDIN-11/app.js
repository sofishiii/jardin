console.log("Three.js + GSAP - Rotación 720°");

// Obtener canvas
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
scene.background = new THREE.Color(0x02010a);

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

// Geometría al centro (puedes cambiarla por BoxGeometry, SphereGeometry, etc.)
const geometry = new THREE.TorusKnotGeometry(1, 0.35, 200, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xff7ac4,
  metalness: 0.6,
  roughness: 0.25,
});
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Pequeño giro constante para que nunca esté totalmente quieto
function animate() {
  requestAnimationFrame(animate);

  knot.rotation.y += 0.003;
  knot.rotation.x += 0.0015;

  renderer.render(scene, camera);
}
animate();

// Ajustar al redimensionar ventana
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}
window.addEventListener("resize", onWindowResize);

// Botón y animación con GSAP
const spinBtn = document.getElementById("spinBtn");
let isSpinning = false;

spinBtn.addEventListener("click", () => {
  if (isSpinning) return; // evitar spameo mientras gira

  isSpinning = true;

  // Guardar ángulo inicial
  const startY = knot.rotation.y;

  // 720° = 2 * PI * 2 = 4 * PI radianes
  gsap.to(knot.rotation, {
    y: startY + Math.PI * 4,
    duration: 2,
    ease: "power2.inOut",
    onComplete: () => {
      isSpinning = false;
    },
  });
});
