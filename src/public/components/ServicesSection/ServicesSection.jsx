import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMobileAlt, FaBolt, FaCreditCard, FaLock, 
  FaMoneyBillWave, FaUniversity, FaArrowRight,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import styles from './ServicesSection.module.css';

const services = [
  {
    icon: FaMobileAlt,
    title: 'Recharge',
    description: 'We provide fast and secure mobile & DTH recharge services for all major operators like Airtel, Jio, VI, and BSNL with instant processing.',
    color: 'var(--color-secondary)',
  },
  {
    icon: FaBolt,
    title: 'BBPS',
    description: 'Pay electricity, water, gas, and other utility bills easily through BBPS with secure transactions and instant confirmation.',
    color: 'var(--color-accent)',
  },
  {
    icon: FaCreditCard,
    title: 'CC Bill Payment',
    description: 'Pay your credit card bills quickly and securely with our platform and avoid late payment charges with instant processing.',
    color: 'var(--color-success)',
  },
  {
    icon: FaLock,
    title: 'Payment Gateway',
    description: 'Accept online payments seamlessly with our secure payment gateway supporting multiple payment modes like UPI, cards, and net banking.',
    color: 'var(--color-primary)',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Payout',
    description: 'Send money instantly to any bank account using our payout service with secure and reliable transactions.',
    color: 'var(--color-secondary)',
  },
  {
    icon: FaUniversity,
    title: 'MATM',
    description: 'Micro ATM service allows customers to withdraw cash, check balance, and perform banking transactions using debit cards.',
    color: 'var(--color-accent)',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      const header = sectionRef.current.querySelector(`.${styles.sectionHeader}`);
      if (header) observer.observe(header);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  return (
    <section id="services" className={styles.servicesSection} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.sectionHeader}`}>
          <span className="sectionLabel">Our Services</span>
          <h2 className="sectionTitle">We Offer The Best Service To Our Customer</h2>
        </div>

        <div className={styles.carouselContainer}>
          <button className={styles.carouselBtn} onClick={prevSlide} aria-label="Previous service">
            <FaChevronLeft />
          </button>

          <div className={styles.cardsWrapper}>
            {services.map((service, index) => {
              let positionClass = styles.cardHiddenRight;
              
              if (index === activeIndex) {
                positionClass = styles.cardCenter;
              } else if (index === activeIndex - 1 || (activeIndex === 0 && index === services.length - 1)) {
                positionClass = styles.cardLeft;
              } else if (index === activeIndex + 1 || (activeIndex === services.length - 1 && index === 0)) {
                positionClass = styles.cardRight;
              } else if (index < activeIndex) {
                positionClass = styles.cardHiddenLeft;
              }

              return (
                <div 
                  key={index} 
                  className={`${styles.serviceCard} ${positionClass}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div 
                    className={styles.iconWrapper}
                    style={{ backgroundColor: `${service.color}15`, color: service.color }}
                  >
                    <service.icon />
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <Link to="#" className={styles.readMoreLink}>
                    Read More <FaArrowRight />
                  </Link>
                </div>
              );
            })}
          </div>

          <button className={styles.carouselBtn} onClick={nextSlide} aria-label="Next service">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
