import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import DashboardPage from './admin/pages/DashboardPage';
import { SITE_CONFIG } from './config/siteConfig';
import MemberCertificate from './member/components/MemberPanel/Certificate/MemberCertificate';
import CommissionSetup from './member/components/MemberPanel/Commission/CommissionSetup';
import UploadKYC from './member/components/MemberPanel/KYC/UploadKYC';
import MemberHome from './member/components/MemberPanel/MemberHome';
import MyServices from './member/components/MemberPanel/MyServices';
import MyProfile from './member/components/MemberPanel/Profile/MyProfile';
import AEPSReport from './member/components/MemberPanel/Reports/AEPSReport';
import AEPSWalletHistory from './member/components/MemberPanel/Reports/AEPSWalletHistory';
import BBPSHistory from './member/components/MemberPanel/Reports/BBPSHistory';
import BusinessSummary from './member/components/MemberPanel/Reports/BusinessSummary';
import DMTHistory from './member/components/MemberPanel/Reports/DMTHistory';
import MainWalletHistory from './member/components/MemberPanel/Reports/MainWalletHistory';
import MATMHistory from './member/components/MemberPanel/Reports/MATMHistory';
import PayoutHistory from './member/components/MemberPanel/Reports/PayoutHistory';
import RechargeHistory from './member/components/MemberPanel/Reports/RechargeHistory';
import AadharPay from './member/components/MemberPanel/Services/AadharPay';
import Aeps from './member/components/MemberPanel/Services/Aeps';
import CableTV from './member/components/MemberPanel/Services/CableTV';
import DMT from './member/components/MemberPanel/Services/DMT';
import DTHRecharge from './member/components/MemberPanel/Services/DTHRecharge';
import Electricity from './member/components/MemberPanel/Services/Electricity';
import Fastag from './member/components/MemberPanel/Services/Fastag';
import Gas from './member/components/MemberPanel/Services/Gas';
import Insurance from './member/components/MemberPanel/Services/Insurance';
import Landline from './member/components/MemberPanel/Services/Landline';
import LPGGas from './member/components/MemberPanel/Services/LPGGas';
import MobilePostpaid from './member/components/MemberPanel/Services/MobilePostpaid';
import MobileRecharge from './member/components/MemberPanel/Services/MobileRecharge';
import MunicipalTax from './member/components/MemberPanel/Services/MunicipalTax';
import PanCard from './member/components/MemberPanel/Services/PanCard';
import Payout from './member/components/MemberPanel/Services/Payout';
import UpiCashout from './member/components/MemberPanel/Services/UpiCashout';
import UpiTransfer from './member/components/MemberPanel/Services/UpiTransfer';
import Water from './member/components/MemberPanel/Services/Water';
import FundRequest from './member/components/MemberPanel/Wallet/FundRequest';
import WalletToWallet from './member/components/MemberPanel/Wallet/WalletToWallet';
import LoginPage from './member/pages/LoginPage';
import MemberDashboard from './member/pages/MemberDashboard';
import ContactPage from './public/pages/ContactPage';
import HomePage from './public/pages/HomePage';
import PrivacyPolicyPage from './public/pages/PrivacyPolicyPage';
import RefundPolicyPage from './public/pages/RefundPolicyPage';
import RegisterDetailsPage from './public/pages/RegisterDetailsPage';
import TermsPage from './public/pages/TermsPage';
import { AuthGuard } from './security/auth-guard';
import { setNavScrolled } from './store/slices/uiSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dynamic page title and description
    document.title = SITE_CONFIG.brandName;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${SITE_CONFIG.companyName} - Complete digital platform for mobile & DTH recharge, bill payments, payout, and other financial services.`);
    }

    const handleScroll = () => dispatch(setNavScrolled(window.scrollY > 50));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/refund" element={<RefundPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterDetailsPage />} />
          <Route path="/register/details" element={<Navigate to="/register" replace />} />
          <Route path="/login" element={<Navigate to="/member/login" replace />} />

          {/* --- MEMBER ROUTES --- */}
          <Route path="/member/" element={<LoginPage />} />
          <Route path="/member/login" element={<LoginPage />} />
          <Route path="/member/dashboard" element={<AuthGuard role="2">
                <MemberDashboard />
            </AuthGuard>}>
            <Route index element={<MemberHome />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="commission" element={<CommissionSetup />} />
            <Route path="report/aeps" element={<AEPSReport />} />
            <Route path="report/dmt" element={<DMTHistory />} />
            <Route path="report/payout" element={<PayoutHistory />} />
            <Route path="report/matm" element={<MATMHistory />} />
            <Route path="report/recharge" element={<RechargeHistory />} />
            <Route path="report/bbps" element={<BBPSHistory />} />
            <Route path="report/business" element={<BusinessSummary />} />
            <Route path="wallet/aeps" element={<AEPSWalletHistory />} />
            <Route path="wallet/main" element={<MainWalletHistory />} />
            <Route path="wallet/w2w" element={<WalletToWallet />} />
            <Route path="wallet/fund-request" element={<FundRequest />} />
            <Route path="my-services" element={<MyServices />} />
            <Route path="kyc/upload" element={<UploadKYC />} />
            <Route path="service/mobile-postpaid" element={<MobilePostpaid />} />
            <Route path="service/dth" element={<DTHRecharge />} />
            <Route path="service/electricity" element={<Electricity />} />
            <Route path="service/water" element={<Water />} />
            <Route path="service/gas" element={<Gas />} />
            <Route path="service/lpg" element={<LPGGas />} />
            <Route path="service/insurance" element={<Insurance />} />
            <Route path="service/landline" element={<Landline />} />
            <Route path="service/fastag" element={<Fastag />} />
            <Route path="service/cable-tv" element={<CableTV />} />
            <Route path="service/municipal-tax" element={<MunicipalTax />} />
            <Route path="service/mobile-recharge" element={<MobileRecharge />} />
            <Route path="service/dmt" element={<DMT />} />
            <Route path="service/payout" element={<Payout />} />
            <Route path="service/aadharpay" element={<AadharPay />} />
            <Route path="service/aeps" element={<Aeps />} />
            <Route path="service/upicashout" element={<UpiCashout />} />
            <Route path="service/upitransfer" element={<UpiTransfer />} />
            <Route path="service/pan" element={<PanCard />} />
            <Route path="certificate" element={<MemberCertificate />} />
          </Route>
          <Route path="/member/commission" element={<Navigate to="/member/dashboard/commission" replace />} />
          <Route path="/member/report/aeps" element={<Navigate to="/member/dashboard/report/aeps" replace />} />
          <Route path="/member/kyc/upload" element={<Navigate to="/member/dashboard/kyc/upload" replace />} />
          <Route path="/member/certificate" element={<Navigate to="/member/dashboard/certificate" replace />} />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AuthGuard role="1">
                <DashboardPage />
            </AuthGuard>} />
          <Route path="/admin/dashboard/:tab" element={<AuthGuard role="1">
                <DashboardPage />
            </AuthGuard>} />
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
  );
}

export default App;
