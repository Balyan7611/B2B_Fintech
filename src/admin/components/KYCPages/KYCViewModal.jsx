import React from 'react';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { FiX, FiDownload, FiZoomIn, FiDatabase } from 'react-icons/fi';
import styles from '../MemberPages/MemberPages.module.css';

const KYCViewModal = ({ isOpen, onClose, documentName, imageUrl }) => {
  if (!isOpen) return null;

  const displayUrl = imageUrl;

  return (
    <div className={styles.modalOverlay} onClick={onClose} style={{ zIndex: 6000 }}>
      <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '24px' }} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader} style={{ padding: '16px 24px', border: 'none' }}>
          <div className={styles.modalHeaderTitleGroup}>
            <h2 className={styles.modalTitle} style={{ fontSize: '1.1rem' }}>VIEW DOCUMENT</h2>
            <p className={styles.modalSubtitle}>{documentName || 'Identification Proof'}</p>
          </div>
          <button className={styles.drawerCloseBtn} onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody} style={{ padding: '0 24px 20px', overflow: 'hidden', background: '#fff' }}>
          <div style={{ 
            background: '#F8FAFF', 
            padding: '12px', 
            borderRadius: '20px', 
            border: '1.5px solid #EEF3FC',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '100%',
              height: '240px',
              borderRadius: '14px',
              overflow: 'hidden',
              background: '#E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {displayUrl ? (
                <img 
                  src={displayUrl} 
                  alt="KYC Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#718096' }}>
                  <FiZoomIn style={{ fontSize: '2rem', opacity: 0.3, marginBottom: '10px' }} />
                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>No Preview Available</p>
                </div>
              )}
            </div>
            
            <div style={{
              position: 'absolute',
              bottom: '22px',
              right: '22px',
              display: 'flex',
              gap: '8px'
            }}>
              <button className={styles.viewBtn} style={{ background: '#fff', border: '1px solid #E2E8F0', width: '34px', height: '34px' }} title="Zoom">
                <FiZoomIn style={{ fontSize: '0.9rem' }} />
              </button>
              <button className={styles.viewBtn} style={{ background: '#1756AA', color: '#fff', border: 'none', width: '34px', height: '34px' }} title="Download">
                <FiDownload style={{ fontSize: '0.9rem' }} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter} style={{ border: 'none', padding: '0 24px 24px', justifyContent: 'center' }}>
          <button 
            className={styles.nextBtn} 
            onClick={onClose}
            style={{ background: '#1756AA', padding: '10px 24px', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem' }}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCViewModal;
