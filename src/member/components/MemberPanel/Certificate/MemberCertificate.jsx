import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaDownload, FaMedal, FaEye, FaTimes } from 'react-icons/fa';
import { SITE_CONFIG } from '../../../../config/siteConfig';
import styles from './MemberCertificate.module.css';

const MemberCertificate = () => {
  const { isDarkMode } = useSelector(state => state.memberPanel);
  const certRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  const member = {
    name: 'Sachin Balyan',
    agentCode: 'RT1236',
    city: 'Jaipur',
    validUpto: '31 OCTOBER 2025',
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
    try {
      await document.fonts.ready;

      // Saari images load hone ka wait karo
      const images = certRef.current.querySelectorAll('img');
      await Promise.all(
        [...images].map(img =>
          img.complete
            ? Promise.resolve()
            : new Promise(res => { img.onload = res; img.onerror = res; })
        )
      );

      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: async (clonedDoc) => {
          await clonedDoc.fonts.ready;
          await new Promise(res => setTimeout(res, 400));

          // Cloned doc mein bhi logo size fix karo
          const logos = clonedDoc.querySelectorAll('img');
          logos.forEach(img => {
            if (img.className && img.className.toString().includes('poweredLogo')) {
              img.style.width = '94px';
              img.style.height = '44px';
              img.style.maxWidth = '94px';
            }
          });
        },
      });
      const link = document.createElement('a');
      link.download = `Certificate_${member.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Certificate download failed:', err);
    }
  };

  const surname = member.name.split(' ').pop().toUpperCase();

  const CertificateContent = React.forwardRef(({ isPreview }, ref) => (
    <div className={isPreview ? styles.previewCertCard : styles.certCard} ref={ref}>
      {/* Watermark */}
      <div className={styles.watermark}>
        <img src={SITE_CONFIG.logo} alt="" className={styles.watermarkImg} crossOrigin="anonymous" />
      </div>

      <div className={styles.innerFrame}>
        <span className={`${styles.corner} ${styles.cornerTL}`}>❋</span>
        <span className={`${styles.corner} ${styles.cornerTR}`}>❋</span>
        <span className={`${styles.corner} ${styles.cornerBL}`}>❋</span>
        <span className={`${styles.corner} ${styles.cornerBR}`}>❋</span>

        {/* Header */}
        <div className={styles.certHeader}>
          <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.brandName} className={styles.logo} crossOrigin="anonymous" />
        </div>

        {/* Top Gold Divider */}
        <div className={styles.goldDivider}>
          <div className={styles.goldLine} />
          <span style={{
            fontSize: '0.65rem',
            color: '#C9A84C',
            flexShrink: 0,
            display: 'inline-block',
            lineHeight: 1,
          }}>◆</span>
          <div className={styles.goldLine} />
        </div>

        {/* Title */}
        <div className={styles.titleBlock}>
          <p className={styles.certOfText}>C E R T I F I C A T E &nbsp; O F</p>
          <h2 className={styles.certTitle}>Authorization</h2>
          <hr className={styles.titleUnderline} />
        </div>

        {/* Body */}
        <div className={styles.certBody}>
          <p className={styles.subtext}>This is to certify that</p>
          <p className={styles.memberName}>
            Mr/Ms&nbsp;<span className={styles.nameBold}>{member.name}</span>&nbsp;({surname})
          </p>
          <p className={styles.appointText}>
            is appointed as the <em>Customer Service Point</em> of
          </p>
          <p className={styles.companyName}>{SITE_CONFIG.companyName}</p>
          <p className={styles.cityText}>{member.city}</p>
        </div>

        {/* Footer */}
        <div className={styles.certFooter}>
          <div className={styles.footerCol}>
            <div className={styles.footerSignLine} />
            <span className={styles.footerLabel}>AUTHORIZED SIGNATORY</span>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerValue}>{member.agentCode}</span>
            <div className={styles.footerSignLine} />
            <span className={styles.footerLabel}>AGENT CODE</span>
          </div>
          <div className={styles.footerCol}>
            <img src={SITE_CONFIG.logo} alt="Logo" className={styles.poweredLogo} crossOrigin="anonymous" />
            <div className={styles.footerSignLine} />
            <span className={styles.poweredByLabel}>POWERED BY</span>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerValue}>{member.validUpto}</span>
            <div className={styles.footerSignLine} />
            <span className={styles.footerLabel}>VALID UPTO</span>
          </div>
        </div>

        {/* Bottom Gold Divider */}
        <div className={styles.goldDivider} style={{ marginBottom: '18px' }}>
          <div className={styles.goldLine} />
          <span style={{
            fontSize: '0.65rem',
            color: '#C9A84C',
            flexShrink: 0,
            display: 'inline-block',
            lineHeight: 1,
          }}>◆</span>
          <div className={styles.goldLine} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className={`${styles.page} ${isDarkMode ? styles.dark : ''}`}>

      {/* Page Heading Row */}
      <div className={styles.pageHeading}>
        <FaMedal className={styles.headingIcon} />
        <span>Certificate of Authorization</span>
        <button className={styles.previewBtn} onClick={() => setShowPreview(true)} title="Preview Certificate">
          <FaEye /> Preview
        </button>
      </div>

      <div className={styles.certWrapper}>
        <CertificateContent ref={certRef} />

        {/* Download Button */}
        <button className={styles.downloadBtn} onClick={handleDownload}>
          <FaDownload /> Download Certificate
        </button>
      </div>

      {/* ── PREVIEW MODAL ── */}
      {showPreview && (
        <div className={styles.modalOverlay} onClick={() => setShowPreview(false)}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowPreview(false)}>
              <FaTimes />
            </button>
            <p className={styles.modalTitle}><FaMedal /> Certificate Preview</p>

            {/* Certificate preview (read-only, scaled down) */}
            <div className={styles.previewScaler}>
              <CertificateContent isPreview={true} />
            </div>

            <button className={styles.downloadBtn} onClick={handleDownload}>
              <FaDownload /> Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCertificate;
