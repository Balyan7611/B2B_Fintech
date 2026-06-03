import React, { useState } from 'react';
import { 
  FaSms, FaPlus, FaSearch, FaEdit, FaTrash, FaCopy, FaFileExcel, FaFilePdf, FaFileCsv, 
  FaPrint, FaChevronLeft, FaChevronRight, FaCode, FaCheck, FaCalendarAlt, FaTimes, FaInfoCircle, FaFileAlt
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const SMSTemplate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, id: null });
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    templateId: '',
    api: 'WhatsApp',
    status: 'Active',
    content: ''
  });

  const [templates, setTemplates] = useState([
    { 
      id: 1, 
      category: 'Admin Login OTP', 
      content: 'Dear Sir, your Admin Login OTP is {#var#} SonTechno', 
      templateId: '1707171281110040823', 
      api: 'WhatsApp', 
      status: 'Active',
      addDate: '14/08/2024 14:59:03' 
    },
    { 
      id: 2, 
      category: 'Admin Fund Add OTP', 
      content: 'Your {#var#} OTP of Add Fund is do not share this OTP with anyone else. SonTechno', 
      templateId: '1707155979701254563', 
      api: 'WhatsApp', 
      status: 'Active',
      addDate: '14/08/2024 15:00:54' 
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, ...formData } : t));
    } else {
      const newTemplate = {
        ...formData,
        id: Date.now(),
        addDate: new Date().toLocaleString()
      };
      setTemplates([newTemplate, ...templates]);
    }
    resetForm();
  };

  const handleDelete = () => {
    setTemplates(templates.filter(t => t.id !== showConfirmModal.id));
    setShowConfirmModal({ isOpen: false, id: null });
  };

  const resetForm = () => {
    setFormData({
      category: '',
      templateId: '',
      api: 'WhatsApp',
      status: 'Active',
      content: ''
    });
    setEditingTemplate(null);
    setShowModal(false);
  };

  const handleEdit = (tmp) => {
    setEditingTemplate(tmp);
    setFormData({
      category: tmp.category,
      templateId: tmp.templateId,
      api: tmp.api,
      status: tmp.status,
      content: tmp.content
    });
    setShowModal(true);
  };

  return (
    <div className={styles.container} style={{ padding: '10px 15px', maxWidth: '100%' }}>
      {/* ── MAIN LISTING CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'nowrap', gap: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E', whiteSpace: 'nowrap' }}>Manage SMS Templates</h2>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', 
            color: '#fff', border: 'none', borderRadius: '8px', 
            padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, 
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)' 
          }} onClick={() => setShowModal(true)}>
            <FaPlus /> <span>New Template</span>
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
          <table className={styles.table} style={{ width: '100%', minWidth: '900px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '50px' }}>S.No</th>
                <th style={{ width: '90px', textAlign: 'center' }}>ACTION</th>
                <th style={{ width: '180px' }}>CATEGORY NAME</th>
                <th style={{ width: 'auto' }}>TEMPLATE CONTENT</th>
                <th style={{ width: '140px' }}>TEMPLATE ID</th>
                <th style={{ width: '100px' }}>SMS API</th>
                <th style={{ width: '100px', textAlign: 'left' }}>STATUS</th>
                <th style={{ textAlign: 'left' }}>ADD DATE</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((tmp, idx) => (
                <tr key={tmp.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={{ color: '#A0AEC0', fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button className={styles.editBtn} style={{ width: '32px', height: '32px', background: '#1756AA', color: '#fff' }} title="Edit" onClick={() => handleEdit(tmp)}><FaEdit /></button>
                      <button className={styles.deleteBtn} style={{ width: '32px', height: '32px', background: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7' }} title="Delete" onClick={() => setShowConfirmModal({ isOpen: true, id: tmp.id })}><FaTrash /></button>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <span style={{ fontWeight: 700, color: '#1756AA', fontSize: '0.85rem' }}>{tmp.category}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ padding: '8px 12px', background: '#F8FAFF', borderRadius: '8px', border: '1px solid #EEF3FC', fontSize: '0.8rem', color: '#4E6080', lineHeight: 1.4, wordBreak: 'break-word', whiteSpace: 'normal' }}>
                      {tmp.content}
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: '#0D1B3E', fontSize: '0.8rem' }}>{tmp.templateId}</td>
                  <td><span className={styles.badge} style={{ background: '#EBF8FF', color: '#3182CE', fontSize: '0.65rem' }}>{tmp.api}</span></td>
                  <td style={{ textAlign: 'left' }}>
                    <span className={`${styles.badge} ${tmp.status === 'Active' ? styles.badge_green : styles.badge_red}`} style={{ fontSize: '0.65rem', padding: '3px 10px' }}>
                      {tmp.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                      <FaCalendarAlt style={{ marginRight: '4px', opacity: 0.5 }} /> {tmp.addDate}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationRow} style={{ marginTop: '20px', paddingTop: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096' }}>Showing {templates.length} entries</span>
          <div className={styles.pagination} style={{ display: 'flex', gap: '6px' }}>
            <button className={styles.pageBtn} style={{ width: '32px', height: '32px' }} disabled><FaChevronLeft /></button>
            <button className={`${styles.pageBtn} ${styles.pageActive}`} style={{ width: '32px', height: '32px' }}>1</button>
            <button className={styles.pageBtn} style={{ width: '32px', height: '32px' }} disabled><FaChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── CREATE/EDIT MODAL ── */}
      {showModal && (
        <div className={styles.modalOverlay} style={{ zIndex: 3500 }}>
          <div className={styles.modalContainer} style={{ width: '500px', borderRadius: '16px' }}>
            <div className={styles.modalHeader} style={{ padding: '20px 25px 15px', borderBottom: '1px solid #F1F5F9' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', background: 'rgba(23, 86, 170, 0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1756AA' }}>
                     <FaFileAlt />
                  </div>
                  <div>
                    <h3 className={styles.modalTitle} style={{ margin: 0, fontSize: '1.1rem' }}>{editingTemplate ? 'Edit Template' : 'New Template'}</h3>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#718096' }}>DLT content configuration</p>
                  </div>
               </div>
               <button className={styles.closeBtn} onClick={resetForm}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody} style={{ padding: '20px 25px' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div className={styles.formGroup}>
                       <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>SMS Category</label>
                       <select 
                         name="category" 
                         className={styles.selectControl} 
                         style={{ height: '38px', fontSize: '0.85rem' }}
                         value={formData.category} 
                         onChange={handleInputChange}
                         required
                       >
                         <option value="">Select Category</option>
                         <option value="Admin Login OTP">Admin Login OTP</option>
                         <option value="Admin Fund Add OTP">Admin Fund Add OTP</option>
                         <option value="Member Reg OTP">Member Reg OTP</option>
                       </select>
                    </div>
                    <div className={styles.formGroup}>
                       <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>Template ID (DLT)</label>
                       <input 
                         type="text" 
                         name="templateId" 
                         placeholder="Enter ID" 
                         className={styles.inputControl} 
                         style={{ height: '38px', fontSize: '0.85rem' }}
                         value={formData.templateId} 
                         onChange={handleInputChange}
                         required
                       />
                    </div>
                 </div>

                 <div className={styles.formGroup} style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>Template Content</label>
                    <textarea 
                      name="content"
                      className={styles.inputControl}
                      placeholder="Enter SMS content..."
                      style={{ height: '90px', padding: '10px', lineHeight: 1.4, resize: 'none', fontSize: '0.85rem' }}
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    <div style={{ marginTop: '5px', color: '#718096', fontSize: '0.7rem' }}>
                       Use <b>{"{#var#}"}</b> for variables.
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className={styles.formGroup}>
                       <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>SMS API</label>
                       <select 
                         name="api" 
                         className={styles.selectControl} 
                         style={{ height: '38px', fontSize: '0.85rem' }}
                         value={formData.api} 
                         onChange={handleInputChange}
                       >
                         <option value="WhatsApp">WhatsApp</option>
                         <option value="SMS Gateway">SMS API</option>
                       </select>
                    </div>
                    <div className={styles.formGroup}>
                       <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4E6080', marginBottom: '6px', display: 'block' }}>Status</label>
                       <select 
                         name="status" 
                         className={styles.selectControl} 
                         style={{ height: '38px', fontSize: '0.85rem' }}
                         value={formData.status} 
                         onChange={handleInputChange}
                       >
                         <option value="Active">Active</option>
                         <option value="Inactive">Inactive</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className={styles.modalFooter} style={{ padding: '15px 25px', background: '#FBFDFF', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  <button type="button" className={styles.prevBtn} style={{ height: '38px', padding: '0 20px', fontSize: '0.8rem' }} onClick={resetForm}>Cancel</button>
                  <div style={{ flex: 1 }}></div>
                  <button type="submit" className={styles.publishBtn} style={{ height: '38px', padding: '0 30px', fontSize: '0.85rem' }}>
                    <FaCheck /> {editingTemplate ? 'Update' : 'Save'}
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

export default SMSTemplate;
