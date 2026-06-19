import React, { useState } from 'react';
import { useCart } from './CartContext';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalPrice,
  } = useCart();

  const [placed, setPlaced] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setPlaced(true);
    setTimeout(() => {
      setPlaced(false);
      clearCart();
      closeCart();
    }, 2200);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={closeCart}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Your Order</h3>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {placed ? (
          <div className={styles.successWrap}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.successTitle}>Order Placed!</div>
            <p className={styles.successSub}>Your food is being prepared with care.</p>
          </div>
        ) : items.length === 0 ? (
          <div className={styles.emptyWrap}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyText}>Your cart is empty</p>
            <p className={styles.emptySub}>Add some delicious dishes from our menu</p>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img className={styles.itemImg} src={item.img} alt={item.name} />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
                  </div>
                  <div className={styles.qtyControls}>
                    <button className={styles.qtyBtn} onClick={() => decrement(item.id)}>−</button>
                    <span className={styles.qtyNum}>{item.qty}</span>
                    <button className={styles.qtyBtn} onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.row}>
                <span>Delivery Fee</span>
                <span>$3.50</span>
              </div>
              <div className={`${styles.row} ${styles.total}`}>
                <span>Total</span>
                <span>${(totalPrice + 3.5).toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Place Order
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
