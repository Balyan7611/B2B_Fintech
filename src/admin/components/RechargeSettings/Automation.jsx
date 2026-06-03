import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiActivity, FiFilter, FiX, FiCheck, FiChevronLeft, FiChevronRight, FiDatabase, FiCpu, FiPackage, FiSave, FiAlertCircle
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const Automation = () => {
  const dispatch = useDispatch();
  
  // Package list
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

  const [selectedPackage, setSelectedPackage] = useState('');
  const [pkgSearch, setPkgSearch] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, type: '', item: null });
  const [showSuccessToast, setShowSuccessToast] = useState({ show: false, message: '' });

  // Mock Operators Data
  const [operatorsData, setOperatorsData] = useState([
    { name: 'Airtel Digital Tv', code: 'AD', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Airtel', code: 'AT', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Bsnl', code: 'BS', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Dish Tv', code: 'DS', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Google Play', code: 'GLC', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Jio', code: 'JIO', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Sun Direct', code: 'SD', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Tata Sky', code: 'TS', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Videocon D2h', code: 'VD', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' },
    { name: 'Vi', code: 'VIL', activeApi: 'SoniTechno', commission: '0', api1: '', api2: '', api3: '', api4: '' }
  ]);

  const handleSaveAll = () => {
    setShowConfirmModal({ isOpen: true, type: 'all', item: null });
  };

  const handleSingleSave = (item) => {
    setShowConfirmModal({ isOpen: true, type: 'single', item });
  };

  const handleConfirmSave = () => {
    const { type, item } = showConfirmModal;
    setShowConfirmModal({ isOpen: false, type: '', item: null });
    
    const msg = type === 'all' 
      ? 'All operator API routes updated successfully!' 
      : `API route successfully updated for ${item.name}!`;

    setShowSuccessToast({ show: true, message: msg });
    setTimeout(() => {
      setShowSuccessToast({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', background: '#fff', borderRadius: '16px' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E' }}>Change API</h3>
        </div>

        {/* ── SELECTORS & HEADER ACTION BUTTONS ── */}
        <div style={{ display: 'flex', gap: '20px', padding: '15px 25px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Select Package dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '220px', flex: 1 }}>
            <select 
              value={selectedPackage} 
              onChange={(e) => setSelectedPackage(e.target.value)}
              style={{
                width: '100%', height: '42px', border: '1.5px solid #E2E8F0', borderRadius: '10px',
                padding: '0 16px', fontSize: '0.85rem', color: '#1E293B', fontWeight: 600,
                background: '#fff', cursor: 'pointer', outline: 'none'
              }}
            >
              <option value="">Select Package</option>
              {packagesList.map(pkg => (
                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handleSaveAll}
              style={{
                background: '#22C55E', color: '#fff', border: 'none', borderRadius: '8px',
                padding: '10px 24px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
              }}
            >
              Save All
            </button>
            <button 
              onClick={() => {}} 
              style={{
                background: '#FF5A5F', color: '#fff', border: 'none', borderRadius: '8px',
                padding: '10px 24px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 90, 95, 0.2)'
              }}
            >
              Back
            </button>
          </div>
        </div>

        {/* ── TOOLBAR ── */}
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

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            <button className="global-export-btn btn-copy" title="Copy Table"><FaCopy /></button>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>

          <div className="global-search-box" style={{ maxWidth: '300px' }}>
            <FiSearch />
            <input 
              type="text" 
              placeholder="Search operators..." 
              value={pkgSearch}
              onChange={(e) => setPkgSearch(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1100px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B3E 0%, #1a2f8a 100%)', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ color: '#ffffff', fontWeight: 800, padding: '12px 15px', width: '280px' }}>Operator Details</th>
                <th style={{ color: '#ffffff', fontWeight: 800, padding: '12px 15px', textAlign: 'center', width: '180px' }}>Api 1</th>
                <th style={{ color: '#ffffff', fontWeight: 800, padding: '12px 15px', textAlign: 'center', width: '180px' }}>Api 2</th>
                <th style={{ color: '#ffffff', fontWeight: 800, padding: '12px 15px', textAlign: 'center', width: '180px' }}>Api 3</th>
                <th style={{ color: '#ffffff', fontWeight: 800, padding: '12px 15px', textAlign: 'center', width: '180px' }}>Api 4</th>
                <th style={{ color: '#ffffff', fontWeight: 800, padding: '12px 15px', textAlign: 'center', width: '120px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {!selectedPackage ? (
                <tr>
                  <td colSpan="6" style={{ padding: '0', background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, right: 0, width: '100%', minWidth: 'fit-content', margin: '0 auto', textAlign: 'center', padding: '100px 0', color: '#A0AEC0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCpu style={{ fontSize: '2.5rem', opacity: 0.2, color: '#1756AA' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E', display: 'block', marginBottom: '5px' }}>Automation Matrix Hidden</span>
                        <p style={{ fontSize: '0.85rem', color: '#718096', margin: 0 }}>Please select a package from the dropdown list to load mappings</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                operatorsData
                .filter(op => op.name.toLowerCase().includes(pkgSearch.toLowerCase()) || op.code.toLowerCase().includes(pkgSearch.toLowerCase()))
                .map((item, idx) => (
                  <tr key={idx} className={styles.hoverRow}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        <div><strong style={{ color: '#334155' }}>OperatorName:</strong> <span style={{ color: '#FF5A5F', fontWeight: 700 }}>{item.name}</span></div>
                        <div><strong style={{ color: '#334155' }}>OperatorCode:</strong> <span style={{ color: '#FF5A5F', fontWeight: 700 }}>{item.code}</span></div>
                        <div><strong style={{ color: '#334155' }}>Active API:</strong> <span style={{ color: '#FF5A5F', fontWeight: 700 }}>{item.activeApi}</span></div>
                        <div><strong style={{ color: '#334155' }}>Commission:</strong> <span style={{ color: '#FF5A5F', fontWeight: 700 }}>{item.commission}</span></div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <select 
                        value={item.api1} 
                        onChange={(e) => {
                          const updated = [...operatorsData];
                          updated[idx].api1 = e.target.value;
                          setOperatorsData(updated);
                        }}
                        style={{
                          height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px',
                          padding: '0 10px', fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600,
                          background: '#fff', cursor: 'pointer', outline: 'none', width: '140px'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="SoniTechno">SoniTechno</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Razorpay">Razorpay</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <select 
                        value={item.api2} 
                        onChange={(e) => {
                          const updated = [...operatorsData];
                          updated[idx].api2 = e.target.value;
                          setOperatorsData(updated);
                        }}
                        style={{
                          height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px',
                          padding: '0 10px', fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600,
                          background: '#fff', cursor: 'pointer', outline: 'none', width: '140px'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="SoniTechno">SoniTechno</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Razorpay">Razorpay</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <select 
                        value={item.api3} 
                        onChange={(e) => {
                          const updated = [...operatorsData];
                          updated[idx].api3 = e.target.value;
                          setOperatorsData(updated);
                        }}
                        style={{
                          height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px',
                          padding: '0 10px', fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600,
                          background: '#fff', cursor: 'pointer', outline: 'none', width: '140px'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="SoniTechno">SoniTechno</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Razorpay">Razorpay</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <select 
                        value={item.api4} 
                        onChange={(e) => {
                          const updated = [...operatorsData];
                          updated[idx].api4 = e.target.value;
                          setOperatorsData(updated);
                        }}
                        style={{
                          height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px',
                          padding: '0 10px', fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600,
                          background: '#fff', cursor: 'pointer', outline: 'none', width: '140px'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="SoniTechno">SoniTechno</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Razorpay">Razorpay</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <button 
                        onClick={() => handleSingleSave(item)}
                        style={{ 
                          padding: '8px 20px', background: '#FF5A5F', 
                          color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', 
                          fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                          boxShadow: '0 4px 12px rgba(255, 90, 95, 0.2)'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="global-pagination" style={{ padding: '15px 20px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
            Showing {selectedPackage ? operatorsData.length : 0} of {selectedPackage ? operatorsData.length : 0} records
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronLeft /></button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', background: '#1756AA', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>1</div>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION POPUP MODAL */}
      {showConfirmModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3600 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', background: '#FEF3C7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: '16px' }}>
                <FiAlertCircle style={{ fontSize: '1.4rem' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>
                {showConfirmModal.type === 'all' ? 'Save All Mappings?' : 'Confirm Save'}
              </h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                {showConfirmModal.type === 'all' 
                  ? 'Are you sure you want to save API routing configurations for all operators?'
                  : `Are you sure you want to save API routing details for ${showConfirmModal.item?.name}?`}
              </p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button
                  onClick={() => setShowConfirmModal({ isOpen: false, type: '', item: null })}
                  style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', color: '#4E6080', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSave}
                  style={{ flex: 1, padding: '10px', background: '#22C55E', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST BANNER */}
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

export default Automation;
