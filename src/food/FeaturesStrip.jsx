import React from 'react';
import styles from './FeaturesStrip.module.css';

const FEATURES = [
  {
    title: 'Fast Delivery',
    sub: 'Under 30 minutes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  {
    title: '100% Natural',
    sub: 'No preservatives',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Open Daily',
    sub: '9 AM – 11 PM',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Made with Love',
    sub: "Chef's special care",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function FeaturesStrip() {
  return (
    <div className={styles.strip}>
      {FEATURES.map((f, i) => (
        <React.Fragment key={f.title}>
          <div className={styles.item}>
            <div className={styles.iconWrap}>{f.icon}</div>
            <div>
              <div className={styles.title}>{f.title}</div>
              <div className={styles.sub}>{f.sub}</div>
            </div>
          </div>
          {i < FEATURES.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
}
