import React, { useRef, useState, useEffect } from 'react';
import { FiDatabase } from 'react-icons/fi';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaUserShield, FaKey, FaCheckCircle, FaArrowRight, FaSearch, FaShieldAlt
} from 'react-icons/fa';
import { updateTpin } from '../../../store/slices/memberSlice';
import styles from './MemberPages.module.css';

const ChangeTPIN = () => {
  const dispatch = useDispatch();
  const { tpinState } = useSelector((s) => s.member);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const pinRefs = useRef([]);
  const confirmRefs = useRef([]);

  // Force reset on mount to prevent browser autofill
  useEffect(() => {
    dispatch(updateTpin({ member: '', tpin: ['', '', '', ''], confirmTpin: ['', '', '', ''] }));
  }, [dispatch]);

  const handlePinChange = (e, index, type) => {
    const val = e.target.value;
    if (val && isNaN(val)) return;

    const currentArray = type === 'tpin' ? [...tpinState.tpin] : [...tpinState.confirmTpin];
    currentArray[index] = val.slice(-1);

    if (type === 'tpin') {
      dispatch(updateTpin({ tpin: currentArray }));
    } else {
      dispatch(updateTpin({ confirmTpin: currentArray }));
    }

    // Auto focus next
    if (val && index < 3) {
      const nextRef = type === 'tpin' ? pinRefs.current[index + 1] : confirmRefs.current[index + 1];
      nextRef?.focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevRef = type === 'tpin' ? pinRefs.current[index - 1] : confirmRefs.current[index - 1];
      prevRef?.focus();
    }
  };

  const handleProcess = () => {
    const pin = tpinState.tpin.join('');
    const cpin = tpinState.confirmTpin.join('');

    if (!tpinState.member) {
      alert('Please select a member first!');
      return;
    }
    if (pin.length < 4 || cpin.length < 4) {
      alert('Please enter full 4-digit TPIN');
      return;
    }
    if (pin !== cpin) {
      alert('TPINs do not match!');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      dispatch(updateTpin({ member: '', tpin: ['', '', '', ''], confirmTpin: ['', '', '', ''] }));
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Anti-Autofill Dummy */}
        <input type="text" style={{ display: 'none' }} />
        <input type="password" style={{ display: 'none' }} />

        <div className={styles.cardHeader} style={{ padding: '10px 24px', borderBottom: '1px solid #EEF3FC', background: '#fff' }}>
          <h2 className={styles.cardTitle} style={{ margin: 0, fontSize: '1.2rem', color: '#0D1B3E' }}>Update Transaction PIN</h2>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {/* Select Member */}
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.8rem', color: '#4E6080', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Select Member</label>
              <div style={{ position: 'relative' }}>
                <select 
                  name="member"
                  style={{ width: '100%', height: '42px', border: '1.5px solid #E2E8F0', background: '#F8FAFF', borderRadius: '10px', padding: '0 15px', outline: 'none', appearance: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#0D1B3E', fontWeight: 500 }}
                  value={tpinState.member}
                  onChange={(e) => dispatch(updateTpin({ member: e.target.value }))}
                  autoComplete="off"
                >
                  <option value="">Select Member</option>
                  <option value="100000 Pay99 [9999999999]">100000 Pay99 [9999999999]</option>
                  <option value="RT1236 BALYAN [6377487868]">RT1236 BALYAN [6377487868]</option>
                  <option value="MDT8597 FARIDABAD [9354821335]">MDT8597 FARIDABAD [9354821335]</option>
                  <option value="Pay99RT4002 SoniTechno [8005575599]">Pay99RT4002 SoniTechno [8005575599]</option>
                </select>
                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#A0AEC0', fontSize: '0.7rem' }}>▼</div>
              </div>
            </div>

            {/* Selected Member Details */}
            {tpinState.member && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', background: '#fff', border: '1px solid #EEF3FC', borderRadius: '8px', overflow: 'hidden', marginTop: '2px', marginBottom: '4px' }}>
                <div style={{ flex: 1, padding: '6px 12px', borderRight: '1px solid #EEF3FC', textAlign: 'center', fontSize: '0.8rem', color: '#0D1B3E' }}>
                  <span style={{ fontWeight: 600, color: '#4E6080' }}>Name:</span> {tpinState.member.includes('Pay99') ? 'VIVEK VARSHNEY' : tpinState.member.includes('BALYAN') ? 'BALYAN' : 'FARIDABAD'}
                </div>
                <div style={{ flex: 1, padding: '6px 12px', borderRight: '1px solid #EEF3FC', textAlign: 'center', fontSize: '0.8rem', color: '#0D1B3E' }}>
                  <span style={{ fontWeight: 600, color: '#4E6080' }}>Mobile:</span> {tpinState.member.match(/\[(\d+)\]/)?.[1] || '9999999999'}
                </div>
                <div style={{ flex: 1, padding: '6px 12px', textAlign: 'center', fontSize: '0.8rem', color: '#0D1B3E' }}>
                  <span style={{ fontWeight: 600, color: '#4E6080' }}>Shop:</span> {tpinState.member.includes('Pay99') ? 'Pay99' : tpinState.member.split(' ')[0]}
                </div>
              </div>
            )}

            <div style={{ gridColumn: '1 / -1', fontSize: '0.9rem', fontWeight: 700, color: '#0D1B3E', marginTop: '10px', marginBottom: '-5px' }}>
              Set TPIN
            </div>

            {/* New TPIN */}
            <div className={styles.formGroup}>
              <label style={{ fontSize: '0.8rem', color: '#4E6080', display: 'block', marginBottom: '8px' }}>New 4-Digit TPIN</label>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
                {tpinState.tpin.map((digit, i) => (
                  <input 
                    key={i}
                    ref={el => pinRefs.current[i] = el}
                    type="password"
                    maxLength="1"
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      textAlign: 'center', 
                      padding: '0', 
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      borderRadius: '10px',
                      background: '#F8FAFF',
                      border: '1.5px solid #E2E8F0',
                      outline: 'none',
                      color: '#0D1B3E'
                    }}
                    value={digit}
                    onChange={(e) => handlePinChange(e, i, 'tpin')}
                    onKeyDown={(e) => handleKeyDown(e, i, 'tpin')}
                    autoComplete="new-password"
                  />
                ))}
              </div>
            </div>

            {/* Confirm TPIN */}
            <div className={styles.formGroup}>
              <label style={{ fontSize: '0.8rem', color: '#4E6080', display: 'block', marginBottom: '8px' }}>Confirm TPIN</label>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
                {tpinState.confirmTpin.map((digit, i) => (
                  <input 
                    key={i}
                    ref={el => confirmRefs.current[i] = el}
                    type="password"
                    maxLength="1"
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      textAlign: 'center', 
                      padding: '0', 
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      borderRadius: '10px',
                      background: '#F8FAFF',
                      border: '1.5px solid #E2E8F0',
                      outline: 'none',
                      color: '#0D1B3E'
                    }}
                    value={digit}
                    onChange={(e) => handlePinChange(e, i, 'confirmTpin')}
                    onKeyDown={(e) => handleKeyDown(e, i, 'confirmTpin')}
                    autoComplete="new-password"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '32px', paddingTop: '24px', borderTop: '1px dashed #E2E8F0' }}>
            <button 
              style={{ padding: '12px 35px', borderRadius: '12px', background: '#1756AA', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(23,86,170,0.25)', transition: 'all 0.3s' }}
              onClick={handleProcess}
              disabled={isSuccess}
            >
              {isSuccess ? (
                <>
                  <FaCheckCircle /> Updated Successfully!
                </>
              ) : (
                <>Update TPIN <FaArrowRight /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTPIN;

