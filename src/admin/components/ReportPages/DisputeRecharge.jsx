import React, { useState } from 'react';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { 
  FiSearch, FiFilter, FiCalendar, FiChevronLeft, FiChevronRight, FiCheckCircle, FiInfo, FiActivity, FiDatabase, FiAlertCircle, FiXCircle, FiMoreVertical, FiFileText, FiCheck, FiX, FiCornerUpLeft
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint, FaExclamationTriangle, FaArrowRight, FaGavel
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const DisputeRecharge = () => {
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', txid: null });

  const demoData = [
    { sno: 1, api: 'SoniTechno', txid: '9694935907', op: 'Jio', num: '9990167317', amt: '349.00', status: 'Success', opid: 'BR000C3CFHMW', by: 'Pay99RT4291 Suhail', date: '17/04/2025 18:45:58' },
    { sno: 2, api: 'SoniTechno', txid: '5744464283', op: 'Airtel', num: '7289054316', amt: '22.00', status: 'Success', opid: '3104235732', by: 'Pay99RT4097 Brijesh Kumar', date: '15/04/2025 19:39:13' },
  ];

  return (
    <div className={styles.container}>
      {/* ── PREMIUM FILTER CARD ── */}
      <div style={{ 
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(23, 86, 170, 0.02), 0 1px 4px rgba(0, 0, 0, 0.01)',
        border: '1px solid #E2E8F0',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        {/* CARD TOP: TITLE */}
        <div style={{ padding: '15px 24px', borderBottom: '1px solid #F1F5F9' }}>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.2px' }}>Dispute Recharge Report</h2>
        </div>

        {/* CARD BOTTOM: FILTERS */}
        <div style={{ padding: '20px 24px', background: '#FAFBFC' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
              <div className={styles.formGroup}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>From Date</label>
                <input type="date" className={styles.inputControl} style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#1756AA'} onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} />
              </div>
              
              <div className={styles.formGroup}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>To Date</label>
                <input type="date" className={styles.inputControl} style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#1756AA'} onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} />
              </div>
              
              <div>
                <button type="submit" style={{ height: '42px', width: '100%', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.2)'; }}>
                   <FiSearch /> Search Logs
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ── DATA TABLE CARD ── */}
      <div className={styles.cardFullMobile}>
        {/* CARD INTERNAL HEADER / TOOLBAR */}
        <div className="global-table-toolbar">
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <ExportButtons headers={[]} rows={[]} fileNamePrefix="disputerecharge_report" sheetName="Report" />

          <div className="global-search-box">
            <FiSearch />
            <input type="text" placeholder="Search dispute logs..." />
          </div>
        </div>

        <div className={styles.tableWrapper} style={{ border: 'none', borderRadius: '0', minHeight: '350px' }}>
          <table className={styles.table} style={{ minWidth: '1800px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px' }}>#</th>
                <th style={{ width: '80px', textAlign: 'center' }}>ACTION</th>
                <th>API NAME</th>
                <th>TXID</th>
                <th>OPERATOR</th>
                <th>NUMBER</th>
                <th>AMOUNT</th>
                <th style={{ textAlign: 'center' }}>STATUS</th>
                <th>OPERATOR ID</th>
                <th>RECHARGE BY</th>
                <th>DATE & TIME</th>
                <th style={{ textAlign: 'center' }}>RECEIPT</th>
              </tr>
            </thead>
            <tbody>
              {demoData.map((row) => (
                <tr key={row.sno} style={{ position: 'relative' }}>
                  <td>{row.sno}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => setConfirmModal({ isOpen: true, type: 'accept', txid: row.txid })}
                        title="Accept"
                        style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.color = '#fff'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#F0FDF4'; e.currentTarget.style.color = '#16A34A'; }}
                      >
                        <FiCheck size={16} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => setConfirmModal({ isOpen: true, type: 'cancel', txid: row.txid })}
                        title="Cancel"
                        style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#fff'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#DC2626'; }}
                      >
                        <FiX size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                  <td>{row.api}</td>
                  <td>{row.txid}</td>
                  <td>{row.op}</td>
                  <td>{row.num}</td>
                  <td style={{ fontWeight: 800, color: '#0D1B3E' }}>₹{row.amt}</td>
                  <td style={{ textAlign: 'center' }}><span className={styles.statusBadge_success}>{row.status}</span></td>
                  <td>{row.opid}</td>
                  <td>{row.by}</td>
                  <td style={{ fontSize: '0.8rem', color: '#4E6080' }}>{row.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button style={{ 
                      background: 'rgba(231, 76, 60, 0.1)', border: 'none', color: '#E74C3C', 
                      padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, 
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto' 
                    }}>
                      <FiFileText /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="global-pagination">
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>Showing 1 to 2 of 2 entries</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="global-page-btn" disabled><FiChevronLeft /></button>
            <button className="global-page-btn global-page-active">1</button>
            <button className="global-page-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── CONFIRMATION MODAL ── */}
      {confirmModal.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '400px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', textAlign: 'center', position: 'relative',
            border: '1px solid #E2E8F0', transform: 'scale(1)', transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <button 
              onClick={() => setConfirmModal({ isOpen: false, type: '', txid: null })}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#F8FAFC', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#F1F5F9'}
              onMouseOut={(e) => e.currentTarget.style.background = '#F8FAFC'}
            >
              <FiX size={18} strokeWidth={3} />
            </button>
            
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px', margin: '0 auto 20px auto',
              background: confirmModal.type === 'accept' ? '#F0FDF4' : '#FEF2F2',
              color: confirmModal.type === 'accept' ? '#16A34A' : '#DC2626',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: confirmModal.type === 'accept' ? '0 8px 16px rgba(22, 163, 74, 0.15)' : '0 8px 16px rgba(220, 38, 38, 0.15)'
            }}>
              {confirmModal.type === 'accept' ? <FiCheck size={36} strokeWidth={3} /> : <FaExclamationTriangle size={32} />}
            </div>
            
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#0F172A', fontWeight: 800 }}>
              {confirmModal.type === 'accept' ? 'Accept Dispute?' : 'Cancel Dispute?'}
            </h3>
            <p style={{ margin: '0 0 30px 0', fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6' }}>
              Are you sure you want to {confirmModal.type} the dispute for transaction ID <strong style={{ color: '#0F172A', fontWeight: 700 }}>{confirmModal.txid}</strong>? This action cannot be undone.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, type: '', txid: null })}
                style={{ padding: '14px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#E2E8F0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#F1F5F9'}
              >
                No, Go Back
              </button>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, type: '', txid: null })}
                style={{ padding: '14px', background: confirmModal.type === 'accept' ? '#16A34A' : '#DC2626', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', boxShadow: confirmModal.type === 'accept' ? '0 8px 20px rgba(22, 163, 74, 0.25)' : '0 8px 20px rgba(220, 38, 38, 0.25)', transition: '0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Yes, {confirmModal.type === 'accept' ? 'Accept' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DisputeRecharge;
