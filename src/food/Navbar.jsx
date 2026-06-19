import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useCart } from './CartContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { totalCount, toggleCart } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) setActive(s.id);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Logo />

      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace('#', '');
          return (
            <li key={label}>
              <a
                href={href}
                className={`${styles.link} ${active === id ? styles.active : ''}`}
                onClick={(e) => {
                  if (href !== '#') {
                    e.preventDefault();
                    scrollTo(id);
                  }
                }}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className={styles.right}>
        <button className={styles.cartBtn} onClick={toggleCart} aria-label="Open cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
        </button>
        <button className={styles.bookBtn} onClick={() => scrollTo('booking')}>
          Book A Table
        </button>
        <div className={styles.hamburger}>
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}
