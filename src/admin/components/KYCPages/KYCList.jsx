import React, { useState, useEffect, useRef } from 'react';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiFilter, FiX, FiCheck, FiChevronLeft, FiChevronRight, FiDatabase, FiEye, FiUser, FiCalendar, FiActivity, FiShield, FiAlertCircle, FiRefreshCw, FiChevronDown
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import { approveKyc, rejectKyc, setSelectedKyc } from '../../../store/slices/kycSlice';
import styles from '../MemberPages/MemberPages.module.css';

const KYCList = () => {
  const dispatch = useDispatch();
  const { kycRequests, selectedKyc } = useSelector((s) => s.kyc);
  
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', id: null });
  
  const isFiltered = statusFilter !== 'All';

  const resetFilters = () => {
    setStatusFilter('All');
    setSearchTerm('');
  };

  const filteredData = kycRequests.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (id) => {
    setConfirmModal({ isOpen: true, type: 'APPROVE', id });
  };

  const handleReject = (id) => {
    setConfirmModal({ isOpen: true, type: 'REJECT', id });
  };

  const confirmAction = () => {
    if (confirmModal.type === 'APPROVE') {
      dispatch(approveKyc(confirmModal.id));
    } else if (confirmModal.type === 'REJECT') {
      dispatch(rejectKyc(confirmModal.id));
    }
    dispatch(setSelectedKyc(null));
    setConfirmModal({ isOpen: false, type: '', id: null });
  };

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <div className={styles.directoryTitleGroup}>
            <h2 className={styles.directoryTitle} style={{ fontSize: '1.2rem', margin: 0, padding: '4px 0' }}>KYC List</h2>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {isFiltered && (
              <button 
                onClick={resetFilters}
                style={{ background: '#FFF5F5', color: '#E53E3E', border: '1.5px solid #FED7D7', padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, boxShadow: 'none' }}
              >
                Clear
              </button>
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  appearance: 'none',
                  background: isFiltered ? 'rgba(23, 86, 170, 0.1)' : '#F8FAFF',
                  color: '#1756AA',
                  border: isFiltered ? '1.5px solid #1756AA' : '1.5px solid #E2E8F0',
                  padding: '8px 32px 8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <FiChevronDown style={{ position: 'absolute', right: '10px', color: '#1756AA', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        {/* ── CONTROLS ── */}
        <div className="global-table-toolbar" style={{ padding: '15px 20px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select 
              className={styles.selectEntries} 
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <ExportButtons headers={[]} rows={[]} fileNamePrefix="kyclist_report" sheetName="Report" />

          <div className="global-search-box">
            <FiSearch />
            <input 
              type="text" 
              placeholder="Search ID/Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1050px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px' }}>SR.</th>
                <th>MEMBER INFO</th>
                <th style={{ textAlign: 'center' }}>STATUS</th>
                <th>DOCUMENT DETAILS</th>
                <th style={{ textAlign: 'center' }}>PREVIEW</th>
                <th style={{ textAlign: 'center' }}>ACTION</th>
                <th style={{ textAlign: 'right' }}>TIMESTAMPS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: 0, background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', color: '#A0AEC0' }}>
                      <div style={{ marginBottom: '15px', fontSize: '2.5rem', opacity: 0.3 }}><FiDatabase /></div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>No KYC requests found</div>
                      <small>Try adjusting your search or status filter</small>
                      {isFiltered && (
                         <button onClick={resetFilters} style={{ background: '#1756AA', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Show All Records</button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={styles.fwBold} style={{ color: '#1756AA', fontSize: '0.9rem' }}>{item.name}</span>
                        <small style={{ color: '#718096', fontSize: '0.7rem' }}>ID: {item.memberId}</small>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`${styles.roleTag}`} style={{ 
                        background: item.status === 'Approved' ? '#E6F4EA' : item.status === 'Rejected' ? '#FFF5F5' : '#FFF9E6',
                        color: item.status === 'Approved' ? '#1E7E34' : item.status === 'Rejected' ? '#E53E3E' : '#D97706',
                        fontWeight: 800,
                        fontSize: '0.65rem'
                      }}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#4E6080', fontSize: '0.8rem' }}>{item.document}</span>
                        <small style={{ color: '#718096', fontSize: '0.7rem' }}>#{item.docNumber}</small>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className={styles.editBtn} 
                        style={{ background: '#F8FAFF', color: '#1756AA', border: '1.5px solid #1756AA', width: 'auto', padding: '0 12px', height: '32px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }} 
                        onClick={() => dispatch(setSelectedKyc(item))} 
                        title="View Details"
                      >
                        <FiEye /> View
                      </button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                       <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                          <button 
                            className={styles.editBtn} 
                            style={{ 
                              background: '#27AE60', 
                              color: '#fff', 
                              width: '36px', 
                              height: '36px',
                              opacity: item.status === 'Approved' ? 0.35 : 1,
                              cursor: item.status === 'Approved' ? 'not-allowed' : 'pointer',
                              border: 'none'
                            }} 
                            onClick={() => handleApprove(item.id)} 
                            disabled={item.status === 'Approved'}
                            title="Approve"
                          >
                            <FiCheck />
                          </button>
                          <button 
                            className={styles.editBtn} 
                            style={{ 
                              background: '#E53E3E', 
                              color: '#fff', 
                              width: '36px', 
                              height: '36px',
                              opacity: item.status === 'Rejected' ? 0.35 : 1,
                              cursor: item.status === 'Rejected' ? 'not-allowed' : 'pointer',
                              border: 'none'
                            }} 
                            onClick={() => handleReject(item.id)} 
                            disabled={item.status === 'Rejected'}
                            title="Reject"
                          >
                            <FiX />
                          </button>
                       </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                         <small style={{ fontSize: '0.7rem', color: '#718096' }}>Added: {item.addDate}</small>
                         {item.approveDate !== '-' && <small style={{ fontSize: '0.7rem', color: '#27AE60', fontWeight: 600 }}>Action: {item.approveDate}</small>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="global-pagination">
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>
            Showing 1 to {filteredData.length} of {filteredData.length} entries
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="global-page-btn" disabled><FiChevronLeft /></button>
            <button className="global-page-btn global-page-active">1</button>
            <button className="global-page-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── DETAILS MODAL ── */}
      {selectedKyc && (
        <div className={styles.modalOverlay} style={{ zIndex: 1000 }}>
          <div className={styles.modalContainer} style={{ width: '850px', borderRadius: '24px' }}>
            <div className={styles.modalHeader} style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(23, 86, 170, 0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1756AA' }}>
                  <FiUser />
                </div>
                <div>
                  <h3 className={styles.modalTitle} style={{ fontSize: '1.1rem', color: '#0D1B3E', margin: 0 }}>KYC Review: {selectedKyc.name}</h3>
                  <p className={styles.modalSubtitle} style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>Verifying Member ID: {selectedKyc.memberId}</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => dispatch(setSelectedKyc(null))}>
                <FiX />
              </button>
            </div>

            <div className={styles.modalBody} style={{ padding: '30px' }}>
               <div style={{ background: '#F8FAFF', padding: '20px', borderRadius: '16px', border: '1.5px solid #E2E8F0', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div>
                    <small style={{ color: '#718096', display: 'block', marginBottom: '4px' }}>Document Type</small>
                    <span style={{ fontWeight: 700, color: '#1756AA' }}>{selectedKyc.document}</span>
                  </div>
                  <div>
                    <small style={{ color: '#718096', display: 'block', marginBottom: '4px' }}>Document Number</small>
                    <span style={{ fontWeight: 700, color: '#0D1B3E' }}>{selectedKyc.docNumber}</span>
                  </div>
                  <div>
                    <small style={{ color: '#718096', display: 'block', marginBottom: '4px' }}>Submission Date</small>
                    <span style={{ fontWeight: 700, color: '#4E6080' }}>{selectedKyc.addDate}</span>
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#0D1B3E' }}><FiActivity /> Document Front</label>
                    <div style={{ height: '240px', background: '#F1F5F9', borderRadius: '16px', border: '2px dashed #CBD5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                       <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>[IMAGE PREVIEW]</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#0D1B3E' }}><FiActivity /> Document Back</label>
                    <div style={{ height: '240px', background: '#F1F5F9', borderRadius: '16px', border: '2px dashed #CBD5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                       <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>[IMAGE PREVIEW]</span>
                    </div>
                  </div>
               </div>

               {selectedKyc.status === 'Rejected' && (
                  <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(229, 62, 62, 0.05)', borderRadius: '12px', borderLeft: '4px solid #E53E3E', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <FiAlertCircle style={{ color: '#E53E3E' }} />
                     <div>
                        <small style={{ color: '#E53E3E', fontWeight: 700, display: 'block' }}>Rejection Reason</small>
                        <span style={{ fontSize: '0.85rem', color: '#4A5568' }}>{selectedKyc.reason}</span>
                     </div>
                  </div>
               )}
            </div>

            <div className={styles.modalFooter} style={{ padding: '16px 32px', background: '#FBFDFF' }}>
                <button type="button" className={styles.prevBtn} style={{ height: '42px', padding: '0 24px' }} onClick={() => dispatch(setSelectedKyc(null))}>Close</button>
                <div style={{ flex: 1 }}></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    className={styles.saveBtn} 
                    style={{ 
                      height: '42px', 
                      background: '#E53E3E', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '0 24px',
                      opacity: selectedKyc.status === 'Rejected' ? 0.35 : 1
                    }} 
                    onClick={() => handleReject(selectedKyc.id)}
                    disabled={selectedKyc.status === 'Rejected'}
                  >
                    <FiX /> Reject KYC
                  </button>
                  <button 
                    className={styles.publishBtn} 
                    style={{ 
                      height: '42px', 
                      padding: '0 32px', 
                      minWidth: '160px',
                      opacity: selectedKyc.status === 'Approved' ? 0.35 : 1
                    }} 
                    onClick={() => handleApprove(selectedKyc.id)}
                    disabled={selectedKyc.status === 'Approved'}
                  >
                    <FiCheck /> Approve KYC
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CUSTOM CONFIRM MODAL ── */}
      {confirmModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 9999 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '20px', padding: '30px', textAlign: 'center', background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: confirmModal.type === 'APPROVE' ? '#E6F4EA' : '#FFF5F5', color: confirmModal.type === 'APPROVE' ? '#1E7E34' : '#E53E3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
              {confirmModal.type === 'APPROVE' ? <FiCheck /> : <FiAlertCircle />}
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#0D1B3E', marginBottom: '12px', fontWeight: 800 }}>
              {confirmModal.type === 'APPROVE' ? 'Approve KYC?' : 'Reject KYC?'}
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '28px', lineHeight: '1.5' }}>
              Are you sure you want to {confirmModal.type.toLowerCase()} this KYC request? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, type: '', id: null })}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #E2E8F0', background: '#F8FAFF', color: '#4A5568', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.target.style.background = '#EDF2F7'}
                onMouseOut={(e) => e.target.style.background = '#F8FAFF'}
              >
                Cancel
              </button>
              <button 
                onClick={confirmAction}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: confirmModal.type === 'APPROVE' ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)', color: '#fff', fontWeight: 700, cursor: 'pointer', boxShadow: confirmModal.type === 'APPROVE' ? '0 4px 12px rgba(5, 150, 105, 0.2)' : '0 4px 12px rgba(229, 62, 62, 0.2)' }}
              >
                Yes, {confirmModal.type === 'APPROVE' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCList;
