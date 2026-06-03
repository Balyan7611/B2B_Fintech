import React, { useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaCopy, FaCheck, FaDatabase,
  FaFileExcel, FaFilePdf, FaFileCsv, FaPrint, FaSearch, FaChevronLeft, FaChevronRight, FaProjectDiagram, FaTimes, FaChevronDown
} from 'react-icons/fa';
import styles from '../../../../admin/components/MemberPages/MemberPages.module.css';

const ALL_SERVICES = [
  'AEPS', 'Account Opening', 'Account Verification', 'Aeps Registration', 'Broadband', 'BroadBand',
  'Broadband Postpaid', 'BUS BOOKING', 'Credit Card Payment', 'DataCard', 'Digital Voucher',
  'DMT PPI', 'EXPRESS DMT', 'FLIGHT BOOKING', 'FundRequest', 'GOLD PURCHASE', 'Google Game',
  'HOLIDAY PACKAGE', 'HOTEL BOOKING', 'IRCTC', 'MATM', 'MATM OnBoard', 'Metro', 'Money Transfer',
  'My Services', 'NSDL PAN', 'Offline', 'offlinelink', 'Payment Gateway', 'Quick Search',
  'Settlement', 'Upgrade Plan', 'UPI Payment', 'Wallet 2 Wallet', 'XOMO EXPRESS', 'XOMO EXPRESS DMT',
  'XOMO UPI'
];

const INITIAL_DATA = [
  { id: 1, service: 'AEPS', pipeName: 'pipe9', aliasName: 'Jio', isActive: true },
  { id: 2, service: 'XOMO EXPRESS DMT', pipeName: 'Payout', aliasName: 'Safe', isActive: true },
  { id: 3, service: 'XOMO EXPRESS DMT', pipeName: 'DMTPayoutSettlement', aliasName: 'bank2', isActive: true },
  { id: 4, service: 'XOMO EXPRESS DMT', pipeName: 'Bank1', aliasName: 'Fino Bank', isActive: true },
  { id: 5, service: 'XOMO UPI', pipeName: 'Payout', aliasName: 'UPI', isActive: true },
];

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{
        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: checked ? '#10B981' : '#EF4444', transition: '.3s', borderRadius: '34px'
      }}>
        <span style={{
          position: 'absolute', height: '14px', width: '14px', left: checked ? '23px' : '3px', bottom: '3px',
          backgroundColor: 'white', transition: '.3s', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}></span>
      </span>
    </label>
  );
};

const SearchableSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(value);
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 30px 10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', outline: 'none', background: '#fff', cursor: 'pointer' }}
      />
      <FaChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', fontSize: '0.8rem' }} />
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
          {filteredOptions.length > 0 ? filteredOptions.map((opt, i) => (
            <div
              key={i}
              style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#334155' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => {
                onChange(opt);
                setSearchTerm(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          )) : (
            <div style={{ padding: '10px 14px', fontSize: '0.85rem', color: '#94a3b8' }}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

const PipeMasterNew = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, id: null });
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const [formData, setFormData] = useState({
    service: '',
    pipeName: '',
    aliasName: '',
    isActive: true
  });

  const toggleField = (id, field) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, [field]: !item[field] } : item));
  };

  const handleFormToggle = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleEdit = (item) => {
    setFormData({
      service: item.service,
      pipeName: item.pipeName,
      aliasName: item.aliasName,
      isActive: item.isActive
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      service: '', pipeName: '', aliasName: '', isActive: true
    });
  };

  const handleDelete = () => {
    setData(prev => prev.filter(item => item.id !== showConfirmModal.id));
    setShowConfirmModal({ isOpen: false, id: null });
  };

  return (
    <div className={styles.container} style={{ padding: '10px 15px 200px 15px', maxWidth: '100%', minHeight: '100vh' }}>
      {/* ── MAIN LISTING CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden' }}>

        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 15px', borderBottom: '1px solid #F1F5F9', flexWrap: 'nowrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div style={{ width: '36px', height: '36px', background: 'rgba(23, 86, 170, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1756AA', flexShrink: 0 }}>
              <FaProjectDiagram style={{ fontSize: '1.1rem' }} />
            </div>
            <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', fontWeight: 800, color: '#0D1B3E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Pipe Master</h3>
          </div>
          <button
            onClick={() => {
              setFormData({ service: '', pipeName: '', aliasName: '', isActive: true });
              setEditingId(null);
              setIsModalOpen(true);
            }}
            style={{ background: '#10B981', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 600, fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            <FaPlus /> <span>Add New</span>
          </button>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="global-table-toolbar" style={{ padding: '20px 25px', flexWrap: 'wrap', gap: '20px', borderBottom: 'none' }}>
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
            <FaSearch />
            <input
              type="text"
              placeholder="Search pipe master..."
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ width: '100%', minWidth: '900px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px', color: '#fff', border: 'none', padding: '14px 16px', fontSize: '0.75rem' }}>S.NO.</th>
                <th style={{ width: '90px', textAlign: 'center', color: '#fff', border: 'none', padding: '14px 16px', fontSize: '0.75rem' }}>ACTION</th>
                <th style={{ color: '#fff', border: 'none', padding: '14px 16px', fontSize: '0.75rem' }}>SERVICE</th>
                <th style={{ color: '#fff', border: 'none', padding: '14px 16px', fontSize: '0.75rem' }}>PIPE NAME</th>
                <th style={{ color: '#fff', border: 'none', padding: '14px 16px', fontSize: '0.75rem' }}>ALIAS NAME</th>
                <th style={{ color: '#fff', border: 'none', padding: '14px 16px', fontSize: '0.75rem' }}>IS ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={{ color: '#A0AEC0', fontWeight: 700, padding: '12px 16px' }}>{item.id}</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(item)} className={styles.editBtn} style={{ width: '32px', height: '32px', background: 'rgba(23, 86, 170, 0.1)', color: '#1756AA', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Edit"><FaEdit /></button>
                      <button onClick={() => setShowConfirmModal({ isOpen: true, id: item.id })} className={styles.deleteBtn} style={{ width: '32px', height: '32px', background: 'rgba(239, 68, 68, 0.1)', color: '#E53E3E', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Delete"><FaTrash /></button>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#334155', padding: '12px 16px' }}>{item.service}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: 'rgba(23, 86, 170, 0.08)', color: '#1756AA', padding: '4px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem' }}>
                      {item.pipeName}
                    </span>
                  </td>
                  <td style={{ color: '#475569', padding: '12px 16px' }}>{item.aliasName}</td>
                  <td style={{ padding: '12px 16px' }}><ToggleSwitch checked={item.isActive} onChange={() => toggleField(item.id, 'isActive')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationRow} style={{ marginTop: '20px', padding: '15px 20px 25px 20px', borderTop: '1px solid #F1F5F9' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>Showing {data.length} records</span>
          <div className={styles.pagination} style={{ display: 'flex', gap: '6px' }}>
            <button className={styles.pageBtn} style={{ width: '32px', height: '32px' }} disabled><FaChevronLeft /></button>
            <button className={`${styles.pageBtn} ${styles.pageActive}`} style={{ width: '32px', height: '32px' }}>1</button>
            <button className={styles.pageBtn} style={{ width: '32px', height: '32px' }} disabled><FaChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── PREMIUM ADD/EDIT PIPE MASTER MODAL ── */}
      {isModalOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3500 }}>
          <div className={styles.modalContainer} style={{ width: '800px', maxWidth: '95%', borderRadius: '16px', overflow: 'visible', background: '#fff', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            {/* Modal Header */}
            <div className={styles.modalHeader} style={{ padding: '20px 25px 15px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(23, 86, 170, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1756AA' }}>
                  <FaProjectDiagram style={{ fontSize: '1.2rem' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0D1B3E' }}>{editingId ? 'Edit Pipe Master' : 'Add Pipe Master'}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#718096' }}>{editingId ? 'Update pipe master configuration' : 'Configure new pipe master entry'}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#94a3b8', padding: '5px' }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody} style={{ padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', minHeight: '350px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Service <span style={{ color: '#ef4444' }}>*</span></label>
                  <SearchableSelect
                    options={ALL_SERVICES}
                    value={formData.service}
                    onChange={(val) => setFormData({ ...formData, service: val })}
                    placeholder="Search Service..."
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Pipe Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Pipe Name (e.g. pipe9)"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', outline: 'none' }}
                    value={formData.pipeName} onChange={(e) => setFormData({ ...formData, pipeName: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Alias Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Alias Name (e.g. Jio)"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', outline: 'none' }}
                    value={formData.aliasName} onChange={(e) => setFormData({ ...formData, aliasName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', background: '#f8fafc', padding: '15px 20px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>Is Active</span>
                <ToggleSwitch checked={formData.isActive} onChange={() => handleFormToggle('isActive')} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter} style={{ padding: '10px 20px', background: '#FBFDFF', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={handleCloseModal}
                style={{ background: '#f1f5f9', color: '#64748b', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Close
              </button>
              <button
                onClick={() => setShowConfirmSubmit(true)}
                style={{ background: 'linear-gradient(135deg, #1756AA 0%, #1e3a8a 100%)', color: '#fff', border: 'none', padding: '10px 32px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(23,86,170,0.3)', transition: 'all 0.2s' }}
              >
                {editingId ? 'Update Record' : 'Save Record'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM SUBMIT MODAL */}
      {showConfirmSubmit && (
        <div className={styles.modalOverlay} style={{ zIndex: 3700 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '16px', padding: '24px', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', background: '#E0F2FE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', marginBottom: '16px' }}>
                <FaCheck style={{ fontSize: '1.2rem' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Confirm Save</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to save these pipe master settings?
              </p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', color: '#4E6080', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowConfirmSubmit(false);
                    handleCloseModal();
                  }}
                  style={{ flex: 1, padding: '10px', background: '#0ea5e9', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showConfirmModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3600 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '16px', padding: '24px', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', background: '#FFF5F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53E3E', marginBottom: '16px' }}>
                <FaTrash style={{ fontSize: '1.2rem' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Delete Record</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to delete this pipe master entry? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button
                  onClick={() => setShowConfirmModal({ isOpen: false, id: null })}
                  style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', color: '#4E6080', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  style={{ flex: 1, padding: '10px', background: '#E53E3E', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipeMasterNew;
