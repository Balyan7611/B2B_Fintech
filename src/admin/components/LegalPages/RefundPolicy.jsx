import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiFileText, FiSearch, FiChevronRight, FiPlus, FiX, FiTrash2, FiChevronLeft, FiRefreshCcw, FiDollarSign
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import { 
  updateRefundForm, addRefund, deleteRefund, toggleRefundExpansion, setIsSubmitting 
} from '../../../store/slices/legalSlice';
import styles from '../MemberPages/MemberPages.module.css';

const RefundPolicy = () => {
  const dispatch = useDispatch();
  const { refundForm, refundList, refundExpandedRow, isSubmitting } = useSelector(state => state.legal);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateRefundForm({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!refundForm.newsName || !refundForm.description) return;
    
    dispatch(setIsSubmitting(true));
    setTimeout(() => {
      dispatch(addRefund());
      dispatch(setIsSubmitting(false));
      setShowAddModal(false);
    }, 1000);
  };

  const handleDelete = () => {
    if (confirmDeleteId) {
      dispatch(deleteRefund(confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* ── DATA TABLE CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0D1B3E' }}>Refund Policy List</h3>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', 
            color: '#fff', border: 'none', borderRadius: '8px', 
            padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' 
          }} onClick={() => setShowAddModal(true)}>
            <FiPlus /> <span>Add New Policy</span>
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="global-table-toolbar" style={{ padding: '15px 20px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries}>
              <option>10</option>
              <option>25</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            <button className="global-export-btn btn-copy" title="Copy Table"><FaCopy /></button>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>

          <div className="global-search-box">
            <FiSearch />
            <input type="text" placeholder="Search refund terms..." />
          </div>
        </div>

        {/* DATA TABLE */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1200px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px' }}>#</th>
                <th style={{ width: '200px' }}>POLICY TITLE</th>
                <th>DESCRIPTION / GUIDELINES</th>
                <th style={{ width: '100px', textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {refundList.map((item, index) => (
                <tr key={item.id} style={{ verticalAlign: 'top' }} className={styles.hoverRow}>
                  <td style={{ fontWeight: 700, color: '#A0AEC0' }}>{index + 1}</td>
                  <td style={{ fontWeight: 800, color: '#0D1B3E', lineHeight: '1.4' }}>
                    {item.name}
                  </td>
                  <td style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '20px' }}>
                    <div style={{ 
                      maxHeight: refundExpandedRow === item.id ? 'none' : '4.5em', 
                      overflow: 'hidden',
                      position: 'relative',
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      color: '#4E6080',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {item.description}
                    </div>
                    <button 
                      onClick={() => dispatch(toggleRefundExpansion(item.id))}
                      style={{ 
                        border: 'none', 
                        background: 'rgba(23, 86, 170, 0.05)', 
                        color: '#1756AA', 
                        fontWeight: 700, 
                        fontSize: '0.75rem', 
                        cursor: 'pointer',
                        marginTop: '10px',
                        padding: '4px 10px',
                        borderRadius: '4px'
                      }}
                    >
                      {refundExpandedRow === item.id ? 'Read Less' : 'Read More'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className={styles.actionBtn}
                      style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#E74C3C', border: 'none', padding: '8px', borderRadius: '8px' }}
                      onClick={() => setConfirmDeleteId(item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="global-pagination" style={{ padding: '10px 15px' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>Showing 1 to {refundList.length} entries</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="global-page-btn" disabled><FiChevronLeft /></button>
            <button className="global-page-btn global-page-active">1</button>
            <button className="global-page-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── ADD MODAL ── */}
      {showAddModal && (
        <div className={styles.drawerOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()} style={{ width: '480px', maxWidth: '95%' }}>
            <div className={styles.drawerHeader} style={{ padding: '15px 20px' }}>
              <div className={styles.directoryTitleGroup} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(23, 86, 170, 0.1)', color: '#1756AA', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiPlus />
                </div>
                <h2 className={styles.directoryTitle} style={{ fontSize: '1.1rem', margin: 0 }}>Add New Policy</h2>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.5rem', color: '#4E6080' }}>
                <FiX />
              </button>
            </div>
            
            <div className={styles.drawerBody}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                  <label className={styles.label} style={{ fontSize: '0.75rem' }}>Policy Name / Title</label>
                  <div className={styles.inputWrap}>
                    <FiDollarSign className={styles.inputIcon} />
                    <input 
                      type="text" 
                      name="newsName"
                      className={styles.inputControl}
                      placeholder="Enter Title"
                      value={refundForm.newsName}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
                  <label className={styles.label} style={{ fontSize: '0.75rem' }}>Full Description</label>
                  <textarea 
                    className={styles.inputControl}
                    style={{ 
                      paddingLeft: '16px', 
                      minHeight: '200px', 
                      borderRadius: '12px',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      fontSize: '0.85rem',
                      lineHeight: '1.6'
                    }}
                    placeholder="Write details here..."
                    name="description"
                    value={refundForm.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.drawerFooter} style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: '12px 20px', paddingRight: '80px', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 'auto' }}>
                  <button type="button" className={styles.saveBtn} style={{ background: '#F1F5F9', color: '#4E6080', boxShadow: 'none' }} onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.saveBtn} 
                    disabled={isSubmitting}
                    style={{ minWidth: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1756AA', boxShadow: 'none' }}
                  >
                    {isSubmitting ? (
                      <div className={styles.spinner}></div>
                    ) : (
                      <>Save Policy <FiChevronRight /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION ── */}
      {confirmDeleteId && (
        <div className={styles.drawerOverlay} onClick={() => setConfirmDeleteId(null)} style={{ alignItems: 'center', justifyContent: 'center', background: 'rgba(13, 27, 62, 0.6)' }}>
          <div className={styles.card} onClick={(e) => e.stopPropagation()} style={{ width: '400px', maxWidth: '90%', textAlign: 'center', padding: '40px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FFF5F5', color: '#E74C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 20px' }}>
              <FiTrash2 />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0D1B3E', marginBottom: '10px' }}>Confirm Deletion</h2>
            <p style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '30px' }}>Are you sure you want to remove this policy? This action is permanent and cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className={styles.saveBtn} style={{ background: '#F1F5F9', color: '#4E6080', boxShadow: 'none' }} onClick={() => setConfirmDeleteId(null)}>
                No, Keep it
              </button>
              <button className={styles.saveBtn} style={{ background: '#E74C3C', boxShadow: 'none' }} onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundPolicy;
