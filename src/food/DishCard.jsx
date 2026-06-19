import React, { useState } from 'react';
import { useCart } from './CartContext';
import styles from './DishCard.module.css';

function Stars({ rating }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? '#f5a623' : '#444' }}>★</span>
      ))}
    </span>
  );
}

export default function DishCard({ item }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className={styles.card}>
      {item.badge && <span className={styles.badge}>{item.badge}</span>}

      <div className={styles.imgWrap}>
        <img className={styles.img} src={item.img} alt={item.name} />
      </div>

      <div className={styles.rating}>
        <Stars rating={item.rating} />
        <span className={styles.reviews}>({item.reviews})</span>
      </div>

      <div className={styles.name}>{item.name}</div>
      <div className={styles.desc}>{item.desc}</div>

      <div className={styles.footer}>
        <span className={styles.price}>${item.price.toFixed(2)}</span>
        <button
          className={`${styles.addBtn} ${added ? styles.added : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓' : '+'}
        </button>
      </div>
    </div>
  );
}
