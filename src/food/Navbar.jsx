import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useOrder } from './OrderContext';
import styles from './Navbar.module.css';

export default function Navbar({ user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const { totalCount, toggleCart } = useCart();
  const { activeOrder, step, steps } = useOrder();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Menu', 'About', 'Contact'];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>

        <div className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>Fresh<span className={styles.logoGreen}>Eats</span></span>
        </div>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className={styles.navLink} onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>

          {/* Book table button — always visible */}
          <button
            className={styles.bookBtn}
            onClick={() => document.dispatchEvent(new CustomEvent('openBooking'))}
            title="Book a Table"
          >
            🪑
            <span className={styles.bookLabel}>Book</span>
          </button>

          {/* Tracker button — always visible, glows when order active */}
          <button
            className={`${styles.trackerBtn} ${activeOrder ? styles.trackerActive : ''}`}
            onClick={() => setShowTracker(!showTracker)}
            title="Track your order"
          >
            <span className={styles.trackerRider}>🛵</span>
            {activeOrder && <span className={styles.trackerBadge}>{step + 1}/4</span>}
          </button>

          {/* Cart button — always visible */}
          <button className={styles.cartBtn} aria-label="Cart" onClick={toggleCart}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
          </button>

          {/* User / logout */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: '600' }}>
                👤 {user.name}
              </span>
              <button className={styles.orderBtn} onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <button className={styles.orderBtn}>Order Now</button>
          )}

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <button className={styles.mobileOrderBtn}>Order Now</button>
        </div>

      </nav>

      {/* Tracker popup — shows when clicked and order is active */}
      {showTracker && (
        <div className={styles.trackerPopup}>
          <div className={styles.trackerPopupHeader}>
            <span className={styles.trackerPopupTitle}>🛵 Order Tracking</span>
            <button className={styles.trackerPopupClose} onClick={() => setShowTracker(false)}>✕</button>
          </div>
          {activeOrder ? (
            <>
              <p className={styles.trackerPopupName}>Hi {activeOrder.name}, your order is on its way!</p>
              <div className={styles.trackerSteps}>
                {steps.map((s, i) => (
                  <div key={i} className={styles.trackerStep}>
                    <div className={`${styles.stepDot} ${i <= step ? styles.stepDotActive : ''}`}>
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`${styles.stepLine} ${i < step ? styles.stepLineActive : ''}`} />
                    )}
                    <div className={styles.stepInfo}>
                      <p className={`${styles.stepLabel} ${i <= step ? styles.stepLabelActive : ''}`}>{s.label}</p>
                      <p className={styles.stepSub}>{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛵</div>
              No active order yet.<br />Place an order to track it here.
            </div>
          )}
        </div>
      )}
    </>
  );
}