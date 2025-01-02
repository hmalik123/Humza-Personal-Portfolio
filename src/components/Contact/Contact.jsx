import React, { useState } from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const form = e.target; // Correctly get the HTML form element
    emailjs.sendForm('service_xyywl4k', 'template_vghszlr', form, 't8_nB0fHbmt8R2F39')
      .then((result) => {
        console.log('Email successfully sent:', result.text);
        setStatusMessage("Email successfully sent!");
      }, (error) => {
        console.error('Failed to send email:', error.text);
        setStatusMessage("Failed to send email. Please try again later.");
      });

    form.reset();
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <br></br>
        <p>Get in touch with me!</p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={sendEmail}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="from_name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="from_email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
        {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
          <a href="https://www.linkedin.com/in/humza--malik/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/hmalik123" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
      </ul>
    </footer>
  );
};

export default Contact;
