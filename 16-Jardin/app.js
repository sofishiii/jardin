const canvas = document.getElementById("bg-canvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffb2,
  emissive: 0x00ffb2,
  emissiveIntensity: 0.6,
  roughness: 0.2,
  metalness: 0.5,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const pointLight = new THREE.PointLight(0x00ffb2, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 10;

// Animación
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.003;
  sphere.rotation.y += 0.004;
  renderer.render(scene, camera);
}
animate();

// Responsivo
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
