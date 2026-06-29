import { CartProvider } from './food/CartContext';
import Navbar from './food/Navbar';
import Hero from './food/Hero';
import MenuSection from './food/MenuSection';
import AboutSection from './food/AboutSection';
import FeaturesStrip from './food/FeaturesStrip';
import Testimonials from './food/Testimonials';
import BookingCTA from './food/BookingCTA';
import TableBooking from './food/TableBooking';
import Footer from './food/Footer';
import CartSidebar from './food/CartSidebar';
import ScrollToTop from './food/ScrollToTop';
import AuthModal from './food/AuthModal';
import ChatBox from './food/ChatBox';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <MenuSection />
      <AboutSection />
      <FeaturesStrip />
      <Testimonials />
      <BookingCTA />
      <TableBooking />
      <Footer />
      <CartSidebar />
      <ScrollToTop />
        <ChatBox />
    </CartProvider>
  
  );
}

export default App;