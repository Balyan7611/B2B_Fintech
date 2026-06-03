import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  FiSearch, FiRefreshCw, FiInfo, FiActivity, FiFileText 
} from 'react-icons/fi';
import styles from '../MemberPages/MemberPages.module.css';

const CheckTXN = () => {
  const dispatch = useDispatch();

  const [txnId, setTxnId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!txnId.trim()) {
      setErrorMsg("Invalid Transaction ID. Please enter a valid Transaction ID.");
      setSearchResult(null);
      setHasSearched(false);
      return;
    }

    setErrorMsg("");
    setHasSearched(true);
    // Simulating gateway response with entered TXN ID
    setSearchResult({
      txnId: txnId.trim().toUpperCase(),
      member: "Ram Prasad (MEM88392)",
      amount: "₹ 1,500.00",
      gateway: "ICICI DMT GATEWAY",
      status: "SUCCESS",
      date: new Date().toLocaleString('en-GB')
    });
  };

  const handleClear = () => {
    setTxnId("");
    setSearchResult(null);
    setHasSearched(false);
    setErrorMsg("");
  };

  return (
    <div className={styles.container} style={{ padding: '8px 6px', maxWidth: '100%' }}>
      {/* ── SINGLE MAIN CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
        
        {/* CARD INTERNAL HEADER (Polished & Highly Compact) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderBottom: '1px solid #F1F5F9', minHeight: '34px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', background: 'rgba(23, 86, 170, 0.1)', color: '#1756AA', borderRadius: '5px' }}>
            <FiActivity style={{ fontSize: '0.8rem' }} />
          </div>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#0D1B3E', lineHeight: '1.2' }}>Check Transaction Status</h3>
        </div>

        {/* CONTENT AREA (Maximized width with minimal left/right padding) */}
        <div style={{ padding: '12px 10px' }}>
          
          {/* SEARCH BAR (Label and field aligned horizontally) */}
          <form onSubmit={handleSearch} style={{ background: '#F8FAFC', padding: '10px 15px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{ fontWeight: 800, color: '#4E6080', fontSize: '0.85rem', whiteSpace: 'nowrap', margin: 0 }}>
              Transaction ID:
            </label>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <FiFileText style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '0.9rem' }} />
              <input 
                type="text" 
                value={txnId}
                onChange={(e) => {
                  setTxnId(e.target.value);
                  if (errorMsg) setErrorMsg(""); // Clear error message when user starts typing
                }}
                placeholder="" 
                style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', color: '#1E293B', fontWeight: 600, fontSize: '0.85rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                type="submit"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1756AA', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(23, 86, 170, 0.15)' }}
              >
                <FiSearch /> <span>Search Status</span>
              </button>
              <button 
                type="button"
                onClick={handleClear}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F1F5F9', color: '#4E6080', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
              >
                <FiRefreshCw /> <span>Clear</span>
              </button>
            </div>
          </form>

          {/* INLINE ERROR MESSAGE (Shows below search fields instead of popup) */}
          {errorMsg && (
            <div style={{ color: '#E53E3E', fontSize: '0.8rem', fontWeight: 700, marginTop: '-8px', marginBottom: '12px', paddingLeft: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FiInfo style={{ fontSize: '0.9rem' }} /> <span>{errorMsg}</span>
            </div>
          )}

          {/* ── DATA TABLE ── */}
          <div className={styles.tableWrapper} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
            <table className={styles.table} style={{ width: '100%', minWidth: '800px', tableLayout: 'auto' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                  <th style={{ width: '80px', textAlign: 'center' }}>S.NO</th>
                  <th style={{ width: '220px', textAlign: 'left' }}>TRANSACTION ID</th>
                  <th style={{ width: '220px', textAlign: 'left' }}>MEMBER DETAILS</th>
                  <th style={{ width: '150px', textAlign: 'left' }}>AMOUNT</th>
                  <th style={{ width: '200px', textAlign: 'left' }}>GATEWAY / SERVICE</th>
                  <th style={{ width: '140px', textAlign: 'left' }}>STATUS</th>
                  <th style={{ width: '180px', textAlign: 'left' }}>DATE & TIME</th>
                </tr>
              </thead>
              <tbody>
                {hasSearched && searchResult ? (
                  <tr className={styles.hoverRow}>
                    <td style={{ fontWeight: 700, color: '#A0AEC0', textAlign: 'center' }}>1</td>
                    <td style={{ fontWeight: 800, color: '#1E293B' }}>{searchResult.txnId}</td>
                    <td style={{ fontWeight: 700, color: '#1756AA' }}>{searchResult.member}</td>
                    <td style={{ fontWeight: 800, color: '#2D3748' }}>{searchResult.amount}</td>
                    <td style={{ fontWeight: 700, color: '#4A5568' }}>{searchResult.gateway}</td>
                    <td style={{ textAlign: 'left' }}>
                      <span style={{ background: '#E6FFFA', color: '#319795', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {searchResult.status}
                      </span>
                    </td>
                    <td style={{ color: '#718096', fontWeight: 700, fontSize: '0.85rem' }}>{searchResult.date}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                      <FiInfo style={{ fontSize: '1.5rem', marginBottom: '8px' }} />
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
                        No records found. Please enter a Transaction ID and click Search.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckTXN;
