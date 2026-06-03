import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPan, setPanVerified } from '../../../../store/slices/registrationSlice';
import { closeModal } from '../../../../store/slices/registrationSlice';
import { FaIdCard, FaArrowRight } from 'react-icons/fa';
import styles from './Step3.module.css';

const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pan, isPanVerified } = useSelector((s) => s.registration);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    if (pan.length < 10 || verifying || isPanVerified) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      dispatch(setPanVerified());
    }, 1600);
  };

  const handleContinue = () => {
    dispatch(closeModal());
    navigate('/register/details');
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <label className={styles.label}>Enter PAN Number</label>
        <div className={styles.panRow}>
          <div className={`${styles.inputWrap} ${isPanVerified ? styles.inputVerified : ''}`}>
            <span className={styles.iconBox}><FaIdCard /></span>
            <input
              className={styles.input}
              type="text"
              maxLength={10}
              placeholder="e.g. ABCDE1234F"
              value={pan}
              disabled={isPanVerified}
              onChange={(e) => dispatch(setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)))}
            />
          </div>
          <button
            className={`${styles.verifyBtn} ${pan.length < 10 || isPanVerified ? styles.disabled : ''} ${verifying ? styles.loading : ''}`}
            onClick={handleVerify}
            disabled={pan.length < 10 || verifying || isPanVerified}
          >
            {verifying ? <span className={styles.spinner} /> : 'Verify'}
          </button>
        </div>
      </div>

      {isPanVerified && (
        <div className={styles.successBox}>
          <div className={styles.checkAnim}>
            <svg viewBox="0 0 52 52" className={styles.checkSvg}>
              <circle className={styles.checkCircle} cx="26" cy="26" r="25" fill="none" />
              <path className={styles.checkTick} fill="none" d="M14 27l8 8 16-16" />
            </svg>
          </div>
          <p className={styles.successText}>PAN Verified ✓</p>
        </div>
      )}

      {isPanVerified && (
        <button className={styles.nextBtn} onClick={handleContinue}>
          Continue to Registration <FaArrowRight className={styles.btnArrow} />
        </button>
      )}
    </div>
  );
};

export default Step3;
