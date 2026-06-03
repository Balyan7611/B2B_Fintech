import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaArrowRight,
  FaSearch, FaShieldAlt
} from 'react-icons/fa';
import { updateChangePassword } from '../../../store/slices/memberSlice';
import styles from './MemberPages.module.css';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { changePassword } = useSelector((s) => s.member);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Clear form on mount to prevent any stale state
  useEffect(() => {
    dispatch(updateChangePassword({ newPass: '', confirmPass: '', member: '' }));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateChangePassword({ [name]: value }));
  };

  const getStrength = (pass) => {
    if (!pass) return '';
    if (pass.length < 6) return 'weak';
    if (pass.length < 10) return 'medium';
    return 'strong';
  };

  const strength = getStrength(changePassword.newPass);

  const handleProcess = () => {
    if (!changePassword.member) {
      alert('Please select a member first!');
      return;
    }
    if (!changePassword.newPass) {
      alert('Please enter a new password!');
      return;
    }
    if (changePassword.newPass !== changePassword.confirmPass) {
      alert('Passwords do not match!');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      dispatch(updateChangePassword({ newPass: '', confirmPass: '', member: '' }));
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Anti-Autofill Dummy Fields */}
        <input type="text" style={{ display: 'none' }} />
        <input type="password" style={{ display: 'none' }} />

        <div className={styles.cardHeader} style={{ padding: '10px 24px', borderBottom: '1px solid #EEF3FC', background: '#fff' }}>
          <h2 className={styles.cardTitle} style={{ margin: 0, fontSize: '1.2rem', color: '#0D1B3E' }}>Change Member Password</h2>
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
                  value={changePassword.member}
                  onChange={handleInputChange}
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
            {changePassword.member && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', background: '#fff', border: '1px solid #EEF3FC', borderRadius: '8px', overflow: 'hidden', marginTop: '2px', marginBottom: '4px' }}>
                <div style={{ flex: 1, padding: '6px 12px', borderRight: '1px solid #EEF3FC', textAlign: 'center', fontSize: '0.8rem', color: '#0D1B3E' }}>
                  <span style={{ fontWeight: 600, color: '#4E6080' }}>Name:</span> {changePassword.member.includes('Pay99') ? 'VIVEK VARSHNEY' : changePassword.member.includes('BALYAN') ? 'BALYAN' : 'FARIDABAD'}
                </div>
                <div style={{ flex: 1, padding: '6px 12px', borderRight: '1px solid #EEF3FC', textAlign: 'center', fontSize: '0.8rem', color: '#0D1B3E' }}>
                  <span style={{ fontWeight: 600, color: '#4E6080' }}>Mobile:</span> {changePassword.member.match(/\[(\d+)\]/)?.[1] || '9999999999'}
                </div>
                <div style={{ flex: 1, padding: '6px 12px', textAlign: 'center', fontSize: '0.8rem', color: '#0D1B3E' }}>
                  <span style={{ fontWeight: 600, color: '#4E6080' }}>Shop:</span> {changePassword.member.includes('Pay99') ? 'Pay99' : changePassword.member.split(' ')[0]}
                </div>
              </div>
            )}

            <div style={{ gridColumn: '1 / -1', fontSize: '0.9rem', fontWeight: 700, color: '#0D1B3E', marginTop: '10px', marginBottom: '-5px' }}>
              Set Password
            </div>

            {/* New Password */}
            <div className={styles.formGroup}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNew ? "text" : "password"}
                  name="user_new_password_field"
                  style={{ width: '100%', height: '42px', border: '1.5px solid #E2E8F0', background: '#F8FAFF', borderRadius: '10px', padding: '0 45px 0 16px', outline: 'none', boxSizing: 'border-box', fontSize: '0.85rem', color: '#0D1B3E', letterSpacing: !showNew && changePassword.newPass ? '0.15em' : 'normal' }}
                  placeholder="New Password"
                  value={changePassword.newPass}
                  onChange={(e) => dispatch(updateChangePassword({ newPass: e.target.value }))}
                  autoComplete="new-password"
                />
                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#A0AEC0', display: 'flex' }}>
                  {showNew ? (
                    <FaEyeSlash onClick={() => setShowNew(false)} />
                  ) : (
                    <FaEye onClick={() => setShowNew(true)} />
                  )}
                </div>
              </div>
              {changePassword.newPass && (
                <div style={{ marginTop: '8px', animation: 'fadeIn 0.3s ease' }}>
                  <div style={{ height: '4px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: strength === 'strong' ? '100%' : strength === 'medium' ? '66%' : '33%', background: strength === 'strong' ? '#27AE60' : strength === 'medium' ? '#EAA21F' : '#E53E3E', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="user_confirm_password_field"
                  style={{ width: '100%', height: '42px', border: '1.5px solid #E2E8F0', background: '#F8FAFF', borderRadius: '10px', padding: '0 45px 0 16px', outline: 'none', boxSizing: 'border-box', fontSize: '0.85rem', color: '#0D1B3E', letterSpacing: !showConfirm && changePassword.confirmPass ? '0.15em' : 'normal' }}
                  placeholder="Re-type Password"
                  value={changePassword.confirmPass}
                  onChange={(e) => dispatch(updateChangePassword({ confirmPass: e.target.value }))}
                  autoComplete="off"
                />
                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#A0AEC0', display: 'flex' }}>
                  {showConfirm ? (
                    <FaEyeSlash onClick={() => setShowConfirm(false)} />
                  ) : (
                    <FaEye onClick={() => setShowConfirm(true)} />
                  )}
                </div>
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
                <>Change Password <FaArrowRight /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
