import React, { useState, useEffect } from 'react';
import { CartProvider } from './food/CartContext';
import { OrderProvider } from './food/OrderContext';
import Navbar from './food/Navbar';
import Hero from './food/Hero';
import FeaturesStrip from './food/FeaturesStrip';
import MenuSection from './food/MenuSection';
import AboutSection from './food/AboutSection';
import Testimonials from './food/Testimonials';
import BookingCTA from './food/BookingCTA';
import Footer from './food/Footer';
import ScrollToTop from './food/ScrollToTop';
import CartSidebar from './food/CartSidebar';
import TableBooking from './food/TableBooking';
import AuthModal from './food/AuthModal';
import ChatBox from './food/ChatBox';

export default function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('pn_current') || 'null')
  );
  const [showAuth, setShowAuth] = useState(
    !JSON.parse(localStorage.getItem('pn_current') || 'null')
  );

  useEffect(() => {
    const handler = () => setShowBooking(true);
    document.addEventListener('openBooking', handler);
    return () => document.removeEventListener('openBooking', handler);
  }, []);

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('pn_current');
    setUser(null);
    setShowAuth(true);
  };

  return (
    <OrderProvider>
      <CartProvider>

        {showAuth && <AuthModal onSuccess={handleAuthSuccess} />}

        <Navbar user={user} onLogout={handleLogout} />
        <Hero />
        <FeaturesStrip />
        <MenuSection />
        <AboutSection />
        <Testimonials />
        <BookingCTA onBook={() => setShowBooking(true)} />
        <Footer />
        <CartSidebar />
        <ChatBox />

        {/* ScrollToTop moved up so it doesn't overlap chat */}
        <div style={{ position: 'fixed', bottom: '100px', right: '30px', zIndex: 9000 }}>
          <ScrollToTop />
        </div>

        {/* Booking modal */}
        {showBooking && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 999999,
            overflowY: 'auto',
          }}>
            <button
              onClick={() => setShowBooking(false)}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000000,
                background: '#ef4444',
                border: 'none',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '700',
              }}
            >
              ✕
            </button>
            <TableBooking />
          </div>
        )}

      </CartProvider>
    </OrderProvider>
  );
}