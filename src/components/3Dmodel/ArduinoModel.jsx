import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getImageUrl } from '../../utils'; // Adjust the import path as needed
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import styles from './ArduinoModel.module.css';

const ArduinoModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, currentMount.clientWidth / currentMount.clientHeight, 0.1, 100);
    camera.position.set(0, 1, 20); // Adjust the camera position to fit the model

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Set clear color to black with 0 opacity (transparent)
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = false; // Disable panning
    controls.enableZoom = false; // Disable zooming
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // Variable to hold the model
    let model;

    // Resize handler to adjust model scale
    const handleResize = () => {
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (model) {
        if (width < 576) {
          model.scale.set(0.1, 0.1, 0.1); // Smaller scale for mobile screens
        } else if (width < 768) {
          model.scale.set(0.2, 0.2, 0.2); // Medium scale for tablets
        } else if (width < 1024) {
          model.scale.set(0.3, 0.3, 0.3); // Medium-large scale for small laptops
        } else if (width < 1440) {
          model.scale.set(0.35, 0.35, 0.35); // Large scale for larger laptops
        } else {
          model.scale.set(0.4, 0.4, 0.4); // Default scale for larger screens
        }
      }
    };

    // Load 3D model
    const loader = new GLTFLoader();
    const modelUrl = getImageUrl('hero/Arduino.gltf'); // Adjust the path as needed
    loader.load(modelUrl, (gltf) => {
      model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4); // Adjust scale to a smaller value
      model.position.set(0, -0.5, 0); // Adjust position to fit within the container
      scene.add(model);

      // GSAP animation for model load
      const tl = gsap.timeline({ defaults: { duration: 0.8 } });
      tl.fromTo(model.scale, { x: 0, y: 0, z: 0 }, { x: 0.08, y: 0.08, z: 0.08 });

      const tl_title = gsap.timeline({ defaults: { duration: 5 } });
      tl_title.fromTo(".title", { opacity: 0 }, { opacity: 1 });

      // Color change animation on mousemove
      const rgb = { r: 1, g: 1, b: 1 };
      window.addEventListener("mousemove", (e) => {
        rgb.r = e.clientX / currentMount.clientWidth;
        rgb.g = e.clientY / currentMount.clientHeight;
        const newColor = new THREE.Color(rgb.r, rgb.g, rgb.b);
        gsap.to(model.children[0].material.color, { r: newColor.r, g: newColor.g, b: newColor.b });
      });

      handleResize(); // Initial call to set the scale based on the initial size
    }, undefined, (error) => {
      console.error('An error happened', error);
    });

    window.addEventListener('resize', handleResize);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Adjusted and additional directional lights for better illumination
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight1.position.set(1, 1, 1).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight3.position.set(0, -1, 1).normalize();
    scene.add(directionalLight3);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={styles.webgl} />;
};

export default ArduinoModel;