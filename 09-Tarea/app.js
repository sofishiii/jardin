console.log('sesión 06. Tareas - MATCAPS arbol');
console.log(THREE);

const canvas = document.getElementById('lienzo');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 10;

const textureLoader = new THREE.TextureLoader();

let trunkMesh, crownMesh;
let crownMaterial;

const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
const crownGeometry = new THREE.BoxGeometry(2, 2, 2);

textureLoader.load('./assets/matcap2.png', function (matcapTexture2) {
  const trunkMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });

  trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunkMesh.position.y = -1.5;
  scene.add(trunkMesh);

  textureLoader.load('./assets/matcap3.png', function (matcapTexture3) {
    crownMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 });

    crownMesh = new THREE.Mesh(crownGeometry, crownMaterial);
    crownMesh.position.y = 1.5;
    scene.add(crownMesh);

    animate();
  },
  undefined,
  function (error) {
    console.error('Error cargando matcap3.png:', error);
  });

},
undefined,
function (error) {
  console.error('Error cargando matcap2.png:', error);
});

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.width, canvas.height);

// 🎨 Botón cambiar color
document.getElementById('cambiarColor').addEventListener('click', () => {
  if (crownMaterial) {
    const nuevoMaterial = new THREE.MeshMatcapMaterial({
      matcap: crownMaterial.matcap,
      color: new THREE.Color(Math.random(), Math.random(), Math.random())
    });

    crownMesh.material = nuevoMaterial;
    renderer.render(scene, camera);
  }
});

// 🔍 Zoom In y Zoom Out con GSAP
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

const originalZ = 10;
const zoomedInZ = 5; // Más cerca pero sin atravesar el árbol

zoomInBtn.addEventListener('click', () => {
  gsap.to(camera.position, {
    z: zoomedInZ,
    duration: 1,
    ease: 'power2.inOut'
  });
});

zoomOutBtn.addEventListener('click', () => {
  gsap.to(camera.position, {
    z: originalZ,
    duration: 1,
    ease: 'power2.inOut'
  });
});

function animate() {
  requestAnimationFrame(animate);

  if (trunkMesh) trunkMesh.rotation.y += 0.01;
  if (crownMesh) crownMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}
