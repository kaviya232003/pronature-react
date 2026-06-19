import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollToMenu = () =>
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Now Open — Fresh Everyday
        </div>

        <h1 className={styles.heading}>
          The Best Quality<br />
          <span className={styles.green}>Food</span> Of Your<br />
          Choice.
        </h1>

        <p className={styles.desc}>
          Discover a dining experience crafted with the finest natural
          ingredients. Every dish tells a story of freshness, flavor, and care.
        </p>

        <div className={styles.btns}>
          <button className={styles.viewBtn} onClick={scrollToMenu}>
            View Menu
          </button>
          <button className={styles.watchBtn}>
            <span className={styles.playIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            Watch Story
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>12<span className={styles.accent}>k+</span></span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4<span className={styles.accent}>.9</span></span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>80<span className={styles.accent}>+</span></span>
            <span className={styles.statLabel}>Menu Items</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.glowCircle} />
        <img
          className={styles.dishMain}
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85"
          alt="Featured dish"
        />
        <div className={`${styles.floatingTag} ${styles.tagTop}`}>
          <span className={styles.tagIcon}>🥗</span>
          <div>
            <div className={styles.tagTitle}>Fresh Salads</div>
            <div className={styles.tagSub}>Made daily</div>
          </div>
        </div>
        <div className={`${styles.floatingTag} ${styles.tagBot}`}>
          <span className={styles.tagIcon}>⭐</span>
          <div>
            <div className={styles.tagTitle}>Top Rated</div>
            <div className={styles.tagSub}>4.9 / 5.0</div>
          </div>
        </div>
      </div>
    </section>
  );
}
