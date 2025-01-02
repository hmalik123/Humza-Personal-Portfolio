import React from "react";
import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";
import SkillModel from "../SkillModel/SkillModel";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            const skillClass = skill.title.toLowerCase().replace(/\s+/g, '');
            return (
              <div key={id} className={`${styles.skill} ${styles[skillClass]}`}>
                <SkillModel imageSrc={skill.imageSrc} alt={skill.title} />
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.timeline}>
          {history.map((historyItem, id) => {
            return (
              <div key={id} className={styles.timelineItem}>
                <div className={styles.timelineContent}>
                  <img
                    src={getImageUrl(historyItem.imageSrc)}
                    alt={`${historyItem.organisation} Logo`}
                    className={styles.timelineLogo}
                  />
                  <div className={styles.timelineDetails}>
                    <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                    <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                    <ul>
                      {historyItem.experiences.map((experience, expId) => {
                        return <li key={expId}>{experience}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;