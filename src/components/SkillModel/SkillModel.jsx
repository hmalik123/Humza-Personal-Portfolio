import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getImageUrl } from '../../utils';
import { gsap } from 'gsap';
import styles from './SkillModel.module.css';

const SkillModel = ({ imageSrc, alt }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, currentMount.clientWidth / currentMount.clientHeight, 0.1, 100);
    camera.position.set(0, 1, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = false; // Disable panning
    controls.enableZoom = false; // Disable zooming

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Adjust intensity
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-5, -5, -5);
    scene.add(directionalLight);

    // Load Model
    const loader = new GLTFLoader();
    const modelUrl = getImageUrl('skills/SphericalModel.gltf');
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.05, 1.05, 1.05); // Decrease the scale of the model
        model.position.set(0, -0.5, 0); // Center the model
        scene.add(model);

        // Load PNG image as texture and create a plane
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(getImageUrl(imageSrc));
        const planeGeometry = new THREE.PlaneGeometry(0.88, 0.88); // Decrease the size of the plane
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, 0.9, 1.01); // Position the plane on the model
        model.add(plane);

        // Hover Animation using GSAP
        const hoverAnimation = () => {
          gsap.to(model.position, {
            y: '+=0.1',
            x: '+=0.1',
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
          });
          gsap.to(model.position, {
            y: '-=0.1',
            x: '-=0.1',
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
            delay: 2,
          });
        };
        hoverAnimation();

        // Lighting Animation using GSAP
        const lightingAnimation = () => {
          gsap.to(pointLight.position, {
            x: '+=5',
            y: '+=5',
            z: '+=5',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
          });
          gsap.to(pointLight.position, {
            x: '-=5',
            y: '-=5',
            z: '-=5',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
            delay: 3,
          });
          gsap.to(directionalLight.position, {
            x: '+=5',
            y: '+=5',
            z: '+=5',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
          });
          gsap.to(directionalLight.position, {
            x: '-=5',
            y: '-=5',
            z: '-=5',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
            delay: 3,
          });
        };
        lightingAnimation();

        // Animation Loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Cleanup
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={styles.skillModelContainer}>
      <div ref={mountRef} className={styles.webgl}></div>
    </div>
  );
};

export default SkillModel;