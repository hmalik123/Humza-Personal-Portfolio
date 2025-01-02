import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getImageUrl } from '../../utils'; // Adjust the import path as needed
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import styles from './ArduinoModel.module.css';

const ArduinoModel = () => {
  const mountRef = useRef(null);
  const isScrolling = useRef(false);
  const resizeTimeout = useRef(null);
  const scrollTimeout = useRef(null);

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
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current); // Clear previous resize timeout
      }
      resizeTimeout.current = setTimeout(() => {
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
      }, 200); // Debounce resize with 200ms delay
    };

    // Mouse move handler to change model color
    const handleMouseMove = (e) => {
      if (model && model.children[0] && model.children[0].material && !isScrolling.current) {
        const rgb = {
          r: e.clientX / currentMount.clientWidth,
          g: e.clientY / currentMount.clientHeight,
          b: 1,
        };
        const newColor = new THREE.Color(rgb.r, rgb.g, rgb.b);
        gsap.to(model.children[0].material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    };

    // Load 3D model
    const loader = new GLTFLoader();
    const modelUrl = getImageUrl('hero/Arduino.gltf'); // Adjust the path as needed
    loader.load(modelUrl, (gltf) => {
      model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4); // Adjust scale to a smaller value initially
      model.position.set(0, -0.5, 0); // Ensure fixed position, no unexpected shifts
      model.rotation.y = Math.PI; // Rotate the model to show the front
      scene.add(model);

      // GSAP animation for model load
      const tl = gsap.timeline({ defaults: { duration: 0.8 } });
      tl.fromTo(model.scale, { x: 0, y: 0, z: 0 }, { x: 0.08, y: 0.08, z: 0.08 });

      handleResize(); // Initial call to set the scale based on the initial size
    }, undefined, (error) => {
      console.error('An error happened', error);
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Handle scroll events (debounced)
    const handleScrollStart = () => {
      isScrolling.current = true;
      controls.enabled = false; // Disable OrbitControls during scroll
    };

    const handleScrollEnd = () => {
      isScrolling.current = false;
      controls.enabled = true; // Re-enable OrbitControls after scroll
    };

    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current); // Clear previous scroll timeout
      }
      scrollTimeout.current = setTimeout(handleScrollEnd, 100); // Delay scroll end handling
    };

    window.addEventListener('scroll', handleScrollStart);
    window.addEventListener('scroll', handleScroll);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight1.position.set(1, 1, 1).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight3.position.set(0, -1, 1).normalize();
    scene.add(directionalLight3);

    // Animation loop with throttling
    let lastFrameTime = 0;
    const animate = (time) => {
      if (time - lastFrameTime > 16) { // Throttle to ~60fps
        controls.update();
        renderer.render(scene, camera);
        lastFrameTime = time;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('scroll', handleScrollStart);
      window.removeEventListener('scroll', handleScroll);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={styles.webgl} />;
};

export default ArduinoModel;