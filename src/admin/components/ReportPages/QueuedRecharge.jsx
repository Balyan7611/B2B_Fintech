import React from 'react';
import { 
  FiSearch, FiFilter, FiCalendar, FiChevronLeft, FiChevronRight, FiCheckCircle, FiInfo, FiActivity, FiDatabase, FiAlertCircle, FiXCircle, FiClock, FiPlay
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint, FaArrowRight
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const QueuedRecharge = () => {
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
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.2px' }}>Queued Recharge</h2>
        </div>

        {/* CARD BOTTOM: FILTERS */}
        <div style={{ padding: '20px 24px', background: '#FAFBFC' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
              
              <div className={styles.formGroup}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Service</label>
                <select className={styles.inputControl} style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#1756AA'} onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}>
                  <option value="">All Services</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>From Date</label>
                <input type="date" className={styles.inputControl} style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#1756AA'} onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} />
              </div>
              
              <div className={styles.formGroup}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>To Date</label>
                <input type="date" className={styles.inputControl} style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#1756AA'} onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} />
              </div>
              
              <div className={styles.formGroup}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Search Anything</label>
                <div style={{ position: 'relative' }}>
                  <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input type="text" placeholder="Number, TXID..." className={styles.inputControl} style={{ height: '42px', width: '100%', paddingLeft: '35px', fontSize: '0.85rem', borderRadius: '10px', border: '1.5px solid #CBD5E1', outline: 'none', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.borderColor = '#1756AA'} onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} />
                </div>
              </div>

              <div>
                <button type="submit" style={{ height: '42px', width: '100%', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.2)'; }}>
                   <FiSearch /> Submit Query
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ── DATA TABLE CARD ── */}
      <div className={styles.cardFullMobile}>
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

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            <button className="global-export-btn btn-copy" title="Copy Table"><FaCopy /></button>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>

          <div className="global-search-box">
            <FiSearch />
            <input type="text" placeholder="Search queued logs..." />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1800px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #4A5568 0%, #2D3748 100%)' }}>
                <th style={{ width: '60px' }}>#</th>
                <th>TXID</th>
                <th>OPERATOR</th>
                <th>NUMBER</th>
                <th>AMOUNT</th>
                <th style={{ textAlign: 'center' }}>STATUS</th>
                <th>OPERATOR ID</th>
                <th>RECHARGE BY</th>
                <th>DATE & TIME</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '60px 0', color: '#A0AEC0' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                     <FiClock style={{ fontSize: '2.5rem', opacity: 0.3 }} />
                     <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#718096' }}>No queued recharge found</span>
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── QUEUE ACTIONS ── */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '25px', padding: '20px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', flexWrap: 'wrap', alignItems: 'center' }}>
           <button style={{ background: '#16A34A', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(22, 163, 74, 0.25)'}} onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'}}>
             <FiCheckCircle size={18} strokeWidth={3} /> Force Success
           </button>
           <button style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.25)'}} onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'}}>
             <FiXCircle size={18} strokeWidth={3} /> Force Fail
           </button>
        </div>

        <div className="global-pagination">
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>Showing 0 to 0 of 0 entries</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="global-page-btn" disabled><FiChevronLeft /></button>
            <button className="global-page-btn global-page-active">1</button>
            <button className="global-page-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueuedRecharge;
