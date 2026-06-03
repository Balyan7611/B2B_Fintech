import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../../config/siteConfig';
import styles from './CTABanner.module.css';

const CTABanner = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.bgPattern}></div>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Start Your Digital Business Today</h2>
          <p className={styles.ctaText}>
            Join thousands of retailers using {SITE_CONFIG.companyName} 
            to power their recharge and payment services.
          </p>
          <div className={styles.buttonGroup}>
            <Link to="#register" className={styles.primaryBtn}>
              Get Started Now
            </Link>
            <Link to="#contact" className={styles.secondaryBtn}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
