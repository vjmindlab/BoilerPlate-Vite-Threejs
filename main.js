/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  Clock,
  Scene,
  EquirectangularReflectionMapping,
  sRGBEncoding,
  ACESFilmicToneMapping,
  PerspectiveCamera,
  AnimationMixer,
  AnimationClip,
  HemisphereLight,
  DirectionalLight,
  Vector2,
  PlaneGeometry,
  Mesh,
  WebGLRenderer,
  ShadowMaterial,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

let scene;
let renderer;
let texture;
let camera;
let model;
let mixer;
let idle;
const clock = new Clock();

function init() {
  const MODEL_PATH = 'suzanne.glb';
  const canvas = document.querySelector('#c');

  scene = new Scene();

  new RGBELoader().setPath('').load('neutral.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  });

  renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  document.body.appendChild(renderer.domElement);

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    50
  );
  camera.position.z = 3;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(MODEL_PATH, (gltf) => {
    model = gltf.scene;
    const fileAnimations = gltf.animations;
    model.traverse((o) => {
      if (o.isMesh) {
        o.frustumCulled = false; // Fix the disapearing mesh due to Meshopt compression
        o.castShadow = true;
        o.receiveShadow = true;
        o.envMap = texture;
      }
    });

    model.scale.set(1, 1, 1);
    scene.add(model);

    // loaderAnim.remove();

    mixer = new AnimationMixer(model);

    const idleAnim = AnimationClip.findByName(fileAnimations, 'idle');

    idle = mixer.clipAction(idleAnim);
    idle.play();
  });

  const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.2);
  scene.add(hemiLight);

  // Add directional Light to scene
  const d = 2;
  const dirLight = new DirectionalLight(0xffffff, 0.2);
  dirLight.position.set(-8, 12, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new Vector2(1024, 1024);
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 150;
  dirLight.shadow.camera.left = d * -1;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = d * -1;
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

function resizeRendererToDisplaySize() {
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
  if (mixer) {
    mixer.update(clock.getDelta());
  }

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
