import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

// load 3d model
let loader = new GLTFLoader();
loader.load('scene.gltf', (gltf) => {
    scene.add(gltf.scene);
})

renderer.setSize(window.innerWidth, window.innerHeight);

// insert all to HTML document
document.body.appendChild(renderer.domElement);




// animation
const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}