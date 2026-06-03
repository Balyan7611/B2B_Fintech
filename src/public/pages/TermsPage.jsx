import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { SITE_CONFIG } from '../../config/siteConfig';
import styles from '../../pages/TermsPage.module.css';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1>Terms and Conditions</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h2>Reservation of Rights :</h2>
            <p>
              The Site and Content provided on or through the Site are the intellectual property and copyrighted works of {SITE_CONFIG.companyName} or a third party provider. All Content is provided on an "As Is" and "As Available" basis and {SITE_CONFIG.companyName} reserves the right to take legal action if the content and site is misused by the user. You agree not to use the Site or Content provided on or through the Site for any purpose that is unlawful or prohibited by these Terms of Use, or the rules, guidelines or terms of use posted for a specific area of the Site or Content provided on or through the Site.
            </p>
          </div>

          <div className={styles.section}>
            <h2>License</h2>
            <p>
              Subject to the terms and conditions set forth in these Terms of Use, {SITE_CONFIG.shortName} grants you a non-exclusive, non-transferable, limited right to access, use and display this site and the materials thereon. You agree not to interrupt or attempt to interrupt the operation of the site in any way.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Limitation of Liability</h2>
            <p className={styles.uppercaseText}>
              IN NO EVENT SHALL {SITE_CONFIG.companyName.toUpperCase()} BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA OR USE, INCURRED BY YOU OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, ARISING FROM YOUR ACCESS TO, OR USE OF, THE SITE OR ANY CONTENT PROVIDED ON OR THROUGH THE SITE.
            </p>
            <p>
              These Terms & Conditions can be downloaded or requested digitally via the {SITE_CONFIG.companyName}. Click the 'contact' link on the website to request the Terms & Conditions.
            </p>
            <p>
              These Terms & Conditions take care of contractual conditions for all transactions between consumers and {SITE_CONFIG.companyName}. All offers and deliveries are only subject to the below sales and delivery conditions. If any stipulation of these Terms & Conditions does not apply in the opinion of a judge, for whatever reason, the stipulation in question needs to be replaced by a stipulation based on which parties can still reach their objectives. The remaining stipulations of these general sales and delivery conditions remain in force.
            </p>
            <p>
              Deviating conditions on the part of the consumer or other agreements that have been concluded are not valid.
            </p>
            <p>
              By placing your order, you agree to have read these Terms & Conditions and our Privacy Statement and you explicitly agree to the contents thereof without further explanation. {SITE_CONFIG.companyName} has a right to change its delivery and/or payment terms after termination of the term. Payment orders are at the cost and risk of the one giving the payment order (or authorization). If you are under 18 years old, you need to ask permission from your parents before using {SITE_CONFIG.companyName}.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 1. Applicability of these conditions.</h2>
            <p>
              These conditions apply to any offer and any agreement between {SITE_CONFIG.companyName} and consumers.
            </p>
            <p>
              The present conditions also apply to agreements with {SITE_CONFIG.companyName} in case third parties need to be involved for the execution.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 2. Offers.</h2>
            <p>
              Price offers and other conditions are assumed to have been accepted by consumers. We try to indicate offered products and prices in a correct way. Typing errors or indicated prices are not binding, however.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 3. Delivery time</h2>
            <p>
              Delivery times indicated by {SITE_CONFIG.companyName} are approximates and do not involve final terms, but will never exceed actual delivery times by more than 90 days, save force majeure.
            </p>
            <p>
              In case of failed delivery in time, consumers need to give {SITE_CONFIG.companyName} notice of default via the contact form on our website and allow {SITE_CONFIG.companyName} a reasonable term to meet its obligations after all.
            </p>
            <p>
              Delivery times may vary depending on the type of payment method selected. Delivery times are indicated at the payment method. {SITE_CONFIG.companyName} will never deliver purchased products/services until full payment has been received on the {SITE_CONFIG.companyName} account or payment by credit card is confirmed/any online method.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 4. Information, data and intellectual property rights.</h2>
            <p>
              General indications and descriptions of items to be delivered by {SITE_CONFIG.companyName}, as included in brochures, website, lists and similar items, are only meant as general information instead of quality and/or guarantee indications.
            </p>
            <p>
              {SITE_CONFIG.companyName} can assume correctness and completeness of information and data provided to {SITE_CONFIG.companyName} by consumers.
            </p>
            <p>
              Save as otherwise expressly agreed, where appropriate, intellectual property rights to brands, models, drawings, designs, and similar items belong to {SITE_CONFIG.companyName}.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 5. Guarantee.</h2>
            <p>
              {SITE_CONFIG.companyName} guarantees that provided software/APIs services have not been used at the moment of provision to consumers. After delivery, consumers are responsible for provided software/APIs services.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 6. Payment.</h2>
            <p>
              Unless agreed otherwise, net payment should be done beforehand. It is not possible to pay on account afterwards.
            </p>
            <p>
              Without further notice of default by {SITE_CONFIG.companyName}, consumers are assumed to be in default if the amount due has not been paid within the set payment term. Without prejudice to any other {SITE_CONFIG.companyName} right, the failure to make payment has at least the following consequences:
            </p>
            <ul>
              <li>Consumers are not entitled to settle any counterclaim to {SITE_CONFIG.companyName} with payment obligations under this agreement.</li>
              <li>In case of bankruptcy or suspension of payment by consumers, {SITE_CONFIG.companyName} claims and consumer obligations regarding {SITE_CONFIG.companyName} are immediately payable.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Article 7. Liability</h2>
            <p>
              Liability of {SITE_CONFIG.companyName} is limited to redelivering the goods/services concerned or refunding the purchase price. If decided otherwise, liability will never exceed 1000 INR per case.
            </p>
            <p>
              In case of defects to delivered goods/Services, liability as mentioned in article 11 of these conditions applies.
            </p>
            <p>
              {SITE_CONFIG.companyName} is not liable for indirect or direct damage, including missed profits, mental damage, emotional damage or any other type of damage resulting from {SITE_CONFIG.companyName} services.
            </p>
            <p>
              In case limited liability is below the level required by law, maximum liability will be limited to the minimum amount allowed by law.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 8. Force majeure.</h2>
            <p>
              {SITE_CONFIG.companyName} has a right to repudiate the agreement entirely or partly or suspend delivery terms, as it chooses, without any obligation to pay damages, in the following cases: Force majeure of any kind whatsoever, mobilization, war, uproar, fire, strikes, transport difficulties, seizure, production interruptions, lack of raw materials and/or energy, disasters, restricting government measures of any kind whatsoever, insufficient performance of company installations that are necessary to observe the agreement, third party supply and service delivery failure, as well as any other circumstance independent of the intention of {SITE_CONFIG.companyName} that would have moved {SITE_CONFIG.companyName} to abstain from entering into the agreement or to enter into the agreement on different terms if it had been aware thereof.
            </p>
            <p>
              {SITE_CONFIG.companyName} also has a right to claim force majeure if circumstances that prevent (further) performance appear after {SITE_CONFIG.companyName} should have lived up to its commitment.
            </p>
            <p>
              During force majeure, the delivery obligations and other obligations of {SITE_CONFIG.companyName} are suspended. If the period in which performance of {SITE_CONFIG.companyName} obligations is not possible due to force majeure takes longer than weeks, both parties are authorized to repudiate the agreement without any obligation to pay damages.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 9. Disputes.</h2>
            <p>
              These conditions are subject to law, excluding the Vienna Sales Convention. All disputes, interim proceedings included therein that are related to and/or result from these Terms & Conditions, will be dealt with by the district court, which has jurisdiction, with the proviso that {SITE_CONFIG.companyName} also has the right to have disputes dealt with by the competent court of the place of residence of the consumer.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 10. Privacy.</h2>
            <p>
              Data provided by consumers are recorded in the {SITE_CONFIG.companyName} customer file. This file also includes data that are necessary to process orders, such as order, delivery and payment data. The customer file is used to execute and process orders. More information on this topic can be found on our privacy page.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Article 11. Change and location of conditions.</h2>
            <p>
              The latest registered version or the version valid at the time of concluding the present transaction applies. {SITE_CONFIG.companyName} is authorized to change and supplement these Terms & Conditions without declaring a reason.
            </p>
          </div>

          <div className={styles.contactDetails}>
            <h3>Contact details</h3>
            <p><strong>{SITE_CONFIG.companyName}</strong></p>
            <p>Head office – {SITE_CONFIG.address}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsPage;
