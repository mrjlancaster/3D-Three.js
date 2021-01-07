import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);


// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 4);

const ambient = new THREE.AmbientLight(0x404040, 10);
scene.add(ambient);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// // load 3d model
let loader = new GLTFLoader();
loader.load('./model.glb', (gltf) => {
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