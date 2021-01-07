import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);

// Camera setup
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0.2, 3, 3); // x, y, z
 
// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#ecf0f1'); // background/scene color
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 13);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLightOne = new THREE.PointLight(0xc4c4c4, 5);
pointLightOne.position.set( 0, 100, 500 );
scene.add(pointLightOne);

const pointLightTwo = new THREE.PointLight(0xc4c4c4, 5);
pointLightTwo.position.set(500,100,0);
scene.add(pointLightTwo);

const pointLightThree = new THREE.PointLight(0xc4c4c4, 5);
pointLightThree.position.set(0,100,-500);
scene.add(pointLightThree);

const pointLightFour = new THREE.PointLight(0xc4c4c4, 5);
pointLightFour.position.set(-500,300,500);
scene.add(pointLightFour);

// load 3d model
let loader = new GLTFLoader();
loader.load('./Clearex-500-embedded.gltf', (gltf) => {

    scene.add(gltf.scene);
})


// const loader = new THREE.ObjectLoader();
// loader.load('./Clearex-500-embedded.json', (obj) => {
//     console.log(obj);
// })

// Control setting
const controls = new OrbitControls( camera, renderer.domElement );

// insert all to HTML document
document.body.appendChild(renderer.domElement);

// animation
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
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
