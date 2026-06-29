import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const OrderContext = createContext(null);

const STEPS = [
  { icon: '📋', label: 'Confirmed',  sub: 'Order received',    time: 0    },
  { icon: '👨‍🍳', label: 'Preparing',  sub: 'Chef is cooking',   time: 8000 },
  { icon: '🛵', label: 'On the Way', sub: 'Rider picked up',   time: 16000 },
  { icon: '🏠', label: 'Delivered',  sub: 'Enjoy your meal!',  time: 24000 },
];

export function OrderProvider({ children }) {
  const [activeOrder, setActiveOrder] = useState(null);
  const [step, setStep] = useState(0);
  const timers = useRef([]);

  const placeOrder = (orderInfo) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    setActiveOrder(orderInfo);
    STEPS.forEach((s, i) => {
      if (i === 0) return;
      const t = setTimeout(() => setStep(i), s.time);
      timers.current.push(t);
    });
    const done = setTimeout(() => {
      setActiveOrder(null);
      setStep(0);
    }, 32000);
    timers.current.push(done);
  };

  const clearOrder = () => {
    timers.current.forEach(clearTimeout);
    setActiveOrder(null);
    setStep(0);
  };

  return (
    <OrderContext.Provider value={{ activeOrder, step, steps: STEPS, placeOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}