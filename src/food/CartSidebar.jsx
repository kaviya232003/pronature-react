import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useOrder } from './OrderContext';
import styles from './CartSidebar.module.css';

const INITIAL_FORM = { name: '', phone: '', address: '', city: '', payment: 'card', cardNum: '', expiry: '', cvv: '' };

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
  const { placeOrder } = useOrder();
  const [placed, setPlaced] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (form.payment === 'card') {
      if (!form.cardNum.trim() || form.cardNum.length < 16) e.cardNum = 'Enter valid 16-digit card number';
      if (!form.expiry.trim()) e.expiry = 'Expiry required';
      if (!form.cvv.trim() || form.cvv.length < 3) e.cvv = 'Enter valid CVV';
    }
    return e;
  };

  const handlePlaceOrder = async () => {
  const e = validate();
  if (Object.keys(e).length > 0) { setErrors(e); return; }

  try {
    await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        total: totalPrice + 3.5,
        customer: form,
        userEmail: JSON.parse(localStorage.getItem('pn_current') || '{}').email,
      }),
    });
  } catch (err) {
    console.error('Failed to save order:', err);
  }

  placeOrder({ name: form.name, address: form.address });
  setShowCheckout(false);
  setPlaced(true);
  setForm(INITIAL_FORM);
  setTimeout(() => {
    setPlaced(false);
    clearCart();
    closeCart();
  }, 2500);
};

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={() => { closeCart(); setShowCheckout(false); }}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {showCheckout ? '← Checkout' : 'Your Order'}
          </h3>
          <button
            className={styles.closeBtn}
            onClick={() => { if (showCheckout) setShowCheckout(false); else closeCart(); }}
            aria-label="Close"
          >
            {showCheckout ? '←' : '✕'}
          </button>
        </div>

        {/* Order tracker */}
{placed ? (
  <div className={styles.trackerWrap}>
    <div className={styles.trackerCheck}>✓</div>
    <h3 className={styles.trackerTitle}>Order Confirmed!</h3>
    <p className={styles.trackerSub}>Estimated delivery: 30–45 mins</p>

    <div className={styles.trackerSteps}>
      {[
        { icon: '📋', label: 'Confirmed',  sub: 'Order received'         },
        { icon: '👨‍🍳', label: 'Preparing',  sub: 'Chef is cooking'        },
        { icon: '🛵', label: 'On the Way', sub: 'Rider picked up'        },
        { icon: '🏠', label: 'Delivered',  sub: 'Enjoy your meal!'       },
      ].map((step, i) => (
        <div key={i} className={styles.trackerStep}>
          <div className={styles.stepLeft}>
            <div className={`${styles.stepDot} ${styles[`stepDot${i}`]}`}>
              <span className={styles.stepIcon}>{step.icon}</span>
            </div>
            {i < 3 && <div className={`${styles.stepLine} ${styles[`stepLine${i}`]}`} />}
          </div>
          <div className={styles.stepRight}>
            <p className={`${styles.stepLabel} ${styles[`stepLabel${i}`]}`}>{step.label}</p>
            <p className={styles.stepSub}>{step.sub}</p>
          </div>
        </div>
      ))}
    </div>

    <button
      className={styles.trackerClose}
      onClick={() => { setPlaced(false); clearCart(); closeCart(); }}
    >
      Done
    </button>
  </div>
        /* Empty cart */
        ) : items.length === 0 && !showCheckout ? (
          <div className={styles.emptyWrap}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyText}>Your cart is empty</p>
            <p className={styles.emptySub}>Add some delicious dishes from our menu</p>
          </div>

        /* Checkout form */
        ) : showCheckout ? (
          <div className={styles.checkoutForm}>

            <p className={styles.sectionLabel}>Delivery details</p>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <input className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`} name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
              {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`} name="phone" placeholder="+1 000 000 0000" value={form.phone} onChange={handleChange} />
              {errors.phone && <span className={styles.errMsg}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Delivery Address</label>
              <input className={`${styles.formInput} ${errors.address ? styles.inputError : ''}`} name="address" placeholder="123 Main Street" value={form.address} onChange={handleChange} />
              {errors.address && <span className={styles.errMsg}>{errors.address}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>City</label>
              <input className={`${styles.formInput} ${errors.city ? styles.inputError : ''}`} name="city" placeholder="New York" value={form.city} onChange={handleChange} />
              {errors.city && <span className={styles.errMsg}>{errors.city}</span>}
            </div>

            <p className={styles.sectionLabel}>Payment method</p>

            <div className={styles.paymentTabs}>
              <button
                className={`${styles.payTab} ${form.payment === 'card' ? styles.payActive : ''}`}
                onClick={() => setForm({ ...form, payment: 'card' })}
              >
                💳 Card
              </button>
              <button
                className={`${styles.payTab} ${form.payment === 'cash' ? styles.payActive : ''}`}
                onClick={() => setForm({ ...form, payment: 'cash' })}
              >
                💵 Cash
              </button>
              <button
                className={`${styles.payTab} ${form.payment === 'upi' ? styles.payActive : ''}`}
                onClick={() => setForm({ ...form, payment: 'upi' })}
              >
                📱 UPI
              </button>
            </div>

            {form.payment === 'card' && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Card Number</label>
                  <input
                    className={`${styles.formInput} ${errors.cardNum ? styles.inputError : ''}`}
                    name="cardNum"
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    value={form.cardNum}
                    onChange={handleChange}
                  />
                  {errors.cardNum && <span className={styles.errMsg}>{errors.cardNum}</span>}
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Expiry</label>
                    <input
                      className={`${styles.formInput} ${errors.expiry ? styles.inputError : ''}`}
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={form.expiry}
                      onChange={handleChange}
                    />
                    {errors.expiry && <span className={styles.errMsg}>{errors.expiry}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>CVV</label>
                    <input
                      className={`${styles.formInput} ${errors.cvv ? styles.inputError : ''}`}
                      name="cvv"
                      placeholder="•••"
                      maxLength={3}
                      value={form.cvv}
                      onChange={handleChange}
                    />
                    {errors.cvv && <span className={styles.errMsg}>{errors.cvv}</span>}
                  </div>
                </div>
              </>
            )}

            {form.payment === 'cash' && (
              <p className={styles.payNote}>💵 Pay with cash when your order arrives.</p>
            )}

            {form.payment === 'upi' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>UPI ID</label>
                <input className={styles.formInput} name="upi" placeholder="yourname@upi" value={form.upi || ''} onChange={handleChange} />
              </div>
            )}

            {/* Order summary */}
            <div className={styles.orderSummary}>
              <div className={styles.row}><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className={styles.row}><span>Delivery</span><span>$3.50</span></div>
              <div className={`${styles.row} ${styles.total}`}><span>Total</span><span>${(totalPrice + 3.5).toFixed(2)}</span></div>
            </div>

            <button className={styles.checkoutBtn} onClick={handlePlaceOrder}>
              Confirm Order — ${(totalPrice + 3.5).toFixed(2)}
            </button>
          </div>

        /* Cart items */
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
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>🗑</button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.row}><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className={styles.row}><span>Delivery Fee</span><span>$3.50</span></div>
              <div className={`${styles.row} ${styles.total}`}><span>Total</span><span>${(totalPrice + 3.5).toFixed(2)}</span></div>
              <button className={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
                Place Order
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}