import React, { useState } from 'react';
import { FiPlusCircle, FiGlobe, FiCpu, FiCode, FiCheckCircle, FiXCircle, FiClock, FiActivity, FiRefreshCw, FiTrash2, FiSave, FiRotateCcw } from 'react-icons/fi';
import styles from '../MemberPages/MemberPages.module.css';

const AddAPI = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '' });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast({ show: true, message: 'API Integration Submitted Successfully!' });
      setTimeout(() => setShowToast({ show: false, message: '' }), 3000);
    }, 1500);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmReset = () => {
    document.getElementById('addApiForm').reset();
    setShowConfirm(false);
  };

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* TOAST NOTIFICATION */}
      {showToast.show && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          background: '#10B981', color: '#fff', padding: '15px 25px',
          borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <FiCheckCircle size={20} />
          {showToast.message}
        </div>
      )}

      {/* CONFIRM RESET MODAL */}
      {showConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', padding: '30px', borderRadius: '15px', width: '90%', maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', textAlign: 'center', animation: 'scaleIn 0.2s ease-out'
          }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FEE2E2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.8rem' }}>
              <FiRotateCcw />
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#0F172A', fontWeight: 800 }}>Reset Form?</h3>
            <p style={{ margin: '0 0 25px 0', color: '#64748B', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Are you sure you want to clear all the fields? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                type="button"
                onClick={() => setShowConfirm(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#fff', color: '#64748B', fontWeight: 600, cursor: 'pointer', flex: 1 }}
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={confirmReset}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 600, cursor: 'pointer', flex: 1 }}
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #F1F5F9', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E' }}>API Integration</h3>
        </div>

        <form id="addApiForm" onSubmit={handleSubmit} onReset={handleReset} style={{ padding: '0 25px 30px 25px' }}>
          {/* --- SECTION: GENERAL INFO --- */}
          <div className={styles.formGrid3} style={{ marginBottom: '30px' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>API Type *</label>
              <select className={styles.inputControl} style={{ height: '42px' }}>
                <option value="">-- Select API Type --</option>
                <option value="get">GET</option>
                <option value="post">POST</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>API Name *</label>
              <input type="text" placeholder="Enter API Name" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Splitter *</label>
              <input type="text" placeholder="e.g. | or ," className={styles.inputControl} style={{ height: '42px' }} />
            </div>
          </div>

          <div className={styles.formGrid3} style={{ marginBottom: '30px' }}>
             <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
              <label className={styles.label}>Recharge URL *</label>
              <div className={styles.inputWrap}>
                <FiGlobe className={styles.inputIcon} />
                <input type="text" placeholder="Enter Recharge URL" className={styles.inputControl} style={{ height: '42px', paddingLeft: '40px' }} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Format / Version</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="format" className={styles.inputControl} style={{ height: '42px' }} />
                <input type="text" placeholder="version" className={styles.inputControl} style={{ height: '42px' }} />
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1756AA', marginBottom: '20px', borderBottom: '1px solid #edf2f7', paddingBottom: '10px' }}>
            <FiActivity /> Recharge API Parameters
          </h3>

          <div className={styles.formGrid3} style={{ marginBottom: '30px' }}>
            {[3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={styles.formGroup}>
                <label className={styles.label}>Parameter {num} *</label>
                <input type="text" placeholder={`Param ${num}`} className={styles.inputControl} style={{ height: '42px' }} />
              </div>
            ))}
          </div>

          <div className={styles.formGrid3} style={{ marginBottom: '30px' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>TxID Position</label>
              <input type="text" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Status Position</label>
              <input type="text" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Op. Ref Position</label>
              <input type="text" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
          </div>

          <div className={styles.formGrid3} style={{ marginBottom: '30px' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}><FiCheckCircle color="#27AE60" /> Status Msg (Success)</label>
              <input type="text" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}><FiXCircle color="#E53E3E" /> Status Msg (Failed)</label>
              <input type="text" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}><FiClock color="#F6AD55" /> Status Msg (Pending)</label>
              <input type="text" className={styles.inputControl} style={{ height: '42px' }} />
            </div>
          </div>

          {/* --- SECTION: BALANCE & STATUS --- */}
          <div className={styles.formGrid2} style={{ display: 'grid', gap: '25px', marginBottom: '30px' }}>
            {/* Balance API */}
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '20px', color: '#1756AA' }}>Balance API Parameters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Balance URL</label>
                  <input type="text" className={styles.inputControl} style={{ height: '40px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className={styles.formGroup}><label className={styles.label}>UID</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>PIN</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                </div>
                <div className={styles.formGroup}><label className={styles.label}>Balance Position</label><input type="text" className={styles.inputControl} style={{ height: '40px', width: '100%' }} /></div>
              </div>
            </div>

            {/* Status API */}
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '20px', color: '#1756AA' }}>Status API Parameters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Status URL</label>
                  <input type="text" className={styles.inputControl} style={{ height: '40px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className={styles.formGroup}><label className={styles.label}>UID</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>PIN</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                  <div className={styles.formGroup}><label className={styles.label}>Status Pos.</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>API TXN Pos.</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>Op. Ref Pos.</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className={styles.formGroup}><label className={styles.label}>Parameter 3</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>Parameter 4</label><input type="text" className={styles.inputControl} style={{ height: '40px' }} /></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button type="submit" disabled={isSubmitting} style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: isSubmitting ? '#9CA3AF' : 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', 
              color: '#fff', border: 'none', borderRadius: '8px', 
              padding: '12px 24px', fontSize: '0.9rem', fontWeight: 600, 
              cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.2)', minWidth: '150px', justifyContent: 'center'
            }}>
              {isSubmitting ? <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} /> : <FiSave />} 
              <span>{isSubmitting ? 'Submitting...' : 'Submit Integration'}</span>
            </button>
            <button 
              type="reset" 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px',
                background: '#F1F5F9', color: '#4E6080', minWidth: '150px',
                border: 'none', borderRadius: '10px', padding: '12px 32px',
                fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                justifyContent: 'center', transition: 'all 0.2s',
                boxShadow: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#F1F5F9';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiRotateCcw /> Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAPI;
