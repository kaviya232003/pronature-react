import React from 'react';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <a href="#" className={styles.logo}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" fill="#e8601c" opacity="0.15" />
        <path d="M17 6 C17 6 10 10 10 18 C10 22 13 25 17 26 C21 25 24 22 24 18 C24 10 17 6 17 6Z" fill="#e8601c" />
        <path d="M14 20 C14 20 15 16 17 14 C19 16 20 20 20 20" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
      <span>
        <span className={styles.pro}>Pro</span>
        <span className={styles.nat}>Nature</span>
      </span>
    </a>
  );
}
