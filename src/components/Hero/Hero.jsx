import React from "react";
import styles from "./Hero.module.css";
import ArduinoModel from "../3Dmodel/ArduinoModel";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Left Side: SVG Icon */}
        <div className={styles.scrollWrapper}>
          <svg
            className={styles.scrollIcon}
            width="40"
            height="120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="10" r="5" fill="lightblue" />
            <line
              x1="20"
              y1="20"
              x2="20"
              y2="120"
              stroke="lightblue"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Right Side: Text Content */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Hi, I'm <span className={styles.highlight}>Humza</span>
          </h1>
          <p className={styles.description}>
            I'm a full-stack developer currently part of the Energus graduate
            scheme sponsored by Rolls-Royce.
          </p>
        </div>
      </div>

      {/* 3D Model Section */}
      <div className={styles.threeDModelWrapper}>
        <ArduinoModel />
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
