import React, { useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {

  useEffect(() => {
    const els = document.querySelectorAll('[data-fadein]');
    els.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 200);
    });
  }, []);

  return (
    <section className={styles.hero}>
      <video
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/ck.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      {/* Vertical brand text on right side */}
      <div className={styles.verticalBrand}>
        {'FRESHEATS'.split('').map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.left}>

          {/* Top label with lines */}
          <div data-fadein className={styles.topLabel}>
            <span className={styles.line} />
            Now Open — Fresh Everyday
            <span className={styles.line} />
          </div>

          {/* Badge with dot */}
          <div data-fadein className={styles.badge}>
            <span className={styles.dot} />
            Fine Dining · Natural Ingredients · Made Fresh Daily
          </div>

          {/* Main heading — original wording */}
          <h1 data-fadein className={styles.heading}>
            The Best Quality<br />
            <span className={styles.green}>Food</span> Of Your<br />
            Choice.
          </h1>

          {/* Description — original wording */}
          <p data-fadein className={styles.desc}>
            Discover a dining experience crafted with the finest natural
            ingredients. Every dish tells a story of freshness, flavor, and care.
          </p>

          {/* CTA buttons */}
          <div data-fadein className={styles.ctaRow}>
            <a href="#menu" className={styles.btnPrimary}>
              Explore Menu
            </a>
            <button
              className={styles.btnSecondary}
              onClick={() => document.dispatchEvent(new CustomEvent('openBooking'))}
            >
              Reserve a Table
            </button>
          </div>

          {/* Stats */}
          <div data-fadein className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>12<span className={styles.accent}>k+</span></span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>4<span className={styles.accent}>.9</span></span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>80<span className={styles.accent}>+</span></span>
              <span className={styles.statLabel}>Menu Items</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint at bottom */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>

    </section>
  );
}