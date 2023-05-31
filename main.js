/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
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
  DirectionalLight,
  Vector2,
  // PlaneGeometry,
  // Mesh,
  WebGLRenderer,
  // ShadowMaterial,
  PMREMGenerator,
  SRGBColorSpace,
  LoadingManager,
  PCFShadowMap,
  Group,
  // SpotLight,
  // PointLight,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(ScrollTrigger);

if (window.matchMedia('(min-width: 769px)').matches) {
  const scroller = document.querySelector('.scroller');
  const bodyScrollBar = Scrollbar.init(scroller, {
    damping: 0.03,
    delegateTo: document,
    alwaysShowTracks: true,
    continuousScrolling: true,
  });

  ScrollTrigger.scrollerProxy('.scroller', {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
  });

  bodyScrollBar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller });
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  document.querySelector('.scroll').addEventListener('click', () => {
    bodyScrollBar.scrollTo(0, 0, 4000);
  });
}

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

if (window.matchMedia('(max-width: 768px)').matches) {
  document.querySelector('.scroll').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
}

let scene;
let renderer;
let texture;
let camera;
let model;
let model2;
let model3;
let controls;
let rotate;
let colorc;
let canvas;
let PR = window.devicePixelRatio;
const mm = gsap.matchMedia();
const pixelRatio = window.devicePixelRatio;
const phone = new Group();
const cpu = new Group();
const batt = new Group();
const icon = document.querySelector('.darklight1');
const icon2 = document.querySelector('.darklight2');
const btn = document.querySelector('.darklight');
const currentTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
);

if (pixelRatio > 1) {
  PR = 1.2;
}

if (currentTheme === 'dark') {
  icon.style.display = 'block';
  icon2.style.display = 'none';
} else {
  icon.style.display = 'none';
  icon2.style.display = 'block';
}

const containerload = document.getElementById('container-load');
const progressBar = document.getElementById(
  'loader-progress-progress'
);
const progresspercent = document.getElementById('progresspercent');
const manager = new LoadingManager();
manager.onStart = () => {
  colorc = false;
  rotate = true;
};

manager.onLoad = () => {
  containerload.style.opacity = 0;
  setTimeout(() => {
    containerload.style.display = 'none';
  }, '1100');
  mm.add('(min-width: 769px)', () => {
    gsap.to(phone.position, {
      duration: 1,
      x: 0,
      y: -0.2,
    });
    gsap.fromTo(
      '.title',
      {
        duration: 1,
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
      }
    );
    gsap.fromTo(
      'section',
      {
        duration: 1,
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
      }
    );
    gsap.fromTo(
      '.options',
      {
        duration: 1,
        y: 100,
        opacity: 0,
      },
      {
        duration: 1,
        y: 0,
        opacity: 1,
      }
    );
  });

  mm.add('(max-width: 768px)', () => {
    gsap.to(phone.position, {
      duration: 1,
      x: 0,
      y: 0,
    });
    gsap.to(phone.scale, {
      duration: 1,
      x: 0.35,
      y: 0.35,
      z: 0.35,
    });
    gsap.fromTo(
      '.title',
      {
        duration: 1,
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
      }
    );
    gsap.fromTo(
      'section',
      {
        duration: 1,
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
      }
    );
    gsap.fromTo(
      '.options',
      {
        duration: 1,
        y: 100,
        opacity: 0,
      },
      {
        duration: 1,
        y: 0,
        opacity: 1,
      }
    );
  });
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  progressBar.style.width = `${(itemsLoaded / itemsTotal) * 100}%`;
  progresspercent.innerHTML = `${Math.floor(
    (itemsLoaded / itemsTotal) * 100
  )}%`;
};

manager.onError = () => {};

