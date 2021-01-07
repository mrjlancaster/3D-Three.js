import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);

// Camera setup
const fov = 75;
// const aspect = 2
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
camera.position.set(0, 2, 4);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Light
const ambientLight = new THREE.AmbientLight(0x404040, 15);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// // load 3d model
let loader = new GLTFLoader();
loader.load('./bottle-model.glb', (gltf) => {
    scene.add(gltf.scene);
})

// insert all to HTML document
document.body.appendChild(renderer.domElement);

// animation
const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Handle screen resize
const onWindowResize = () => {
    camera.aspect = window.clientWidth / window.clientHeight;
    camera.updateProjectionMatrix(window.clientWidth, window.clientHeight);
    renderer.setSize()
}

animate();
window.addEventListener('resize', onWindowResize);