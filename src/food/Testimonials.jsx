import React from 'react';
import { testimonials } from '../data/content';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>Testimonials</p>
        <h2 className={styles.title}>What Our Guests Say</h2>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div key={t.id} className={styles.card}>
            <div className={styles.quote}>"</div>
            <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.author}>
              <img className={styles.avatar} src={t.avatar} alt={t.name} />
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
