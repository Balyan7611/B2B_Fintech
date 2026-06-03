import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { SITE_CONFIG } from '../../config/siteConfig';
import styles from '../../pages/RefundPolicyPage.module.css';

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1>Cancellation and Refund</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h2>All software/APIs services Refund Policies</h2>
            <p>
              All sales of Recharge are final and there will be no refund or exchange permitted. Please be advised that you are responsible for the mobile number or DTH account number you purchase Recharge for and all charges that result from those purchases. {SITE_CONFIG.companyName} is not responsible for any purchase of Recharge for an incorrect mobile number or DTH account number.
            </p>
            <p>
              However, in a case where a transaction has been completed by you on the Site, and money has been charged to your card or bank account but a Recharge has not delivered within 24 hours of your completion of the transaction then you may inform us by sending us an email on {SITE_CONFIG.email} or posting us a message on the Contact Us page. In such a scenario you will be entitled to a full refund. We request you to include in the email the following details - the mobile number or DTH account number, operator name, Recharge value, Transaction date and Order Number. {SITE_CONFIG.companyName} shall investigate the incident and if it is found that money was indeed charged to your card or bank account without delivery of the Recharge then you will be refunded the money within 7 to 10 working days from the date of the receipt of your email.
            </p>
            <p>
              For cases if you are doing recharge from your {SITE_CONFIG.companyName} balance and you have received a success confirmation but not received a recharge or any other case you are welcome to log a complaint by opening a support ticket on our contact us page and we will provide you a quick resolution.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Refund Policy for B2B/B2C Customer</h2>
            <p>
              B2B/B2C customer takes the balance. In any event, the balance will not return.
            </p>
            <p>
              Kindly note, in all cases our liability is only restricted to providing you a valid recharge or refund to the extent of payment received by us. We shall not be responsible for any other claim or consequential liability arising out of a failed recharge on our system.
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

export default RefundPolicyPage;
