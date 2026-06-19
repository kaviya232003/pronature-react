import React from 'react';
import Navbar from './food/Navbar';
import Hero from './food/Hero';
import FeaturesStrip from './food/FeaturesStrip';
import MenuSection from './food/MenuSection';
import AboutSection from './food/AboutSection';
import Testimonials from './food/Testimonials';
import BookingCTA from './food/BookingCTA';
import Footer from './food/Footer';
import ScrollToTop from './food/ScrollToTop';
import { CartProvider } from './food/CartContext';
import CartSidebar from './food/CartSidebar';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <FeaturesStrip />
      <MenuSection />
      <AboutSection />
      <Testimonials />
      <BookingCTA />
      <Footer />
      <ScrollToTop />
      <CartSidebar />
    </CartProvider>
  );
}
