// Menu toggle
const menu = document.querySelector('.menu');
const menuLinks = document.querySelector('.menu-links');
menu.onclick = () => {
  menuLinks.style.display = menuLinks.style.display === 'flex' ? 'none' : 'flex';
};

// Simple 3D background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x1e90ff });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);
const light = new THREE.PointLight(0xffffff);
light.position.set(50, 50, 50);
scene.add(light);
camera.position.z = 30;
function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
