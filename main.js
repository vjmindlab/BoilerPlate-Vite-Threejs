/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  // Clock,
  Scene,
  // EquirectangularReflectionMapping,
  ACESFilmicToneMapping,
  PerspectiveCamera,
  // AnimationMixer,
  // AnimationClip,
  HemisphereLight,
  DirectionalLight,
  Vector2,
  PlaneGeometry,
  Mesh,
  WebGLRenderer,
  ShadowMaterial,
  PMREMGenerator,
  SRGBColorSpace,
  PCFShadowMap,
  Group,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
// import gsap from 'gsap';

let scene;
let renderer;
let texture;
let camera;
let model;
const phone = new Group();
// let mixer;
// let idle;
let controls;
// const clock = new Clock();

function init() {
  const MODEL_PATH = 'taktical_phone3.glb';
  const canvas = document.querySelector('#c');

  renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadow = PCFShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  document.body.appendChild(renderer.domElement);

  const environment = new RoomEnvironment();
  const pmremGenerator = new PMREMGenerator(renderer);
  scene = new Scene();
  scene.environment = pmremGenerator.fromScene(environment).texture;
  environment.dispose();

  // new RGBELoader()
  //   .setPath('./public/')
  //   .load('neutral.hdr', (texture) => {
  //     texture.mapping = EquirectangularReflectionMapping;

  //     // scene.background = texture;
  //     scene.environment = texture;
  //   });

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    50
  );
  camera.position.z = 2.5;
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // controls.dampingFactor = 2;
  // controls.autoRotate = true;

  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('basis/')
    .detectSupport(renderer);

  const loader = new GLTFLoader();
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(MODEL_PATH, (gltf) => {
    model = gltf.scene;
    // const fileAnimations = gltf.animations;
    model.traverse((o) => {
      if (o.isMesh) {
        // o.frustumCulled = false; // Fix the disapearing mesh due to Meshopt compression
        o.castShadow = true;
        o.receiveShadow = true;
        o.envMap = texture;
      }
    });

    // console.log(model);
    // model.getObjectByName('front_1').material.color.setHex(0xabb3a9);
    // model.getObjectByName('back_9').material.color.setHex(0x6b7067);
    // model
    //   .getObjectByName('front005_2')
    //   .material.color.setHex(0x7f8980);
    // model.getObjectByName('back_2').material.specularIntensity = 1;
    model.scale.set(0.3, 0.3, 0.3);
    model.position.set(0, -0.79, 0);
    phone.add(model);
    scene.add(phone);

    // loaderAnim.remove();

    // mixer = new AnimationMixer(model);

    // const idleAnim = AnimationClip.findByName(fileAnimations, 'idle');

    // idle = mixer.clipAction(idleAnim);
    // idle.play();
  });

  const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.2);
  scene.add(hemiLight);

  // Add directional Light to scene
  const d = 2;
  const dirLight = new DirectionalLight(0xffffff, 0.2);
  dirLight.position.set(-8, 12, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new Vector2(2048, 2048);
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 150;
  dirLight.shadow.camera.left = d * -1;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = d * -1;
  dirLight.shadow.bias = -0.0001;
  scene.add(dirLight);

  const shadowGeometry = new PlaneGeometry(5, 5, 1, 1);
  const shadowMaterial = new ShadowMaterial({
    opacity: 0.3,
  });

  // Add the Shadow Catcher to scene
  const shadowCatcher = new Mesh(shadowGeometry, shadowMaterial);
  shadowCatcher.rotation.x = -0.5 * Math.PI;
  shadowCatcher.receiveShadow = true;
  shadowCatcher.position.y = -1;
  scene.add(shadowCatcher);
}
init();

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvasPixelWidth = canvas.width / window.devicePixelRatio;
  const canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize =
    canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  controls.update();
  phone.rotation.y += 0.005;

  // if (mixer) {
  //   mixer.update(clock.getDelta());
  // }

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// const green = document.querySelector('.green');
// green.addEventListener('click', () => {
//   gsap.to(phone.rotation, {
//     duration: 3,
//     x: 0,
//     y: 9,
//     z: 0,
//     ease: 'power1',
//   });
//   gsap.to(controls.object.position, {
//     duration: 3,
//     x: controls.position0.x,
//     y: controls.position0.y,
//     z: controls.position0.z,
//     ease: 'power1',
//   });
//   model.getObjectByName('front_1').material.color.setHex(0x5f645a);
//   model.getObjectByName('back_9').material.color.setHex(0x5f645a);
//   model.getObjectByName('front_5').material.color.setHex(0x5f645a);
// });