function init() {
  const MODEL_PATH = 'taktical_phone3.glb';
  const MODEL1_PATH = 'cpu.glb';
  const MODEL2_PATH = 'batt.glb';
  canvas = document.getElementById('c');

  renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadow = PCFShadowMap;
  renderer.setPixelRatio(PR);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  // document.body.appendChild(renderer.domElement);

  const environment = new RoomEnvironment(manager);
  const pmremGenerator = new PMREMGenerator(renderer);
  scene = new Scene();
  scene.environment = pmremGenerator.fromScene(environment).texture;
  environment.dispose();

  camera = new PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
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
  controls.enableZoom = false;

  const ktx2Loader = new KTX2Loader(manager)
    .setTranscoderPath('basis/')
    .detectSupport(renderer);

  const loader = new GLTFLoader(manager);
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(MODEL_PATH, (gltf) => {
    model = gltf.scene;
    model.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.envMap = texture;
      }
    });

    phone.scale.set(0.5, 0.5, 0.5);
    model.position.set(0, -2.6, 0);
    phone.position.set(4, 1, 0);
    phone.rotation.set(0, 0, 0.3);
    phone.add(model);
    scene.add(phone);
  });

  loader.load(MODEL1_PATH, (gltf) => {
    model2 = gltf.scene;
    model2.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.envMap = texture;
      }
    });

    cpu.position.set(0, -2.6, 0.1);
    cpu.add(model2);
    phone.add(cpu);
  });

  loader.load(MODEL2_PATH, (gltf) => {
    model3 = gltf.scene;
    model3.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.envMap = texture;
      }
    });

    batt.position.set(0, -2.6, 0.5);
    batt.add(model3);
    phone.add(batt);
  });

  // const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 3.8);
  // scene.add(hemiLight);

  const d = 2;
  const dirLight = new DirectionalLight(0xffffff, 1);
  dirLight.position.set(1, 0.5, 1);
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

  // const shadowGeometry = new PlaneGeometry(20, 20, 1, 1);
  // const shadowMaterial = new ShadowMaterial({
  // opacity: 0.3,
  // });

  // const shadowCatcher = new Mesh(shadowGeometry, shadowMaterial);
  // shadowCatcher.rotation.x = -0.5 * Math.PI;
  // shadowCatcher.receiveShadow = true;
  // shadowCatcher.position.y = 3;
  // shadowCatcher.position.z = -0.2;
  // scene.add(shadowCatcher);
}
init();

function resizeRendererToDisplaySize(renderer) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
  }
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

