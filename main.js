import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);

// Camera setup
const fov = 75;
const aspect = 2
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0.4, 3, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#ecf0f1');
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 20);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
pointLight.position.set( 0, 300, 500 );
scene.add(pointLight);

// load 3d model
let loader = new GLTFLoader();
loader.load('./bottle-model.glb', (gltf) => {
    scene.add(gltf.scene);
})


// Control setting
const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener('change', renderer);

// insert all to HTML document
document.body.appendChild(renderer.domElement);

// animation
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle screen resize
const onWindowResize = () => {
    camera.aspect = window.clientWidth / window.clientHeight;
    camera.updateProjectionMatrix(window.clientWidth, window.clientHeight);
    renderer.setSize(window.clientWidth, window.clientHeight)
}

window.addEventListener('resize', onWindowResize);
animate();
