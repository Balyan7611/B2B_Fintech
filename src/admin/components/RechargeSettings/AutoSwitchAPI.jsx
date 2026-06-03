import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiActivity, FiFilter, FiX, FiCheck, FiChevronLeft, FiChevronRight, FiDatabase, FiShuffle, FiSettings, FiArrowRight
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const AutoSwitchAPI = () => {
  const dispatch = useDispatch();

  const [selectedService, setSelectedService] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPkgOpen, setIsPkgOpen] = useState(false);
  const [pkgSearch, setPkgSearch] = useState('');
  const [currentRouting, setCurrentRouting] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, item: null, idx: null });
  const [showSuccessToast, setShowSuccessToast] = useState({ show: false, message: '' });

  const handleChangeClick = (item, idx) => {
    setShowConfirmModal({ isOpen: true, item, idx });
  };

  const confirmRouteChange = () => {
    const item = showConfirmModal.item;
    setShowConfirmModal({ isOpen: false, item: null, idx: null });
    setShowSuccessToast({ show: true, message: `Route successfully updated for ${item.operator} to ${item.activeRoute}` });
    setTimeout(() => {
      setShowSuccessToast({ show: false, message: '' });
    }, 3000);
  };

  // Mock Package options
  const packagesList = [
    { id: 'retailer', name: 'Retailer' },
    { id: 'admin', name: 'Admin' },
    { id: 'distributor', name: 'Distributor' },
    { id: 'master', name: 'Mastar' },
    { id: 'api_user', name: 'API USER' },
    { id: 'direct_retailer', name: 'Direct retailer' },
    { id: 'whitlable', name: 'Whitlable' },
    { id: 'whitelabel', name: 'Whitelabel' },
    { id: 'rt_gold', name: 'RT_GOLD' },
    { id: 'silver111', name: 'silver111' },
    { id: 'unique', name: 'Unique' }
  ];

  // Mock Service options
  const servicesList = [
    { id: 'recharge', name: 'Recharge' },
    { id: 'mobile_postpaid', name: 'MOBILE POSTPAID' },
    { id: 'dth', name: 'DTH' },
    { id: 'electricity', name: 'Electricity' },
    { id: 'water', name: 'Water' },
    { id: 'gas', name: 'GAS' },
    { id: 'lpg_gas', name: 'LPG Gas' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'internet', name: 'Internet' },
    { id: 'landline_postpaid', name: 'Landline Postpaid' },
    { id: 'emi', name: 'EMI' },
    { id: 'fastag', name: 'FasTag' },
    { id: 'education', name: 'Education' },
    { id: 'cable_tv', name: 'Cable Tv' },
    { id: 'municipal_tax', name: 'Municipal Tax' },
    { id: 'aeps', name: 'AEPS' },
    { id: 'aadhar_pay', name: 'Aadhar Pay' },
    { id: 'payment_gateway', name: 'Payment Gateway' },
    { id: 'scan_pay', name: 'Scan & Pay' },
    { id: 'nsdl_pan', name: 'NSDL PAN' },
    { id: 'matm', name: 'mATM' },
    { id: 'settlement', name: 'Settlement' },
    { id: 'fund_transfer', name: 'Fund Transfer' },
    { id: 'my_services', name: 'My Services' },
    { id: 'matm_onboard', name: 'MATM OnBoard' },
    { id: 'credit_card', name: 'Credit Card' },
    { id: 'money_transfer', name: 'Money Transfer' },
    { id: 'broadband', name: 'Broadband' },
    { id: 'datacard', name: 'DataCard' },
    { id: 'broadband_alt', name: 'BroadBand' },
    { id: 'digital_voucher', name: 'Digital Voucher' },
    { id: 'prepaid_datacard', name: 'Prepaid DataCard' },
    { id: 'metro', name: 'Metro' },
    { id: 'prebooking', name: 'Prebooking' },
    { id: 'wifi', name: 'WiFi' },
    { id: 'e_challan', name: 'E-Challan' },
    { id: 'broadband_postpaid', name: 'Broadband Postpaid' },
    { id: 'pay_credit_card_bills', name: 'Pay Credit Card Bills' },
    { id: 'account_verification', name: 'Account Verification' },
    { id: 'dmt_ppi', name: 'DMT PPI' },
    { id: 'account_opening', name: 'Account Opening' },
    { id: 'loan', name: 'Loan' },
    { id: 'mobile_prepaid', name: 'Mobile Prepaid' },
    { id: 'donation', name: 'Donation' },
    { id: 'health_insurance', name: 'Health Insurance' },
    { id: 'housing_society', name: 'Housing Society' },
    { id: 'life_insurance', name: 'Life Insurance' },
    { id: 'loan_repay', name: 'Loan Repay' },
    { id: 'muncipal_service', name: 'Muncipal Service' },
    { id: 'recurring_deposit', name: 'Recurring Deposit' },
    { id: 'clubs_association', name: 'Clubs Association' },
    { id: 'rental', name: 'Rental' },
    { id: 'subscription', name: 'Subscription' },
    { id: 'npmc', name: 'NPMC' },
    { id: 'nps', name: 'NPS' },
    { id: 'prepaid_meter', name: 'Prepaid Meter' },
    { id: 'neeraj_bar', name: 'Neeraj Bar' }
  ];

  // Mock Routing Database based on Service Selection
  const mockRoutingDb = {
    recharge: [
      { operator: 'Airtel Mobile', code: 'AM', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Jio Mobile', code: 'JM', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Vodafone Idea', code: 'VI', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'BSNL Mobile', code: 'BM', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' }
    ],
    dth: [
      { operator: 'Airtel Digital Tv', code: 'AD', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Dish Tv', code: 'DS', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Sun Direct', code: 'SD', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Tata Sky', code: 'TS', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Videocon D2h', code: 'VD', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' }
    ],
    bbps: [
      { operator: 'Electricity Bill', code: 'EL', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Gas Bill', code: 'GS', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Water Bill', code: 'WT', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' }
    ],
    dmt: [
      { operator: 'DMT Transfer 1', code: 'DM1', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'DMT Transfer 2', code: 'DM2', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' }
    ],
    aeps: [
      { operator: 'Cash Withdrawal', code: 'CW', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Balance Inquiry', code: 'BI', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
      { operator: 'Mini Statement', code: 'MS', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' }
    ]
  };

  // Sync route data on dropdown select
  useEffect(() => {
    if (selectedService && selectedPackage) {
      if (mockRoutingDb[selectedService]) {
        setCurrentRouting(mockRoutingDb[selectedService]);
      } else {
        const serviceObj = servicesList.find(s => s.id === selectedService);
        const serviceName = serviceObj ? serviceObj.name : selectedService;
        setCurrentRouting([
          { operator: `${serviceName} Operator 1`, code: 'OP1', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' },
          { operator: `${serviceName} Operator 2`, code: 'OP2', defaultGateway: 'SoniTechno', activeRoute: 'SoniTechno' }
        ]);
      }
    } else {
      setCurrentRouting([]);
    }
  }, [selectedService, selectedPackage]);

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', background: '#fff', borderRadius: '16px' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E' }}>Gateway Routing</h3>
        </div>

        {/* ── DIRECT DYNAMIC SELECTORS SECTION ── */}
        <div style={{ display: 'flex', gap: '20px', padding: '20px 25px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          {/* Searchable Package Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px', flex: 1, position: 'relative' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Package</label>
            <div 
              onClick={() => setIsPkgOpen(!isPkgOpen)}
              style={{
                width: '100%', height: '42px', border: '1.5px solid #E2E8F0', borderRadius: '10px',
                padding: '0 16px', fontSize: '0.85rem', color: selectedPackage ? '#1E293B' : '#64748B', fontWeight: 600,
                background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                userSelect: 'none'
              }}
            >
              <span>{selectedPackage ? selectedPackage.name : '-- Select Package --'}</span>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>▼</span>
            </div>

            {isPkgOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setIsPkgOpen(false)} />
                <div style={{
                  position: 'absolute', top: '72px', left: 0, right: 0, background: '#fff',
                  border: '1px solid #E2E8F0', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  zIndex: 20, maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ padding: '8px', borderBottom: '1px solid #F1F5F9', position: 'sticky', top: 0, background: '#fff', display: 'flex', alignItems: 'center' }}>
                    <FiSearch style={{ color: '#94A3B8', marginRight: '8px' }} />
                    <input 
                      type="text" 
                      placeholder="Search package..." 
                      value={pkgSearch}
                      onChange={(e) => setPkgSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.85rem', color: '#1E293B', padding: '4px 0' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {packagesList.filter(p => p.name.toLowerCase().includes(pkgSearch.toLowerCase())).length === 0 ? (
                      <span style={{ padding: '12px', fontSize: '0.8rem', color: '#94A3B8', textAlign: 'center' }}>No packages found</span>
                    ) : (
                      packagesList
                        .filter(p => p.name.toLowerCase().includes(pkgSearch.toLowerCase()))
                        .map(p => (
                          <div 
                            key={p.id}
                            onClick={() => {
                              setSelectedPackage(p);
                              setIsPkgOpen(false);
                              setPkgSearch('');
                            }}
                            style={{
                              padding: '10px 16px', fontSize: '0.85rem', color: '#1E293B', fontWeight: 600,
                              cursor: 'pointer', transition: 'all 0.15s',
                              background: selectedPackage?.id === p.id ? '#F1F5F9' : 'transparent'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = selectedPackage?.id === p.id ? '#F1F5F9' : 'transparent'; }}
                          >
                            {p.name}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Service Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px', flex: 1 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Service</label>
            <select 
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
              style={{
                width: '100%', height: '42px', border: '1.5px solid #E2E8F0', borderRadius: '10px',
                padding: '0 16px', fontSize: '0.85rem', color: '#1E293B', fontWeight: 600,
                background: '#fff', cursor: 'pointer', outline: 'none'
              }}
            >
              <option value="">-- Select Service --</option>
              {servicesList.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── TOOLBAR (NO SEARCH BAR) ── */}
        <div className="global-table-toolbar" style={{ padding: '15px 20px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries} style={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
            <button className="global-export-btn btn-copy" title="Copy Table"><FaCopy /></button>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1000px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px' }}>S.NO</th>
                <th style={{ width: '250px' }}>OPERATOR</th>
                <th style={{ width: '120px' }}>CODE</th>
                <th style={{ textAlign: 'center', width: '220px' }}>DEFAULT GATEWAY</th>
                <th style={{ textAlign: 'center', width: '220px' }}>CHANGE API</th>
                <th style={{ textAlign: 'center', width: '150px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentRouting.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '0', background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, right: 0, width: '100%', minWidth: 'fit-content', margin: '0 auto', textAlign: 'center', padding: '80px 0', color: '#A0AEC0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiShuffle style={{ fontSize: '2.5rem', opacity: 0.2, color: '#1756AA' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E', display: 'block', marginBottom: '5px' }}>No Routing Map Selected</span>
                        <p style={{ fontSize: '0.85rem', color: '#718096', margin: 0 }}>Select a Package and Service to view routing rules</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                currentRouting.map((item, idx) => (
                  <tr key={idx} className={styles.hoverRow}>
                    <td style={{ fontWeight: 700, color: '#A0AEC0' }}>{idx + 1}</td>
                    <td><span style={{ color: '#1756AA', fontWeight: 800 }}>{item.operator}</span></td>
                    <td><span style={{ background: '#F1F5F9', color: '#4E6080', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>{item.code}</span></td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#0D1B3E' }}>{item.defaultGateway}</td>
                    <td style={{ textAlign: 'center' }}>
                      <select 
                        value={item.activeRoute} 
                        onChange={(e) => {
                          const updated = [...currentRouting];
                          updated[idx] = { ...updated[idx], activeRoute: e.target.value };
                          setCurrentRouting(updated);
                        }}
                        style={{
                          height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px',
                          padding: '0 10px', fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600,
                          background: '#fff', cursor: 'pointer', outline: 'none', width: '160px'
                        }}
                      >
                        <option value="SoniTechno">SoniTechno</option>
                        <option value="Paytm">Paytm Gateway</option>
                        <option value="Razorpay">Razorpay API</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        style={{ 
                          padding: '8px 20px', background: 'linear-gradient(135deg, #FF5A5F 0%, #E03B42 100%)', 
                          color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', 
                          fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 90, 95, 0.2)',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        onClick={() => handleChangeClick(item, idx)}
                      >
                        Change
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="global-pagination" style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
            Showing {currentRouting.length} of {currentRouting.length} records
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronLeft /></button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', background: '#1756AA', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>1</div>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* CONFIRM ROUTE CHANGE MODAL */}
      {showConfirmModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3600 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', marginBottom: '16px' }}>
                <FiActivity style={{ fontSize: '1.2rem' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Confirm Route Change</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to change the active gateway for <strong>{showConfirmModal.item?.operator}</strong> to <strong>{showConfirmModal.item?.activeRoute}</strong>?
              </p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button
                  onClick={() => setShowConfirmModal({ isOpen: false, item: null, idx: null })}
                  style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', color: '#4E6080', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRouteChange}
                  style={{ flex: 1, padding: '10px', background: '#3B82F6', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {showSuccessToast.show && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', background: '#10B981', color: '#fff',
          padding: '12px 24px', borderRadius: '10px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: '8px', zIndex: 4000, fontWeight: 600, fontSize: '0.9rem'
        }}>
          <FiCheck style={{ fontSize: '1.2rem' }} />
          <span>{showSuccessToast.message}</span>
        </div>
      )}
    </div>
  );
};

export default AutoSwitchAPI;
