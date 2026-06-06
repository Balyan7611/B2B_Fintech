import React, { useState } from 'react';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FiSearch, FiFilter, FiCalendar, FiChevronLeft, FiChevronRight, FiBarChart2, FiInfo, FiLoader
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import { 
  setBusinessList, 
  updateBusinessFilters 
} from '../../../store/slices/reportSlice';
import styles from '../MemberPages/MemberPages.module.css';

const BusinessSummary = () => {
  const dispatch = useDispatch();
  const { list, filters } = useSelector(state => state.report.businessSummary);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDate, setLoadingDate] = useState(false);

  const handleMonthClick = () => {
    setLoadingMonth(true);
    setTimeout(() => setLoadingMonth(false), 1500);
  };

  const handleDateClick = () => {
    setLoadingDate(true);
    setTimeout(() => setLoadingDate(false), 1500);
  };

  // Data will be fetched from API when backend endpoints are ready

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBusinessFilters({ [name]: value }));
  };

  const totalAmount = list.reduce((sum, item) => sum + item.amount, 0);
  const totalSurcharge = list.reduce((sum, item) => sum + item.surcharge, 0);
  const totalGst = list.reduce((sum, item) => sum + item.gst, 0);
  const totalTds = list.reduce((sum, item) => sum + item.tds, 0);
  const totalComm = list.reduce((sum, item) => sum + item.commission, 0);

  const columns = ['SERVICE', 'AMOUNT', 'SURCHARGE', 'GST', 'TDS', 'CASHBACK/COMMISSION'];

  return (
    <>
      <style>{`
        @keyframes customSpin { 100% { transform: rotate(360deg); } }
        .spin-icon { animation: customSpin 1s linear infinite; }
      `}</style>
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
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.2px' }}>Business Summary Report</h2>
        </div>

        {/* CARD BOTTOM: FILTERS */}
        <div style={{ padding: '20px 24px', background: '#FAFBFC' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'flex-end' }}>
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Select Month</label>
                  <input 
                    type="month" 
                    name="month"
                    value={filters.month}
                    onChange={handleFilterChange}
                    style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none', color: '#334155' }} 
                    onFocus={(e) => e.target.style.borderColor = '#1756AA'} 
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleMonthClick}
                  disabled={loadingMonth}
                  style={{ height: '42px', padding: '0 15px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: loadingMonth ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)', transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px', opacity: loadingMonth ? 0.8 : 1 }} 
                  onMouseOver={(e) => { if(!loadingMonth) e.currentTarget.style.transform = 'translateY(-1px)' }} 
                  onMouseOut={(e) => { if(!loadingMonth) e.currentTarget.style.transform = 'none' }}
                >
                   {loadingMonth && <FiLoader className="spin-icon" />}
                   {loadingMonth ? 'Loading...' : 'Month Wise'}
                </button>
              </div>

              {/* DATE WISE GROUP */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Select Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    style={{ height: '42px', fontSize: '0.85rem', width: '100%', borderRadius: '10px', border: '1.5px solid #CBD5E1', padding: '0 12px', outline: 'none', color: '#334155' }} 
                    onFocus={(e) => e.target.style.borderColor = '#1756AA'} 
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'} 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleDateClick}
                  disabled={loadingDate}
                  style={{ height: '42px', padding: '0 15px', background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: loadingDate ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)', transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px', opacity: loadingDate ? 0.8 : 1 }} 
                  onMouseOver={(e) => { if(!loadingDate) e.currentTarget.style.transform = 'translateY(-1px)' }} 
                  onMouseOut={(e) => { if(!loadingDate) e.currentTarget.style.transform = 'none' }}
                >
                   {loadingDate && <FiLoader className="spin-icon" />}
                   {loadingDate ? 'Loading...' : 'Date Wise'}
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

          <ExportButtons headers={[]} rows={[]} fileNamePrefix="businesssummary_report" sheetName="Report" />

          <div className="global-search-box">
            <FiSearch />
            <input type="text" placeholder="Search summary..." />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1000px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ paddingLeft: '24px' }}>SERVICE</th>
                <th style={{ textAlign: 'right' }}>AMOUNT (₹)</th>
                <th style={{ textAlign: 'right' }}>SURCHARGE (₹)</th>
                <th style={{ textAlign: 'right' }}>GST (₹)</th>
                <th style={{ textAlign: 'right' }}>TDS (₹)</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>COMMISSION (₹)</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td style={{ paddingLeft: '24px', fontWeight: '700', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }}></div>
                      {item.service}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '600', color: '#0F172A' }}>{item.amount.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: '600', color: '#E74C3C' }}>{item.surcharge.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: '600', color: '#D97706' }}>{item.gst.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: '600', color: '#EF4444' }}>{item.tds.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', paddingRight: '24px', fontWeight: '800', color: '#16A34A' }}>{item.commission.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: '#F8FAFC', borderTop: '2px solid #E2E8F0' }}>
                <td style={{ paddingLeft: '24px', fontWeight: '900', color: '#0F172A', fontSize: '0.95rem' }}>TOTAL SUMMARY</td>
                <td style={{ textAlign: 'right', fontWeight: '900', color: '#0F172A', fontSize: '0.95rem' }}>₹{totalAmount.toFixed(2)}</td>
                <td style={{ textAlign: 'right', fontWeight: '900', color: '#E74C3C', fontSize: '0.95rem' }}>₹{totalSurcharge.toFixed(2)}</td>
                <td style={{ textAlign: 'right', fontWeight: '900', color: '#D97706', fontSize: '0.95rem' }}>₹{totalGst.toFixed(2)}</td>
                <td style={{ textAlign: 'right', fontWeight: '900', color: '#EF4444', fontSize: '0.95rem' }}>₹{totalTds.toFixed(2)}</td>
                <td style={{ textAlign: 'right', paddingRight: '24px', fontWeight: '900', color: '#16A34A', fontSize: '0.95rem' }}>₹{totalComm.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};

export default BusinessSummary;
