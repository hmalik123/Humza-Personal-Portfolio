import React from "react";
import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <p>
                I'm a BSC computer science graduate from Brunel University London, and have since been working with full-stack 
                technologies such as React for frontend and Spring Boot, Flask for backend projects using Java and Python.
                I've recently also developed an interest in embedded software engineering and have been working with the Arduino and ESP32 microcontrollers
                for IoT creations using C++. I'm very passionate about the tech industry and hope to make some positive changes in the world with my skills!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};