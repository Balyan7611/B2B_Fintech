import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../../shared/components/ScrollToTop/ScrollToTop';
import AboutSection from '../components/AboutSection/AboutSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Navbar from '../components/Navbar/Navbar';
import PartnersSection from '../components/PartnersSection/PartnersSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import ServiceTicker from '../components/ServiceTicker/ServiceTicker';
import WhatsAppFloat from '../components/WhatsAppFloat/WhatsAppFloat';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';

const HomePage = () => {
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceTicker />
        <PartnersSection />
        <AboutSection />
        <ServicesSection />
        <FeaturesSection />
        <WhyChooseUs />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
};

export default HomePage;