// const black = document.querySelector('.black');
// black.addEventListener('click', () => {
//   gsap.to(phone.rotation, {
//     duration: 1,
//     x: 0,
//     y: 9,
//     z: 0,
//     ease: 'power1',
//   });
//   gsap.to(controls.object.position, {
//     duration: 1,
//     x: controls.position0.x,
//     y: controls.position0.y,
//     z: controls.position0.z,
//     ease: 'power1',
//   });
//   model.getObjectByName('front_1').material.color.setHex(0x211e16);
//   model.getObjectByName('back_9').material.color.setHex(0x211e16);
//   model.getObjectByName('front_5').material.color.setHex(0x211e16);
// });

// const lavender = document.querySelector('.lavender');
// lavender.addEventListener('click', () => {
//   gsap.to(phone.rotation, {
//     duration: 1,
//     x: 0,
//     y: 9,
//     z: 0,
//     ease: 'power1',
//   });
//   gsap.to(controls.object.position, {
//     duration: 1,
//     x: controls.position0.x,
//     y: controls.position0.y,
//     z: controls.position0.z,
//     ease: 'power1',
//   });
//   model.getObjectByName('front_1').material.color.setHex(0xd4c7d9);
//   model.getObjectByName('back_9').material.color.setHex(0xd4c7d9);
//   model.getObjectByName('front_5').material.color.setHex(0xd4c7d9);
// });

// const cream = document.querySelector('.cream');
// cream.addEventListener('click', () => {
//   gsap.to(phone.rotation, {
//     duration: 1,
//     x: 0,
//     y: 9,
//     z: 0,
//     ease: 'power1',
//   });
//   gsap.to(controls.object.position, {
//     duration: 3,
//     x: controls.position0.x,
//     y: controls.position0.y,
//     z: controls.position0.z,
//     ease: 'power1',
//   });
//   model.getObjectByName('front_1').material.color.setHex(0xf0eae0);
//   model.getObjectByName('back_9').material.color.setHex(0xf0eae0);
//   model.getObjectByName('front_5').material.color.setHex(0xf0eae0);
// });

// const links = document.querySelectorAll('.bts');

// if (links.length) {
//   links.forEach((link) => {
//     link.addEventListener('click', (e) => {
//       links.forEach((link) => {
//         link.classList.remove('active');
//       });
//       e.preventDefault();
//       link.classList.add('active');
//     });
//   });
// }

const icon = document.querySelector('.darklight1');
const icon2 = document.querySelector('.darklight2');
const btn = document.querySelector('.darklight');
const prefersDarkScheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
);

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.toggle('dark-theme');
  icon.style.display = 'block';
  icon2.style.display = 'none';
} else if (currentTheme === 'light') {
  document.body.classList.toggle('light-theme');
  icon.style.display = 'none';
  icon2.style.display = 'block';
}

btn.addEventListener('click', () => {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme')
      ? 'light'
      : 'dark';
    localStorage.setItem('theme', theme);
  } else {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', theme);
  }
});

btn.addEventListener('click', () => {
  const light = document.body.classList.contains('light-theme');
  if (light !== true) {
    icon.style.display = 'block';
    icon2.style.display = 'none';
  } else {
    icon.style.display = 'none';
    icon2.style.display = 'block';
  }
});
