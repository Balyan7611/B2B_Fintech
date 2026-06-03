import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { SITE_CONFIG } from '../../config/siteConfig';
import styles from '../../pages/PrivacyPolicyPage.module.css';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1>Privacy Policy</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <p>
              This website is the property of {SITE_CONFIG.companyName}, a company that considers privacy to be of paramount importance. Therefore, through this statement, we want to explain why we need your personal data and to inform you about the options you have to manage your data.
            </p>
            <p className={styles.highlightText}>
              We’ll never sell your data to third parties.
            </p>
            <p>
              In a few cases, it happens that we pass on personal data to companies in countries outside the European Economic Area. In this case, we’ll always ensure optimal security of your personal data by requiring an adequacy decision from the European Commission.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Cookies, or comparable techniques, that we use</h2>
            <p>
              Our websites use functional, analytical, and tracking cookies. We need functional cookies in order for the website to function properly and to complete your purchases. We place the other cookies to offer you tailored web pages. These cookies are placed by external parties.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Your rights</h2>
            <p>
              You have the legal right to ask us to inspect, rectify, or erase all personal data that we’ve stored about you, as well as the right to limit the processing and to transfer your data in a machine-readable format.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Complaints?</h2>
            <p>
              If you believe that we’re using your personal data incorrectly or that we don’t deal with your questions correctly, you can file a complaint to the Protection Authority.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Changes and contact details</h2>
            <p>
              From time to time, it may be necessary for us to change this policy. We advise you to visit this page regularly to check if there have been any changes. If you have any questions about our privacy policy, please send an email to <a href={`mailto:${SITE_CONFIG.email}`} className={styles.linkText}>{SITE_CONFIG.email}</a> or write to:
            </p>
          </div>

          <div className={styles.contactDetails}>
            <h3>{SITE_CONFIG.companyName}</h3>
            <p>Head Office - Jaipur</p>
            <p>India</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
