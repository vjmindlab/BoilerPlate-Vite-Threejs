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
  Scene,
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Color,
  Vector3,
  // HemisphereLight,
  // DirectionalLight,
  // Vector2,
  // PlaneGeometry,
  // Mesh,
  WebGLRenderer,
  // ShadowMaterial,
  PMREMGenerator,
  SRGBColorSpace,
  // PCFShadowMap,
  Group,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import gsap from 'gsap';

let scene;
let renderer;
let texture;
let camera;
let model;
const phone = new Group();
let controls;
const pixelRatio = window.devicePixelRatio;
let AA = true;
let PR = window.devicePixelRatio;
if (pixelRatio > 1) {
  AA = false;
  PR = 1.2;
}
let rotate = false;
const icon = document.querySelector('.darklight1');
const icon2 = document.querySelector('.darklight2');
const btn = document.querySelector('.darklight');
const currentTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
);

if (prefersDarkScheme !== true) {
  icon.style.display = 'block';
  icon2.style.display = 'none';
} else {
  icon.style.display = 'none';
  icon2.style.display = 'block';
}

if (currentTheme === 'dark') {
  document.body.classList.toggle('dark-mode');
} else if (currentTheme === 'light') {
  document.body.classList.toggle('light-mode');
}

function init() {
  const MODEL_PATH = 'taktical_phone3.glb';
  const canvas = document.querySelector('#c');

  renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: AA,
  });
  // renderer.shadowMap.enabled = true;
  // renderer.shadow = PCFShadowMap;
  renderer.setPixelRatio(PR);
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

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    50
  );
  camera.lookAt(0, 0, 0);
  camera.position.z = 2.5;
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 0.9;
  controls.maxDistance = 10;
  controls.enabled = false;

  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('basis/')
    .detectSupport(renderer);

  const loader = new GLTFLoader();
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(MODEL_PATH, (gltf) => {
    model = gltf.scene;
    model.traverse((o) => {
      if (o.isMesh) {
        // o.castShadow = true;
        // o.receiveShadow = true;
        o.envMap = texture;
      }
    });

    // model.scale.set(0.3, 0.3, 0.3); front original position
    // model.position.set(0, -0.79, 0);
    // model.scale.set(0.4, 0.4, 0.4); after intro slide in
    // model.position.set(1.7, 0.6, 0);
    // model.rotation.set(2.2, 0, 1);
    model.scale.set(0.3, 0.3, 0.3);
    model.position.set(0, -0.79, 0);
    // model.rotation.set(2.2, 0, 1);
    phone.add(model);
    scene.add(phone);
    // gsap.to(model.position, { duration: 1, x: 1.7 });
  });

  // const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 3.8);
  // scene.add(hemiLight);

  // Add directional Light to scene
  // const d = 2;
  // const dirLight = new DirectionalLight(0xffffff, 0.2);
  // dirLight.position.set(-8, 12, 8);
  // dirLight.castShadow = true;
  // dirLight.shadow.mapSize = new Vector2(2048, 2048);
  // dirLight.shadow.camera.near = 1;
  // dirLight.shadow.camera.far = 150;
  // dirLight.shadow.camera.left = d * -1;
  // dirLight.shadow.camera.right = d;
  // dirLight.shadow.camera.top = d;
  // dirLight.shadow.camera.bottom = d * -1;
  // dirLight.shadow.bias = -0.0001;
  // scene.add(dirLight);

  // const shadowGeometry = new PlaneGeometry(5, 5, 1, 1);
  // const shadowMaterial = new ShadowMaterial({
  //   opacity: 0.3,
  // });

  // Add the Shadow Catcher to scene
  // const shadowCatcher = new Mesh(shadowGeometry, shadowMaterial);
  // shadowCatcher.rotation.x = -0.5 * Math.PI;
  // shadowCatcher.receiveShadow = true;
  // shadowCatcher.position.y = -1;
  // scene.add(shadowCatcher);
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
  const multiple = 2;
  const rotationVector = new Vector3(0, 1, 0);
  const angle = ((360 / multiple) * Math.PI) / 180;
  controls.update();
  if (rotate === true) {
    phone.rotateOnAxis(rotationVector, angle * 0.002);
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

// camera controls
const cambutton = document.querySelector('.camera');
const camopt = document.querySelector('.camop');
const camoptc = document.querySelector('.camop').children;
cambutton.addEventListener('click', () => {
  cambutton.classList.toggle('active');
  camopt.classList.toggle('camopen');
  if (colopt.classList.contains('colopen')) {
    colopt.classList.toggle('colopen');
    colbutton.classList.toggle('active');
  }
});
camoptc[0].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: (Math.PI / 180) * 0,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
});

