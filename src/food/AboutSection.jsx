import React from 'react';
import { aboutPoints } from '../data/content';
import styles from './AboutSection.module.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        <div className={styles.imgWrap}>
          <div className={styles.expBadge}>
            <div className={styles.expNum}>15</div>
            <div className={styles.expLabel}>Years<br />Experience</div>
          </div>
          <img
            className={styles.imgMain}
            src="chef image.jpg"
            alt="Chef cooking"
          />
          <img
            className={styles.imgFloat}
            src="chef image.jpg"
            alt="Restaurant interior"
          />
        </div>

        <div className={styles.right}>
          <p className={styles.eyebrow}>About Us</p>
          <h2 className={styles.title}>Why Guests Keep<br />Coming Back</h2>
          <p className={styles.desc}>
            We believe that great food starts with honest ingredients and ends with
            unforgettable memories. Every dish we serve is a reflection of our passion
            for nature and nutrition.
          </p>

          <div className={styles.list}>
            {aboutPoints.map((point) => (
              <div key={point.title} className={styles.item}>
                <div className={styles.check}><CheckIcon /></div>
                <div>
                  <div className={styles.itemTitle}>{point.title}</div>
                  <div className={styles.itemDesc}>{point.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.learnBtn}>Learn More About Us</button>
        </div>
      </div>
    </section>
  );
}
