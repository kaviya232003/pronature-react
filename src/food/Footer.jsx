import React from 'react';
import Logo from './Logo';
import styles from './Footer.module.css';

const quickLinks = ['Home', 'Menu', 'About Us', 'Reservations', 'Contact'];
const menuLinks = ['Starters', 'Seafood', 'Grill & BBQ', 'Vegan', 'Desserts'];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.desc}>
            A celebration of natural food, bold flavors, and meaningful dining
            experiences since 2009.
          </p>
          <div className={styles.social}>
            {['fb', 'ig', 'tw'].map((s) => (
              <div key={s} className={styles.socialBtn}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                  {s === 'fb' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                  {s === 'ig' && (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="#888" />
                    </>
                  )}
                  {s === 'tw' && (
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 16 2a4.48 4.48 0 0 0-4.47 4.47c0 .35.04.69.1 1.02A12.74 12.74 0 0 1 2.69 3s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  )}
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Quick Links</div>
          <ul className={styles.linkList}>
            {quickLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Our Menu</div>
          <ul className={styles.linkList}>
            {menuLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Contact</div>
          <div className={styles.contactList}>
            <div className={styles.contactRow}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>42 Green Lane, Garden District, CA 90210</span>
            </div>
            <div className={styles.contactRow}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+1 800 PRO-NATU</span>
            </div>
            <div className={styles.contactRow}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>hello@pronature.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>© 2025 ProNature Restaurant. All rights reserved.</span>
        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
