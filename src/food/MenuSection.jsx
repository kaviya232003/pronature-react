import React, { useState, useRef } from 'react';
import DishCard from './DishCard';
import { menuItems, menuTabs } from '../data/content';
import styles from './MenuSection.module.css';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('all');
  const rowRef = useRef(null);

  const filtered = activeTab === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeTab);

  const slide = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} id="menu">
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

      <div className={styles.tabs}>
        {menuTabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabBtn} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.sliderWrap}>
        <button className={styles.arrBtn} onClick={() => slide(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>

        <div className={styles.row} ref={rowRef}>
          {filtered.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>

        <button className={styles.arrBtn} onClick={() => slide(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
