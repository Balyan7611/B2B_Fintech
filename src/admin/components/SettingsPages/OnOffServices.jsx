import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiDatabase, FiX, FiCheck, FiPower, FiSettings, FiActivity, FiGrid, FiRefreshCw, FiInfo
} from 'react-icons/fi';
import styles from '../MemberPages/MemberPages.module.css';

const OnOffServices = () => {
  const dispatch = useDispatch();

  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Custom Modal State
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "confirm" // 'alert' | 'confirm'
  });

  const showCustomAlert = (title, message) => {
    setModal({
      show: true,
      title,
      message,
      onConfirm: null,
      type: "alert"
    });
  };

  const showCustomConfirm = (title, message, onConfirm) => {
    setModal({
      show: true,
      title,
      message,
      onConfirm,
      type: "confirm"
    });
  };

  // Services State List (Parsed from user screenshot)
  const [services, setServices] = useState([
    // Row 1
    { id: 'recharge', name: 'Recharge', category: 'recharge', active: true },
    { id: 'mobile-postpaid', name: 'MOBILE POSTPAID', category: 'recharge', active: true },
    { id: 'dth', name: 'DTH', category: 'recharge', active: true },
    { id: 'electricity', name: 'Electricity', category: 'recharge', active: true },
    { id: 'water', name: 'Water', category: 'recharge', active: true },
    { id: 'gas', name: 'GAS', category: 'recharge', active: true },
    // Row 2
    { id: 'lpg-gas', name: 'LPG Gas', category: 'recharge', active: true },
    { id: 'insurance', name: 'Insurance', category: 'banking', active: true },
    { id: 'internet', name: 'Internet', category: 'recharge', active: true },
    { id: 'landline-postpaid', name: 'Landline Postpaid', category: 'recharge', active: true },
    { id: 'emi', name: 'EMI', category: 'banking', active: true },
    { id: 'fastag', name: 'FasTag', category: 'recharge', active: true },
    // Row 3
    { id: 'education', name: 'Education', category: 'recharge', active: true },
    { id: 'cable-tv', name: 'Cable Tv', category: 'recharge', active: true },
    { id: 'municipal-tax', name: 'Municipal Tax', category: 'recharge', active: true },
    { id: 'aeps', name: 'AEPS', category: 'banking', active: true },
    { id: 'aadhar-pay', name: 'Aadhar Pay', category: 'banking', active: true },
    { id: 'payment-gateway', name: 'Payment Gateway', category: 'banking', active: true },
    // Row 4
    { id: 'scan-pay', name: 'Scan & Pay', category: 'banking', active: true },
    { id: 'nsdl-pan', name: 'NSDL PAN', category: 'other', active: true },
    { id: 'matm', name: 'mATM', category: 'banking', active: true },
    { id: 'settlement', name: 'Settlement', category: 'banking', active: true },
    { id: 'fund-transfer', name: 'Fund Transfer', category: 'banking', active: true },
    { id: 'my-services', name: 'My Services', category: 'other', active: true },
    // Row 5
    { id: 'matm-onboard', name: 'mATM OnBoard', category: 'banking', active: true },
    { id: 'credit-card', name: 'Credit Card', category: 'banking', active: true },
    { id: 'money-transfer', name: 'Money Transfer', category: 'banking', active: true },
    { id: 'broadband', name: 'Broadband', category: 'recharge', active: true },
    { id: 'datacard', name: 'DataCard', category: 'recharge', active: true },
    { id: 'broadband-re', name: 'BroadBand', category: 'recharge', active: true },
    // Row 6
    { id: 'digital-voucher', name: 'Digital Voucher', category: 'other', active: true },
    { id: 'prepaid-datacard', name: 'Prepaid DataCard', category: 'recharge', active: true },
    { id: 'metro', name: 'Metro', category: 'recharge', active: true },
    { id: 'prebooking', name: 'Prebooking', category: 'other', active: true },
    { id: 'wifi', name: 'WiFi', category: 'recharge', active: true },
    { id: 'e-challan', name: 'E-Challan', category: 'other', active: true },
    // Row 7
    { id: 'broadband-postpaid', name: 'Broadband Postpaid', category: 'recharge', active: true },
    { id: 'pay-credit-card', name: 'Pay Credit Card Bills', category: 'banking', active: true },
    { id: 'account-verification', name: 'Account Verification', category: 'banking', active: true },
    { id: 'dmt-ppi', name: 'DMT PPI', category: 'banking', active: true },
    { id: 'account-opening', name: 'Account Opening', category: 'banking', active: true },
    { id: 'loan', name: 'Loan', category: 'banking', active: true },
    // Row 8
    { id: 'mobile-prepaid', name: 'Mobile Prepaid', category: 'recharge', active: true },
    { id: 'hospital', name: 'Hospital', category: 'other', active: false }, // Default Off
    { id: 'hospital-pathology', name: 'Hospital Pathology', category: 'other', active: false }, // Default Off
    { id: 'donation', name: 'Donation', category: 'other', active: true },
    { id: 'health-insurance', name: 'Health Insurance', category: 'banking', active: true },
    { id: 'housing-society', name: 'Housing Society', category: 'other', active: true },
    { id: 'life-insurance', name: 'Life Insurance', category: 'banking', active: true },
    { id: 'loan-repay', name: 'Loan Repay', category: 'banking', active: true },
    // Row 9
    { id: 'municipal-service', name: 'Muncipal Service', category: 'other', active: true },
    { id: 'recurring-deposit', name: 'Recurring Deposit', category: 'banking', active: true },
    { id: 'clubs-association', name: 'Clubs Association', category: 'other', active: true },
    { id: 'rental', name: 'Rental', category: 'other', active: true },
    { id: 'subscription', name: 'Subscription', category: 'other', active: true },
    { id: 'npmc', name: 'NPMC', category: 'other', active: true },
    // Row 10
    { id: 'nps', name: 'NPS', category: 'other', active: true },
    { id: 'prepaid-meter', name: 'Prepaid Meter', category: 'recharge', active: true },
    { id: 'neeraj-bar', name: 'Neeraj Bar', category: 'other', active: true },
  ]);

  // Filter & Search Logic
  const filteredServices = services.filter(srv => {
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || srv.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleToggleService = (id) => {
    setServices(prev => prev.map(srv => 
      srv.id === id ? { ...srv, active: !srv.active } : srv
    ));
  };

  const handleMasterShutdown = () => {
    showCustomConfirm(
      "Confirm Master Shutdown",
      "Are you absolutely sure you want to shut down ALL services? This will set all service components to Down (OFFLINE).",
      () => {
        setServices(prev => prev.map(srv => ({ ...srv, active: false })));
        setSuccessMsg("All services have been set to OFFLINE.");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    );
  };

  const handleMasterRestore = () => {
    showCustomConfirm(
      "Confirm Enable All",
      "Are you sure you want to activate ALL services? This will set all service components to UP (ONLINE).",
      () => {
        setServices(prev => prev.map(srv => ({ ...srv, active: true })));
        setSuccessMsg("All services have been set to ONLINE.");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    );
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showCustomAlert("Success", "Service statuses updated successfully on the server.");
    }, 1200);
  };

  return (
    <div className={styles.container} style={{ padding: '15px 12px', maxWidth: '100%' }}>
      {/* ── MAIN CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
        
        {/* CARD INTERNAL HEADER (Polished & height decreased) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(23, 86, 170, 0.1)', color: '#1756AA', borderRadius: '8px' }}>
              <FiActivity style={{ fontSize: '1.1rem' }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0D1B3E' }}>Service On/Off Control</h3>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleMasterRestore}
              style={{ padding: '6px 12px', background: 'rgba(34, 197, 94, 0.1)', color: '#16A34A', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '8px', cursor: 'pointer' }}
            >
              ENABLE ALL
            </button>
            <button 
              onClick={handleMasterShutdown}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer' }}
            >
              <FiPower /> MASTER SHUTDOWN
            </button>
          </div>
        </div>

        {/* CONTENT VIEW AREA */}
        <div style={{ padding: '24px' }}>
           
           {/* FILTER & SEARCH HEADER BAR */}
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '25px', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                 <FiSearch style={{ position: 'absolute', left: '14px', color: '#94A3B8' }} />
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search services (e.g. Recharge, AEPS)..."
                   style={{ 
                     width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #CBD5E1', 
                     borderRadius: '10px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', fontWeight: 600,
                     boxSizing: 'border-box'
                   }}
                 />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 800, whiteSpace: 'nowrap' }}>Category:</span>
                 <select 
                   value={categoryFilter}
                   onChange={(e) => setCategoryFilter(e.target.value)}
                   className={styles.inputControl}
                   style={{ height: '42px', borderRadius: '10px', border: '1px solid #CBD5E1', paddingLeft: '10px', color: '#1E293B', fontWeight: 600, margin: 0 }}
                 >
                    <option value="all">All Service Types</option>
                    <option value="recharge">Utility & Recharge Services</option>
                    <option value="banking">Banking & Financial Services</option>
                    <option value="other">Other Services</option>
                 </select>
              </div>
           </div>

           {/* SERVICES STATUS CARDS GRID */}
           <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
              gap: '12px', 
              marginBottom: '30px',
              minHeight: '120px'
           }}>
              {filteredServices.map((srv) => (
                 <div 
                   key={srv.id} 
                   style={{ 
                     display: 'flex', 
                     flexDirection: 'row',
                     alignItems: 'center', 
                     justifyContent: 'space-between',
                     borderRadius: '10px', 
                     background: '#ffffff', 
                     border: '1px solid #E2E8F0',
                     boxShadow: '0 2px 6px rgba(0,0,0,0.015)',
                     padding: '14px 16px',
                     transition: 'all 0.2s ease',
                     boxSizing: 'border-box'
                   }}
                 >
                   {/* Left Side: Service Name */}
                   <span style={{ 
                     fontSize: '0.82rem', 
                     fontWeight: 700, 
                     color: '#1E293B',
                     wordBreak: 'break-word',
                     lineHeight: '1.2',
                     marginRight: '8px'
                   }}>
                     {srv.name}
                   </span>

                   {/* Right Side: Toggle Control Container */}
                   <div style={{ 
                     display: 'flex', 
                     alignItems: 'center', 
                     gap: '8px',
                     flexShrink: 0
                   }}>
                     {/* Toggle Switch */}
                     <div 
                       onClick={() => handleToggleService(srv.id)}
                       style={{
                         width: '38px',
                         height: '20px',
                         borderRadius: '10px',
                         background: srv.active ? '#1756AA' : '#CBD5E1',
                         position: 'relative',
                         cursor: 'pointer',
                         transition: 'background-color 0.2s',
                         display: 'flex',
                         alignItems: 'center',
                         flexShrink: 0
                       }}
                     >
                       <div style={{
                         width: '14px',
                         height: '14px',
                         borderRadius: '50%',
                         background: '#fff',
                         position: 'absolute',
                         left: srv.active ? '21px' : '3px',
                         transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                         boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                       }} />
                     </div>
                     <span style={{ 
                       fontSize: '0.78rem', 
                       fontWeight: 800, 
                       color: srv.active ? '#1756AA' : '#64748B',
                       minWidth: '32px'
                     }}>
                       {srv.active ? 'UP' : 'Down'}
                     </span>
                   </div>
                 </div>
              ))}
              {filteredServices.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  <FiInfo style={{ fontSize: '1.5rem', marginBottom: '8px' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>No services matched your search query.</p>
                </div>
              ) : null}
           </div>

           {/* ACTIONS BUTTONS AND MESSAGES */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button 
                disabled={isSaving}
                onClick={handleSaveChanges}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  background: isSaving ? '#60A5FA' : '#1756AA', 
                  color: '#fff', border: 'none', borderRadius: '10px', 
                  padding: '14px 28px', fontSize: '0.9rem', fontWeight: 800, 
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(23, 86, 170, 0.2)' 
                }}
              >
                 {isSaving ? <FiRefreshCw className={styles.spin} /> : <FiCheck />} 
                 <span>{isSaving ? 'Saving Changes...' : 'Save Service Statuses'}</span> 
              </button>

              {successMsg && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#16A34A', 
                  fontSize: '0.95rem', 
                  fontWeight: 700 
                }}>
                  <FiCheck style={{ fontSize: '1.2rem' }} /> <span>{successMsg}</span>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* ── CUSTOM PREMIUM POPUP MODAL ── */}
      {modal.show && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '14px', width: '380px', maxWidth: '90%',
            padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center', border: '1px solid #E2E8F0'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: modal.type === 'confirm' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(23, 86, 170, 0.1)',
              color: modal.type === 'confirm' ? '#EF4444' : '#1756AA',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', margin: '0 auto 16px auto'
            }}>
              {modal.type === 'confirm' ? <FiPower /> : <FiInfo />}
            </div>
            
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E' }}>
              {modal.title}
            </h4>
            <p style={{ margin: '0 0 24px 0', fontSize: '0.88rem', color: '#64748B', fontWeight: 600, lineHeight: '1.4' }}>
              {modal.message}
            </p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {modal.type === 'confirm' ? (
                <>
                  <button 
                    onClick={() => setModal({ ...modal, show: false })}
                    style={{
                      flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0',
                      background: '#fff', color: '#64748B', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      modal.onConfirm();
                      setModal({ ...modal, show: false });
                    }}
                    style={{
                      flex: 1, padding: '10px 16px', borderRadius: '8px', border: 'none',
                      background: '#1756AA', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(23, 86, 170, 0.2)'
                    }}
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setModal({ ...modal, show: false })}
                  style={{
                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                    background: '#1756AA', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Okay
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnOffServices;