camoptc[1].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: (Math.PI / 180) * 180,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
});

camoptc[2].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: (Math.PI / 180) * 90,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
});

camoptc[3].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: (Math.PI / 180) * -90,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
});

camoptc[4].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: (Math.PI / 180) * 90,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
});

camoptc[5].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: (Math.PI / 180) * -90,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
});

camoptc[6].addEventListener('click', () => {
  if (rotate !== true) {
    rotate = true;
  } else {
    rotate = false;
  }
});

// color controls
const colbutton = document.querySelector('.colors');
const colopt = document.querySelector('.colop');
const coloptc = document.querySelector('.colop').children;
const targetColor1 = new Color(0x4c4c4c);
const targetColor2 = new Color(0x2e2e2e);
const targetColor3 = new Color(0xebebeb);
const targetColor4 = new Color(0xb7b7b7);
const targetColor5 = new Color(0xcbcbcb);
const targetColor6 = new Color(0xffffff);
colbutton.addEventListener('click', () => {
  colbutton.classList.toggle('active');
  colopt.classList.toggle('colopen');
  if (camopt.classList.contains('camopen')) {
    camopt.classList.toggle('camopen');
    cambutton.classList.toggle('active');
  }
});
coloptc[0].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: 3.15,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
  gsap.to(model.getObjectByName('back_1').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor1.r,
    g: targetColor1.g,
    b: targetColor1.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_1').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor2.r,
    g: targetColor2.g,
    b: targetColor2.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    metalness: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor1.r,
    g: targetColor1.g,
    b: targetColor1.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor1.r,
    g: targetColor1.g,
    b: targetColor1.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    metalness: 0.1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    specularIntensity: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    ior: 1.45,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_3').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor1.r,
    g: targetColor1.g,
    b: targetColor1.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_3').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor1.r,
    g: targetColor1.g,
    b: targetColor1.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
});

coloptc[1].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: 3.15,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
  gsap.to(model.getObjectByName('back_1').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor3.r,
    g: targetColor3.g,
    b: targetColor3.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_1').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor3.r,
    g: targetColor3.g,
    b: targetColor3.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    metalness: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 0.5,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor3.r,
    g: targetColor3.g,
    b: targetColor3.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor3.r,
    g: targetColor3.g,
    b: targetColor3.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    metalness: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 0.5,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    specularIntensity: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    ior: 1.45,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_3').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor3.r,
    g: targetColor3.g,
    b: targetColor3.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_3').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor6.r,
    g: targetColor6.g,
    b: targetColor6.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 0.1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor6.r,
    g: targetColor6.g,
    b: targetColor6.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 0,
    ease: 'power1',
  });
});

coloptc[2].addEventListener('click', () => {
  gsap.to(phone.rotation, {
    duration: 1,
    x: 0,
    y: 3.15,
    z: 0,
    ease: 'power1',
  });
  gsap.to(controls.object.position, {
    duration: 1,
    x: controls.position0.x,
    y: controls.position0.y,
    z: controls.position0.z,
    ease: 'power1',
  });
  gsap.to(controls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    ease: 'power1',
  });
  rotate = false;
  gsap.to(model.getObjectByName('back_1').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor4.r,
    g: targetColor4.g,
    b: targetColor4.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_1').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor5.r,
    g: targetColor5.g,
    b: targetColor5.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    metalness: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_2').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 0.2,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor5.r,
    g: targetColor5.g,
    b: targetColor5.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    metalness: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 0.1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    specularIntensity: 0,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_2').material, {
    delay: 0.5,
    duration: 0.5,
    ior: 1.5,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_3').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor5.r,
    g: targetColor5.g,
    b: targetColor5.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_3').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor5.r,
    g: targetColor5.g,
    b: targetColor5.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('back_5').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material.color, {
    delay: 0.5,
    duration: 0.5,
    r: targetColor5.r,
    g: targetColor5.g,
    b: targetColor5.b,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material, {
    delay: 0.5,
    duration: 0.5,
    iridescence: 1,
    ease: 'power1',
  });
  gsap.to(model.getObjectByName('side_4').material, {
    delay: 0.5,
    duration: 0.5,
    roughness: 0.4,
    ease: 'power1',
  });
});
