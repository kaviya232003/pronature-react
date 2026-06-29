import React from 'react';
import styles from './BookingCTA.module.css';

export default function BookingCTA() {
  return (
    <section className={styles.section} id="booking">
      <div className={styles.bgCircle1} />
      <div className={styles.bgCircle2} />
      <p className={styles.eyebrow}>Reservations</p>
      <h2 className={styles.title}>Ready for an<br />Unforgettable Meal?</h2>
      <p className={styles.sub}>
        Book your table today and let us take care of the rest.<br />
        Private dining & event catering also available.
      </p>
      <div className={styles.btns}>
       
        <button className={styles.secondary}>Call Us: +1 800 PRO-NATU</button>
      </div>
    </section>
  );
}
