import React, { useState, useEffect, useRef } from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, source },
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (isFlipped && window.innerWidth <= 830) {
      timerRef.current = setTimeout(() => {
        setIsFlipped(false);
      }, 10000); // 10 seconds
    }

    return () => clearTimeout(timerRef.current);
  }, [isFlipped]);

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onClick={handleCardClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img
            src={getImageUrl(imageSrc)}
            alt={`Image of ${title}`}
            className={styles.image}
          />
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.cardBack}>
          <p className={styles.description}>{description}</p>
          <a href={source} className={styles.githubLink} target="_blank" rel="noopener noreferrer">
            <img
              src={getImageUrl("contact/githubIcon.png")}
              alt="GitHub Logo"
              className={styles.githubIcon}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
