import React, { useState } from 'react';
import { 
  FaSms, FaTasks, FaSearch, FaEdit, FaTrash, FaCopy, FaFileExcel, FaFilePdf, FaFileCsv, 
  FaPrint, FaChevronLeft, FaChevronRight, FaCheckCircle, FaTimesCircle, FaPlus, FaTimes, FaCheck, FaChartBar
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const ManageSMSTemplate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, id: null });
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    approved: true,
    usageCount: '0',
    lastModified: ''
  });

  const [templates, setTemplates] = useState([
    { id: 1, name: 'Registration OTP', approved: true, usageCount: '1,240', lastModified: '06/06/2025' },
    { id: 2, name: 'Password Reset', approved: true, usageCount: '450', lastModified: '05/06/2025' },
    { id: 3, name: 'Promo Blast', approved: false, usageCount: '0', lastModified: '04/06/2025' },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toLocaleDateString();
    if (editingItem) {
      setTemplates(templates.map(t => t.id === editingItem.id ? { ...t, ...formData, lastModified: now } : t));
    } else {
      setTemplates([{ ...formData, id: Date.now(), lastModified: now }, ...templates]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', approved: true, usageCount: '0', lastModified: '' });
    setEditingItem(null);
    setShowModal(false);
  };

  const handleEdit = (tmp) => {
    setEditingItem(tmp);
    setFormData({
      name: tmp.name,
      approved: tmp.approved,
      usageCount: tmp.usageCount,
      lastModified: tmp.lastModified
    });
    setShowModal(true);
  };

  const handleDelete = () => {
    setTemplates(templates.filter(t => t.id !== showConfirmModal.id));
    setShowConfirmModal({ isOpen: false, id: null });
  };

  return (
    <div className={styles.container} style={{ padding: '10px 15px', maxWidth: '100%' }}>
      {/* ── MAIN LISTING CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'nowrap', gap: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E', whiteSpace: 'nowrap' }}>Manage SMS Template</h2>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', 
            color: '#fff', border: 'none', borderRadius: '8px', 
            padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, 
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)' 
          }} onClick={() => setShowModal(true)}>
            <FaPlus /> <span>Add Template</span>
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
              placeholder="Search templates..." 
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ width: '100%', minWidth: '800px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px' }}>S.No</th>
                <th style={{ width: '100px', textAlign: 'center' }}>ACTION</th>
                <th style={{ width: '250px' }}>TEMPLATE NAME</th>
                <th style={{ width: '150px', textAlign: 'left' }}>APPROVAL STATUS</th>
                <th style={{ width: '120px', textAlign: 'left' }}>USAGE COUNT</th>
                <th style={{ textAlign: 'left' }}>LAST MODIFIED</th>
              </tr>
            </thead>
            <tbody>
              {templates.length === 0 ? (
                <tr>
                   <td colSpan="6" style={{ textAlign: 'center', padding: '60px', color: '#A0AEC0' }}>No templates found</td>
                </tr>
              ) : (
                templates.map((tmp, idx) => (
                  <tr key={tmp.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td style={{ color: '#A0AEC0', fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <button className={styles.editBtn} style={{ width: '32px', height: '32px', background: '#1756AA', color: '#fff' }} onClick={() => handleEdit(tmp)}><FaEdit /></button>
                        <button className={styles.deleteBtn} style={{ width: '32px', height: '32px', background: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7' }} onClick={() => setShowConfirmModal({ isOpen: true, id: tmp.id })}><FaTrash /></button>
                      </div>
                    </td>
                    <td>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, color: '#1756AA', fontSize: '0.9rem' }}>{tmp.name}</span>
                       </div>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      {tmp.approved ? (
                        <span className={`${styles.badge} ${styles.badge_green}`} style={{ padding: '4px 12px', fontSize: '0.65rem' }}>
                           <FaCheckCircle style={{ marginRight: '5px' }} /> Approved
                        </span>
                      ) : (
                        <span className={`${styles.badge} ${styles.badge_red}`} style={{ padding: '4px 12px', fontSize: '0.65rem' }}>
                           <FaTimesCircle style={{ marginRight: '5px' }} /> Pending
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'left' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FaChartBar style={{ color: '#1756AA', opacity: 0.5, fontSize: '0.8rem' }} />
                          <span style={{ fontWeight: 800, color: '#4E6080', fontSize: '0.9rem' }}>{tmp.usageCount}</span>
                       </div>
                    </td>
                    <td style={{ textAlign: 'left', fontSize: '0.8rem', color: '#718096' }}>{tmp.lastModified}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── EDIT/ADD MODAL ── */}
      {showModal && (
        <div className={styles.modalOverlay} style={{ zIndex: 3500 }}>
          <div className={styles.modalContainer} style={{ width: '450px', borderRadius: '16px' }}>
            <div className={styles.modalHeader} style={{ padding: '20px 25px 15px', borderBottom: '1px solid #F1F5F9' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', background: 'rgba(23, 86, 170, 0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1756AA' }}>
                     <FaEdit />
                  </div>
                  <div>
                    <h3 className={styles.modalTitle} style={{ margin: 0, fontSize: '1.1rem' }}>{editingItem ? 'Edit Template Info' : 'New Template Entry'}</h3>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#718096' }}>Update usage and approval status</p>
                  </div>
               </div>
               <button className={styles.closeBtn} onClick={resetForm}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody} style={{ padding: '20px 25px' }}>
                 <div className={styles.formGroup} style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>Template Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      className={styles.inputControl} 
                      style={{ height: '40px', fontSize: '0.85rem' }} 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                 </div>
                 <div className={styles.formGroup} style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>Usage Count</label>
                    <input 
                      type="text" 
                      name="usageCount" 
                      className={styles.inputControl} 
                      style={{ height: '40px', fontSize: '0.85rem' }} 
                      value={formData.usageCount} 
                      onChange={handleInputChange} 
                    />
                 </div>
                 <div className={styles.formGroup}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: '#0D1B3E', fontWeight: 600 }}>
                      <input 
                        type="checkbox" 
                        name="approved" 
                        checked={formData.approved} 
                        onChange={handleInputChange} 
                      /> Approved & Active
                    </label>
                 </div>
              </div>

              <div className={styles.modalFooter} style={{ padding: '15px 25px', background: '#FBFDFF', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  <button type="button" className={styles.prevBtn} style={{ height: '38px', padding: '0 20px', fontSize: '0.8rem' }} onClick={resetForm}>Cancel</button>
                  <div style={{ flex: 1 }}></div>
                  <button type="submit" className={styles.publishBtn} style={{ height: '38px', padding: '0 30px', fontSize: '0.85rem' }}>
                    <FaCheck /> {editingItem ? 'Save Changes' : 'Add Entry'}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showConfirmModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3600 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', background: '#FFF5F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53E3E', marginBottom: '16px' }}>
                <FaTrash style={{ fontSize: '1.2rem' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Delete Template</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to delete this SMS template? This action cannot be undone.
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

export default ManageSMSTemplate;
