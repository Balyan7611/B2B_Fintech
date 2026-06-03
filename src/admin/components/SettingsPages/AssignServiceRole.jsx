import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiChevronDown, FiDatabase, FiX, FiCheck, FiUserCheck, FiSettings, FiGrid, FiArrowRight, FiRefreshCw, FiInfo, FiUsers, FiShield
} from 'react-icons/fi';
import styles from '../MemberPages/MemberPages.module.css';

// ── CUSTOM SEARCHABLE DROPDOWN COMPONENT ──
const CustomSearchSelect = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: '12px 16px', border: '1px solid #CBD5E1', borderRadius: '10px', 
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          background: '#fff', height: '45px', boxSizing: 'border-box'
        }}>
        <span style={{ color: value ? '#1E293B' : '#94A3B8', fontSize: '0.9rem', fontWeight: 600 }}>{value || placeholder}</span>
        <FiChevronDown style={{ color: '#94A3B8', transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
      </div>
      {isOpen && (
        <div style={{ 
          position: 'absolute', top: 'calc(100% + 5px)', left: 0, right: 0, background: '#fff', 
          border: '1px solid #E2E8F0', borderRadius: '10px', zIndex: 150, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' 
        }}>
          <div style={{ padding: '10px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
            <input 
              autoFocus
              type="text" 
              placeholder="Search role..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
             {filtered.map((opt, i) => (
               <div 
                 key={i} 
                 onClick={() => { onChange(opt); setIsOpen(false); setSearch(""); }}
                 style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem', color: '#1E293B', fontWeight: 600 }}
                 onMouseEnter={(e) => e.target.style.background = '#F8FAFC'}
                 onMouseLeave={(e) => e.target.style.background = 'transparent'}
               >
                 {opt}
               </div>
             ))}
             {filtered.length === 0 && <div style={{ padding: '15px', color: '#94A3B8', fontSize: '0.85rem', textAlign: 'center' }}>No roles found</div>}
          </div>
        </div>
      )}
    </div>
  );
};

const AssignServiceRole = () => {
  const dispatch = useDispatch();

  // Form & Interaction States
  const [role, setRole] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Custom Alert Modal State
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "alert"
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

  // Role Options list requested by the user
  const roleOptions = [
    "Master Distributor",
    "Distributor",
    "Retailer",
    "Admin",
    "White Label",
    "Client",
    "API User",
    "ASM",
    "Whitlable",
    "Unique"
  ];

  // Services State List (Consistent 57+ services)
  const [services, setServices] = useState([
    // Row 1
    { id: 'recharge', name: 'Recharge', category: 'recharge', checked: true },
    { id: 'mobile-postpaid', name: 'MOBILE POSTPAID', category: 'recharge', checked: true },
    { id: 'dth', name: 'DTH', category: 'recharge', checked: true },
    { id: 'electricity', name: 'Electricity', category: 'recharge', checked: false },
    { id: 'water', name: 'Water', category: 'recharge', checked: false },
    { id: 'gas', name: 'GAS', category: 'recharge', checked: false },
    // Row 2
    { id: 'lpg-gas', name: 'LPG Gas', category: 'recharge', checked: false },
    { id: 'insurance', name: 'Insurance', category: 'banking', checked: false },
    { id: 'internet', name: 'Internet', category: 'recharge', checked: false },
    { id: 'landline-postpaid', name: 'Landline Postpaid', category: 'recharge', checked: false },
    { id: 'emi', name: 'EMI', category: 'banking', checked: false },
    { id: 'fastag', name: 'Fastag', category: 'recharge', checked: false },
    // Row 3
    { id: 'education', name: 'Education', category: 'recharge', checked: false },
    { id: 'cable-tv', name: 'Cable Tv', category: 'recharge', checked: false },
    { id: 'municipal-tax', name: 'Municipal Tax', category: 'recharge', checked: false },
    { id: 'aeps', name: 'AEPS', category: 'banking', checked: true },
    { id: 'aadhar-pay', name: 'Aadhar Pay', category: 'banking', checked: true },
    { id: 'payment-gateway', name: 'Payment Gateway', category: 'banking', checked: false },
    // Row 4
    { id: 'scan-pay', name: 'Scan & Pay', category: 'banking', checked: false },
    { id: 'nsdl-pan', name: 'NSDL PAN', category: 'other', checked: false },
    { id: 'matm', name: 'mATM', category: 'banking', checked: false },
    { id: 'settlement', name: 'Settlement', category: 'banking', checked: false },
    { id: 'fund-transfer', name: 'Fund Transfer', category: 'banking', checked: false },
    { id: 'my-services', name: 'My Services', category: 'other', checked: false },
    // Row 5
    { id: 'matm-onboard', name: 'MATM OnBoard', category: 'banking', checked: false },
    { id: 'credit-card', name: 'Credit Card', category: 'banking', checked: false },
    { id: 'money-transfer', name: 'Money Transfer', category: 'banking', checked: false },
    { id: 'broadband', name: 'Broadband', category: 'recharge', checked: false },
    { id: 'datacard', name: 'DataCard', category: 'recharge', checked: false },
    { id: 'broadband-re', name: 'BroadBand', category: 'recharge', checked: false },
    // Row 6
    { id: 'digital-voucher', name: 'Digital Voucher', category: 'other', checked: false },
    { id: 'prepaid-datacard', name: 'Prepaid DataCard', category: 'recharge', checked: false },
    { id: 'metro', name: 'Metro', category: 'recharge', checked: false },
    { id: 'prebooking', name: 'Prebooking', category: 'other', checked: false },
    { id: 'wifi', name: 'WiFi', category: 'recharge', checked: false },
    { id: 'e-challan', name: 'E-Challan', category: 'other', checked: false },
    // Row 7
    { id: 'broadband-postpaid', name: 'Broadband Postpaid', category: 'recharge', checked: false },
    { id: 'pay-credit-card', name: 'Pay Credit Card Bills', category: 'banking', checked: false },
    { id: 'account-verification', name: 'Account Verification', category: 'banking', checked: false },
    { id: 'dmt-ppi', name: 'DMT PPI', category: 'banking', checked: false },
    { id: 'account-opening', name: 'Account Opening', category: 'banking', checked: false },
    { id: 'loan', name: 'Loan', category: 'banking', checked: false },
    // Row 8
    { id: 'mobile-prepaid', name: 'Mobile Prepaid', category: 'recharge', checked: true },
    { id: 'donation', name: 'Donation', category: 'other', checked: false },
    { id: 'health-insurance', name: 'Health Insurance', category: 'banking', checked: false },
    { id: 'housing-society', name: 'Housing Society', category: 'other', checked: false },
    { id: 'life-insurance', name: 'Life Insurance', category: 'banking', checked: false },
    { id: 'loan-repay', name: 'Loan Repay', category: 'banking', checked: false },
    // Row 9
    { id: 'municipal-service', name: 'Muncipal Service', category: 'other', checked: false },
    { id: 'recurring-deposit', name: 'Recurring Deposit', category: 'banking', checked: false },
    { id: 'clubs-association', name: 'Clubs Association', category: 'other', checked: false },
    { id: 'rental', name: 'Rental', category: 'other', checked: false },
    { id: 'subscription', name: 'Subscription', category: 'other', checked: false },
    { id: 'npmc', name: 'NPMC', category: 'other', checked: false },
    // Row 10
    { id: 'nps', name: 'NPS', category: 'other', checked: false },
    { id: 'prepaid-meter', name: 'Prepaid Meter', category: 'recharge', checked: false },
    { id: 'neeraj-bar', name: 'Neeraj Bar', category: 'other', checked: false },
  ]);

  // Filter Logic
  const filteredServices = services.filter(srv => {
    if (categoryFilter === "all") return true;
    return srv.category === categoryFilter;
  });

  const allFilteredChecked = filteredServices.length > 0 && filteredServices.every(srv => srv.checked);

  // Toggle all filtered services
  const handleSelectAllToggle = () => {
    const targetState = !allFilteredChecked;
    setServices(prev => prev.map(srv => {
      const isFiltered = categoryFilter === "all" || srv.category === categoryFilter;
      if (isFiltered) {
        return { ...srv, checked: targetState };
      }
      return srv;
    }));
  };

  const handleToggleService = (id) => {
    setServices(prev => prev.map(srv => 
      srv.id === id ? { ...srv, checked: !srv.checked } : srv
    ));
  };

  const handleUpdate = () => {
    if (!role) {
      showCustomAlert("Validation Error", "Please select a Target Role before updating role services.");
      return;
    }
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setSuccessMsg("Role services updated successfully!");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className={styles.container} style={{ padding: '15px 12px', maxWidth: '100%' }}>
      {/* ── MAIN CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
        
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(23, 86, 170, 0.1)', color: '#1756AA', borderRadius: '8px' }}>
              <FiShield style={{ fontSize: '1.1rem' }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0D1B3E' }}>Assign Services to Role</h3>
          </div>
        </div>

        {/* CONTENT VIEW AREA */}
        <div style={{ padding: '24px' }}>
           
           {/* CONFIG SECTION */}
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'flex-end', marginBottom: '30px' }}>
              <div className={styles.formGroup} style={{ margin: 0 }}>
                 <label className={styles.label} style={{ fontWeight: 700, color: '#4E6080', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                   <FiUsers style={{ color: '#1756AA' }} /> Role *
                 </label>
                 <CustomSearchSelect 
                   options={roleOptions} 
                   placeholder="Select Role" 
                   value={role} 
                   onChange={setRole} 
                 />
              </div>
              <div className={styles.formGroup} style={{ margin: 0 }}>
                 <label className={styles.label} style={{ fontWeight: 700, color: '#4E6080', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                   <FiGrid style={{ color: '#1756AA' }} /> Filter Service Category
                 </label>
                 <select 
                   value={categoryFilter}
                   onChange={(e) => setCategoryFilter(e.target.value)}
                   className={styles.inputControl}
                   style={{ height: '45px', borderRadius: '10px', border: '1px solid #CBD5E1', paddingLeft: '10px', color: '#1E293B', fontWeight: 600 }}
                 >
                    <option value="all">All Services (Show All)</option>
                    <option value="recharge">Utility & Recharge Services</option>
                    <option value="banking">Banking & Financial Services</option>
                    <option value="other">Other Services</option>
                 </select>
              </div>
           </div>

           {/* SERVICE SELECTION GRID HEADER */}
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #F1F5F9' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1756AA', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiGrid /> Available Services ({filteredServices.length})
              </h4>
              <button 
                type="button" 
                onClick={handleSelectAllToggle}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  background: allFilteredChecked ? 'rgba(239, 68, 68, 0.1)' : 'rgba(23, 86, 170, 0.1)', 
                  color: allFilteredChecked ? '#EF4444' : '#1756AA', 
                  border: 'none', borderRadius: '8px', 
                  padding: '6px 16px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '4px',
                  border: allFilteredChecked ? 'none' : '2px solid #CBD5E1',
                  background: allFilteredChecked ? '#1756AA' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}>
                  {allFilteredChecked && <FiCheck style={{ color: '#fff', fontSize: '0.7rem', strokeWidth: 4 }} />}
                </div>
                <span>{allFilteredChecked ? 'Disable All' : 'Enable All'}</span>
              </button>
           </div>

           {/* SERVICES CARDS LAYOUT */}
           <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
              gap: '16px', 
              background: '#F8FAFC', 
              padding: '24px', 
              borderRadius: '12px', 
              border: '1px solid #E2E8F0',
              marginBottom: '30px',
              minHeight: '120px'
           }}>
              {filteredServices.map((srv) => (
                 <div 
                   key={srv.id} 
                   onClick={() => handleToggleService(srv.id)}
                   style={{ 
                     display: 'flex', 
                     flexDirection: 'row',
                     alignItems: 'center', 
                     gap: '12px', 
                     padding: '14px 18px', 
                     borderRadius: '10px', 
                     background: srv.checked ? '#F0F7FF' : '#ffffff', 
                     border: srv.checked ? '1.5px solid #1756AA' : '1.5px solid #E2E8F0', 
                     boxShadow: srv.checked ? '0 4px 10px rgba(23, 86, 170, 0.05)' : 'none',
                     cursor: 'pointer',
                     transition: 'all 0.15s ease',
                     boxSizing: 'border-box'
                   }}
                 >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: srv.checked ? 'none' : '2px solid #CBD5E1',
                      background: srv.checked ? '#1756AA' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}>
                      {srv.checked && (
                        <FiCheck style={{ color: '#fff', fontSize: '0.85rem', strokeWidth: 4 }} />
                      )}
                    </div>

                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: srv.checked ? '#0D1B3E' : '#4E6080', 
                      transition: 'all 0.2s',
                      wordBreak: 'break-word',
                      lineHeight: '1.3'
                    }}>
                      {srv.name}
                    </span>
                 </div>
              ))}
              {filteredServices.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  <FiInfo style={{ fontSize: '1.5rem', marginBottom: '8px' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>No services match the selected filter.</p>
                </div>
              )}
           </div>

           {/* ACTIONS BUTTONS AND MESSAGES */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button 
                disabled={isUpdating}
                onClick={handleUpdate}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  background: isUpdating ? '#60A5FA' : '#1756AA', 
                  color: '#fff', border: 'none', borderRadius: '10px', 
                  padding: '14px 28px', fontSize: '0.9rem', fontWeight: 800, 
                  cursor: isUpdating ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(23, 86, 170, 0.2)' 
                }}
              >
                 {isUpdating ? <FiRefreshCw className={styles.spin} /> : <FiCheck />} 
                 <span>{isUpdating ? 'Updating...' : 'Update Role Services'}</span> 
                 {!isUpdating && <FiArrowRight />}
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
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', margin: '0 auto 16px auto'
            }}>
              <FiInfo />
            </div>
            
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E' }}>
              {modal.title}
            </h4>
            <p style={{ margin: '0 0 24px 0', fontSize: '0.88rem', color: '#64748B', fontWeight: 600, lineHeight: '1.4' }}>
              {modal.message}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => setModal({ ...modal, show: false })}
                style={{
                  padding: '10px 24px', borderRadius: '8px', border: 'none',
                  background: '#1756AA', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                }}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignServiceRole;