// const sections = gsap.utils.toArray('section');
// gsap.to('section', {
//   scrollTrigger: {
//     trigger: '.scroll-content',
//     pin: false,
//     start: 'top top',
//     end: 'bottom bottom',
//     scrub: 1,
//     snap: {
//       snapTo: 1 / (sections.length - 1),
//       duration: { min: 0.5, max: 1.5 },
//       delay: 0.1,
//       inertia: false,
//       ease: 'power1.inOut',
//     },
//   },
// });
mm.add('(min-width: 769px)', () => {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.design',
      pin: false,
      start: 'top top',
      end: '+=90%',
      scrub: 0.2,
      onEnter: () => {
        rotate = false;
      },
      onLeaveBack: () => {
        rotate = true;
      },
    },
  });
  tl1
    .to('.scrollindc', { opacity: 0 })
    .to(phone.scale, { x: 0.35, y: 0.35, z: 0.35 }, '-=70%')
    .to(
      phone.rotation,
      {
        x: (Math.PI / 180) * 180,
        y: (Math.PI / 180) * 20,
        z: (Math.PI / 180) * 90,
      },
      '-=70%'
    )
    .to(phone.position, { x: 0.2, y: 0, z: 0 }, '-=70%')
    .to(phone.scale, { x: 0.7, y: 0.7, z: 0.7 }, '-=70%');

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.power',
      pin: false,
      start: 'top center',
      end: '+=70%',
      scrub: 0.2,
    },
  });
  tl2
    .to(phone.rotation, {
      x: (Math.PI / 180) * 180,
      y: (Math.PI / 180) * 0,
      z: (Math.PI / 180) * 180,
    })
    .to(phone.position, { x: 0, y: -1, z: 0 }, '-=100%')
    .to(phone.scale, { x: 0.7, y: 0.7, z: 0.7 }, '-=100%')
    .to(cpu.position, { z: 0 }, '-=10%');

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: '.battery',
      pin: false,
      start: 'top center',
      end: '+=70%',
      scrub: 0.2,
    },
  });
  tl3
    .to(phone.rotation, {
      x: (Math.PI / 180) * 180,
      y: (Math.PI / 180) * 0,
      z: (Math.PI / 180) * 180,
    })
    .to(cpu.position, { z: 0.2 })
    .to(phone.position, { y: 1 }, '-=100%')
    .to(batt.position, { z: 0 }, '-=10%');

  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: '.display',
      pin: false,
      start: 'top center',
      end: '+=70%',
      scrub: 0.2,
    },
  });
  tl4
    .to(batt.position, { z: 0.5 })
    .to(
      phone.rotation,
      {
        x: (Math.PI / 180) * 180,
        y: (Math.PI / 180) * 200,
        z: (Math.PI / 180) * 180,
      },
      '-=100%'
    )
    .to(phone.scale, { x: 0.35, y: 0.35, z: 0.35 }, '-=100%')
    .to(phone.position, { y: 0 }, '-=100%');

  const tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: '.threedex',
      pin: false,
      start: 'top center',
      end: 'max',
      scrub: 0.2,
      onEnter: () => {
        controls.enabled = true;
        document
          .querySelector('.camera')
          .classList.toggle('cameraon');
        document.querySelector('.three').classList.toggle('threeon');
        document.querySelector('.colop').classList.toggle('colopon');
        document
          .querySelector('.options')
          .classList.toggle('optionscam');
        colorc = true;
      },
      onLeave: () => {
        controls.enableZoom = true;
      },

      onEnterBack: () => {
        controls.enabled = false;
        document
          .querySelector('.camera')
          .classList.toggle('cameraon');
        document.querySelector('.three').classList.toggle('threeon');
        document.querySelector('.colop').classList.toggle('colopon');
        document
          .querySelector('.options')
          .classList.toggle('optionscam');
        gsap.to(controls.object.position, {
          x: controls.position0.x,
          y: controls.position0.y,
          z: controls.position0.z,
          ease: 'power1',
        });
        gsap.to(controls.target, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1',
        });
        rotate = false;
        colorc = false;
      },
    },
  });
  tl5
    .to(phone.rotation, {
      x: (Math.PI / 180) * 180,
      y: (Math.PI / 180) * -180,
      z: (Math.PI / 180) * 180,
    })
    .to(phone.position, { x: 0, y: 0 }, '-=100%')
    .to(phone.scale, { x: 0.3, y: 0.3, z: 0.3 }, '-=100%')
    .to('.scroll', { opacity: 1 }, '-=80%')
    .to('.scroll', { visibility: 'visible' }, '-=80%');
});

