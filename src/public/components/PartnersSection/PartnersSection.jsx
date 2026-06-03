import { useEffect, useRef } from 'react';
import styles from './PartnersSection.module.css';

const partners = [
  { name: 'Airtel', logo: '/images/parterners/Airtel.png' },
  { name: 'Jio', logo: '/images/parterners/Jio.png' },
  { name: 'Fino', logo: '/images/parterners/fino.png' },
  { name: 'NSDL', logo: '/images/parterners/NSDL.png' },
];

const PartnersSection = () => {
  const sectionRef = useRef(null);

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
      const elements = sectionRef.current.querySelectorAll(`.${styles.animateOnScroll}`);
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.partnersSection} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.partnersWrapper} ${styles.animateOnScroll}`}>
          <div className={styles.headerBox}>
            <h3 className={styles.title}>Trusted By Our Premium Partners</h3>
            <div className={styles.divider}></div>
          </div>
          
          <div className={styles.logoGrid}>
            {partners.map((partner, index) => (
              <div key={index} className={styles.logoBox} style={partner.name === 'Jio' ? { transform: 'scale(1.6)', margin: '0 20px' } : {}}>
                <img 
                  src={process.env.PUBLIC_URL + partner.logo} 
                  alt={`${partner.name} Logo`} 
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
