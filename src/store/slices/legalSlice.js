import { createSlice } from '@reduxjs/toolkit';
import { SITE_CONFIG } from '../../config/siteConfig';

const initialState = {
  legalForm: {
    newsName: '',
    description: ''
  },
  privacyForm: {
    newsName: '',
    description: ''
  },
  refundForm: {
    newsName: '',
    description: ''
  },
  securityForm: {
    newsName: '',
    description: ''
  },
  termsList: [
    {
      id: 1,
      name: 'Terms and Conditions',
      description: `Terms and Conditions
Reservation of Rights: The Site and Content provided on or through the Site are the intellectual property and copyrighted works of ${SITE_CONFIG.companyName} or a third party provider. All Content is provided on an "As Is" and "As Available" basis and ${SITE_CONFIG.companyName} reserves the right to take legal action if the content and site is misused by the user.

License: Subject to the terms and conditions set forth in these Terms of Use, ${SITE_CONFIG.shortName} grants you a non-exclusive, non-transferable, limited right to access, use and display this site and the materials thereon.

Limitation of Liability: IN NO EVENT SHALL ${SITE_CONFIG.companyName} BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA OR USE, INCURRED BY YOU OR ANY THIRD PARTY.

Article 1. Applicability: These conditions apply to any offer and any agreement between ${SITE_CONFIG.shortName} and consumers.

Article 2. Offers: Price offers and other conditions are assumed to have been accepted by consumers.

Article 3. Delivery time: Delivery times indicated by ${SITE_CONFIG.shortName} are approximates and do not involve final terms.

Article 4. Intellectual property: Save as otherwise expressly agreed, intellectual property rights belong to ${SITE_CONFIG.shortName}.

Article 5. Guarantee: ${SITE_CONFIG.shortName} guarantees that provided software/APIs services have not been used at the moment of provision.

Article 6. Payment: Unless agreed otherwise, net payment should be done beforehand.

Article 7. Liability: Liability of ${SITE_CONFIG.shortName} is limited to redelivering the goods/services concerned or refunding the purchase price.

Article 8. Force majeure: ${SITE_CONFIG.shortName} has a right to repudiate the agreement entirely or partly in case of Force majeure.

Article 9. Disputes: These conditions are subject to law. All disputes will be dealt with by the Jaipur, Rajasthan, India district court.

Article 10. Privacy: Data provided by consumers are recorded in the ${SITE_CONFIG.shortName} customer file.

Article 11. Change of conditions: ${SITE_CONFIG.shortName} is authorized to change and supplement these Terms & Conditions.

Contact details: ${SITE_CONFIG.companyName}, Head office – Jaipur, India.`
    }
  ],
  privacyList: [
    {
      id: 1,
      name: 'Privacy Policy',
      description: `Privacy Policy
This website is the property of ${SITE_CONFIG.companyName}, a company that considers privacy to be of paramount importance. Therefore, through this statement, we want to explain why we need your personal data and to inform you about the options you have to manage your data.

We’ll never sell your data to parties.

Security: In a few cases, it happens that we pass on personal data to companies in countries outside the European Economic Area. In this case, we’ll always ensure optimal security by requiring an adequacy decision from the European Commission.

Cookies: Our websites use functional, analytical, and tracking cookies. We need functional cookies for the website to function properly and place other cookies to offer you tailored web pages.

Your rights: You have the legal right to ask us to inspect, rectify, or erase all personal data that we’ve stored about you, as well as the right to limit the processing.

Complaints: If you believe that we’re using your personal data incorrectly, you can file a complaint to the Protection Authority.

Contact details: For any questions about our privacy policy, please send an email to ${SITE_CONFIG.email} or write to: ${SITE_CONFIG.companyName}, Head Office- Jaipur, India.`
    }
  ],
  refundList: [
    {
      id: 1,
      name: 'Refund Policy',
      description: `Cancellation and Refund Policy
All sales of Recharge are final and there will be no refund or exchange permitted. Please be advised that you are responsible for the mobile number or DTH account number you purchase Recharge for.

Full Refund Scenario: If a transaction has been completed and money has been charged but a Recharge has not delivered within 24 hours, you may inform us via email or our Contact Us page. You will be entitled to a full refund within 7 to 10 working days.

B2B/B2C Customers: Balance taken by B2B/B2C customers will not be returned in any event.

Liability: Our liability is only restricted to providing you a valid recharge or refund to the extent of payment received by us. We shall not be responsible for any other claim or consequential liability.

Contact details: ${SITE_CONFIG.companyName}, Jaipur, India.`
    }
  ],
  securityList: [
    {
      id: 1,
      name: 'Security Tips',
      description: `Online Security Tips
Protect your Account: Never share your OTP, TPIN, or Password with anyone, even if they claim to be from ${SITE_CONFIG.shortName}.

Secure Connection: Always use a secure HTTPS connection and avoid public Wi-Fi while making financial transactions.

Session Management: Always log out of your session once your work is complete.

Verify Details: Before proceeding with any payment or recharge, double-check the recipient's details to avoid incorrect transactions.`
    }
  ],
  expandedRow: null,
  privacyExpandedRow: null,
  refundExpandedRow: null,
  securityExpandedRow: null,
  isSubmitting: false
};

