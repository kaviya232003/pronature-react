import React, { useState, useRef, useEffect } from 'react';
import DishCard from './DishCard';
import AuthModal from './AuthModal';
import { menuItems, menuTabs } from '../data/content';
import styles from './MenuSection.module.css';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('pn_current') || 'null')
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const rowRef = useRef(null);
  const autoScrollRef = useRef(null);

  const filtered = activeTab === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeTab);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [filtered]);

  // Auto scroll every 3 seconds
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      const el = rowRef.current;
      if (!el || isDragging) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 1000);
    return () => clearInterval(autoScrollRef.current);
  }, [isDragging, activeTab]);

  const slide = (dir) => {
    clearInterval(autoScrollRef.current);
    rowRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  // Drag to scroll
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
    rowRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (rowRef.current) rowRef.current.style.cursor = 'grab';
  };

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowAuth(false);
  };

  const requireAuth = () => {
    const current = JSON.parse(localStorage.getItem('pn_current') || 'null');
    if (!current) { setShowAuth(true); return false; }
    return true;
  };

  return (
    <section className={styles.section} id="menu">

      {showAuth && <AuthModal onSuccess={handleAuthSuccess} />}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Our Menu</p>
          <h2 className={styles.title}>Explore Our<br />Signature Dishes</h2>
        </div>
        <p className={styles.sub}>
          Handcrafted with the finest seasonal ingredients, every plate is a
          celebration of natural flavors.
        </p>
      </div>

      {/* Tabs + scroll progress */}
      <div className={styles.tabsRow}>
        <div className={styles.tabs}>
          {menuTabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(tab.key);
                rowRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Arrow controls */}
        <div className={styles.arrowGroup}>
          <button
            className={`${styles.arrBtn} ${!canScrollLeft ? styles.arrDisabled : ''}`}
            onClick={() => slide(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button
            className={`${styles.arrBtn} ${!canScrollRight ? styles.arrDisabled : ''}`}
            onClick={() => slide(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div className={styles.sliderWrap}>
        {/* Left fade */}
        <div className={`${styles.fadeEdge} ${styles.fadeLeft} ${canScrollLeft ? styles.fadeVisible : ''}`} />

        <div
          className={styles.row}
          ref={rowRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {filtered.map((item) => (
            <DishCard key={item.id} item={item} requireAuth={requireAuth} />
          ))}
        </div>

        {/* Right fade */}
        <div className={`${styles.fadeEdge} ${styles.fadeRight} ${canScrollRight ? styles.fadeVisible : ''}`} />
      </div>

      {/* Drag hint */}
      <p className={styles.dragHint}>← Drag to explore →</p>

    </section>
  );
}