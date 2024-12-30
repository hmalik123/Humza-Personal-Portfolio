import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Frontend</h3>
              <br></br>
              <p>
                I've worked with React, Vue.js and also worked on various project
                using just pure html, CSS and JavaScript capabilites
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Backend</h3>
              <br></br>
              <p>
                I have experience using Springboot for Java backend applications and
                also using both flask and fastapi for Python backend apps
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>Embedded Software Engineering</h3>
              <br></br>
              <p>
                I've recently been learning electronics and embedded coding working with the Arduino 
                and ESP322 Microcontrollers
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