mm.add('(max-width: 768px)', () => {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.design',
      pin: false,
      start: 'bottom-=108px bottom-=18px',
      end: '+=40%',
      scrub: 0.2,
      preventOverlaps: true,
      onEnter: () => {
        rotate = false;
      },
      onLeaveBack: () => {
        rotate = true;
      },
    },
  });
  tl1
    .to('.scrollindc', { opacity: 0 })
    .to(phone.scale, { x: 0.35, y: 0.35, z: 0.35 }, '-=70%')
    .to(
      phone.rotation,
      {
        x: (Math.PI / 180) * 180,
        y: (Math.PI / 180) * 20,
        z: (Math.PI / 180) * 90,
      },
      '-=70%'
    )
    .to(phone.position, { x: 1, y: 0, z: 0 }, '-=70%')
    .to(phone.scale, { x: 0.7, y: 0.7, z: 0.7 }, '-=70%');

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.power',
      pin: false,
      start: 'top-=108px bottom',
      end: '+=40%',
      scrub: 0.2,
      preventOverlaps: true,
    },
  });
  tl2
    .to(phone.rotation, {
      x: (Math.PI / 180) * 180,
      y: (Math.PI / 180) * 0,
      z: (Math.PI / 180) * 180,
    })
    .to(phone.position, { x: 0, y: -1, z: 0 }, '-=100%')
    .to(phone.scale, { x: 0.6, y: 0.6, z: 0.6 }, '-=100%')
    .to(cpu.position, { z: 0 }, '-=10%');

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: '.power',
      pin: false,
      start: 'bottom-=108px bottom',
      end: '+=40%',
      scrub: 0.2,
      preventOverlaps: true,
    },
  });
  tl3
    .to(phone.rotation, {
      x: (Math.PI / 180) * 180,
      y: (Math.PI / 180) * 0,
      z: (Math.PI / 180) * 180,
    })
    .to(cpu.position, { z: 0.2 })
    .to(phone.position, { y: 0.8 }, '-=100%')
    .to(batt.position, { z: 0 }, '-=10%');

  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: '.battery',
      pin: false,
      start: 'bottom-=108px bottom',
      end: '+=40%',
      scrub: 0.2,
      preventOverlaps: true,
    },
  });
  tl4
    .to(batt.position, { z: 0.5 })
    .to(
      phone.rotation,
      {
        x: (Math.PI / 180) * 180,
        y: (Math.PI / 180) * 200,
        z: (Math.PI / 180) * 180,
      },
      '-=100%'
    )
    .to(phone.scale, { x: 0.35, y: 0.35, z: 0.35 }, '-=100%')
    .to(phone.position, { y: 0 }, '-=100%');

  const tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: '.display',
      pin: false,
      start: 'bottom bottom',
      end: '+=20%',
      scrub: 0.2,
      preventOverlaps: true,
      onEnter: () => {
        controls.enabled = true;
        document
          .querySelector('.camera')
          .classList.toggle('cameraon');
        document.querySelector('.three').classList.toggle('threeon');
        document.querySelector('.colop').classList.toggle('colopon');
        document
          .querySelector('.options')
          .classList.toggle('optionscam');
        colorc = true;
      },
      onLeave: () => {
        controls.enableZoom = true;
      },

      onEnterBack: () => {
        controls.enabled = false;
        document
          .querySelector('.camera')
          .classList.toggle('cameraon');
        document.querySelector('.three').classList.toggle('threeon');
        document.querySelector('.colop').classList.toggle('colopon');
        document
          .querySelector('.options')
          .classList.toggle('optionscam');
        gsap.to(controls.object.position, {
          x: controls.position0.x,
          y: controls.position0.y,
          z: controls.position0.z,
          ease: 'power1',
        });
        gsap.to(controls.target, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1',
        });
        rotate = false;
        colorc = false;
      },
    },
  });
  tl5
    .to(phone.rotation, {
      x: (Math.PI / 180) * 0,
      y: (Math.PI / 180) * 0,
      z: (Math.PI / 180) * 0,
    })
    .to(phone.position, { x: 0, y: 0 }, '-=100%')
    .to(phone.scale, { x: 0.3, y: 0.3, z: 0.3 }, '-=100%')
    .to('.scroll', { opacity: 1 }, '-=80%')
    .to('.scroll', { visibility: 'visible' }, '-=80%');
});

if (currentTheme === 'dark') {
  document.body.classList.toggle('dark-theme');
} else if (currentTheme === 'light') {
  document.body.classList.toggle('light-theme');
}

btn.addEventListener('click', () => {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle('light-theme');
    var theme = document.body.classList.contains('light-theme')
      ? 'light'
      : 'dark';
  } else {
    document.body.classList.toggle('dark-theme');
    var theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
  }
  localStorage.setItem('theme', theme);
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
  if (colorc === true) {
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
  } else {
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
  }
});

coloptc[1].addEventListener('click', () => {
  if (colorc === true) {
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
  } else {
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
  }
});

coloptc[2].addEventListener('click', () => {
  if (colorc === true) {
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
  } else {
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
  }
});