const legalSlice = createSlice({
  name: 'legal',
  initialState,
  reducers: {
    updateLegalForm: (state, action) => {
      const { name, value } = action.payload;
      state.legalForm[name] = value;
    },
    updatePrivacyForm: (state, action) => {
      const { name, value } = action.payload;
      state.privacyForm[name] = value;
    },
    updateRefundForm: (state, action) => {
      const { name, value } = action.payload;
      state.refundForm[name] = value;
    },
    updateSecurityForm: (state, action) => {
      const { name, value } = action.payload;
      state.securityForm[name] = value;
    },
    addTerm: (state) => {
      const newTerm = {
        id: Date.now(),
        name: state.legalForm.newsName,
        description: state.legalForm.description
      };
      state.termsList.unshift(newTerm);
      state.legalForm = { newsName: '', description: '' };
    },
    addPrivacy: (state) => {
      const newPrivacy = {
        id: Date.now(),
        name: state.privacyForm.newsName,
        description: state.privacyForm.description
      };
      state.privacyList.unshift(newPrivacy);
      state.privacyForm = { newsName: '', description: '' };
    },
    addRefund: (state) => {
      const newRefund = {
        id: Date.now(),
        name: state.refundForm.newsName,
        description: state.refundForm.description
      };
      state.refundList.unshift(newRefund);
      state.refundForm = { newsName: '', description: '' };
    },
    addSecurity: (state) => {
      const newSecurity = {
        id: Date.now(),
        name: state.securityForm.newsName,
        description: state.securityForm.description
      };
      state.securityList.unshift(newSecurity);
      state.securityForm = { newsName: '', description: '' };
    },
    deleteTerm: (state, action) => {
      state.termsList = state.termsList.filter(term => term.id !== action.payload);
    },
    deletePrivacy: (state, action) => {
      state.privacyList = state.privacyList.filter(p => p.id !== action.payload);
    },
    deleteRefund: (state, action) => {
      state.refundList = state.refundList.filter(r => r.id !== action.payload);
    },
    deleteSecurity: (state, action) => {
      state.securityList = state.securityList.filter(s => s.id !== action.payload);
    },
    toggleRowExpansion: (state, action) => {
      state.expandedRow = state.expandedRow === action.payload ? null : action.payload;
    },
    togglePrivacyExpansion: (state, action) => {
      state.privacyExpandedRow = state.privacyExpandedRow === action.payload ? null : action.payload;
    },
    toggleRefundExpansion: (state, action) => {
      state.refundExpandedRow = state.refundExpandedRow === action.payload ? null : action.payload;
    },
    toggleSecurityExpansion: (state, action) => {
      state.securityExpandedRow = state.securityExpandedRow === action.payload ? null : action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    }
  }
});

export const { 
  updateLegalForm, 
  updatePrivacyForm,
  updateRefundForm,
  updateSecurityForm,
  addTerm, 
  addPrivacy,
  addRefund,
  addSecurity,
  deleteTerm,
  deletePrivacy,
  deleteRefund,
  deleteSecurity,
  toggleRowExpansion, 
  togglePrivacyExpansion,
  toggleRefundExpansion,
  toggleSecurityExpansion,
  setIsSubmitting 
} = legalSlice.actions;

export default legalSlice.reducer;
