import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSmartphone, FiPhone, FiRadio, FiZap, FiDroplet, FiPackage, FiShield,
  FiPhoneCall, FiCreditCard, FiBook, FiTv, FiHome, FiWifi, FiFileText,
  FiHeart, FiActivity, FiDollarSign, FiMapPin, FiRepeat, FiGlobe, FiKey, FiBell,
  FiUserPlus, FiSearch, FiX, FiCreditCard as FiAccount, FiMonitor
} from 'react-icons/fi';
import styles from './MyServices.module.css';

const MyServicesModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      navigate('/member/dashboard');
    }
  };

  const bbpsServices = [
    { name: 'RECHARGE', icon: <FiSmartphone color="#3498db" />, path: '/member/dashboard/service/mobile-recharge' },
    { name: 'MOBILE POSTPAID', icon: <FiPhone color="#9b59b6" />, path: '/member/dashboard/service/mobile-postpaid' },
    { name: 'DTH', icon: <FiRadio color="#1abc9c" />, path: '/member/dashboard/service/dth' },
    { name: 'ELECTRICITY', icon: <FiZap color="#f1c40f" />, path: '/member/dashboard/service/electricity' },
    { name: 'WATER', icon: <FiDroplet color="#3498db" />, path: '/member/dashboard/service/water' },
    { name: 'GAS', icon: <FiPackage color="#e67e22" />, path: '/member/dashboard/service/gas' },
    { name: 'LPG GAS', icon: <FiPackage color="#e91e63" />, path: '/member/dashboard/service/lpg' },
    { name: 'INSURANCE', icon: <FiShield color="#2ecc71" />, path: '/member/dashboard/service/insurance' },
    { name: 'LANDLINE POSTPAID', icon: <FiPhoneCall color="#3498db" />, path: '/member/dashboard/service/landline' },
    { name: 'FASTAG', icon: <FiCreditCard color="#1c3b72" />, path: '/member/dashboard/service/fastag' },
    { name: 'EDUCATION', icon: <FiBook color="#9b59b6" />, path: '#' },
    { name: 'CABLE TV', icon: <FiMonitor color="#e67e22" />, path: '/member/dashboard/service/cable-tv' },
    { name: 'MUNICIPAL TAX', icon: <FiHome color="#1abc9c" />, path: '/member/dashboard/service/municipal-tax' },
    { name: 'BROADBAND', icon: <FiWifi color="#3498db" />, path: '#' },
    { name: 'E-CHALLAN', icon: <FiFileText color="#e74c3c" />, path: '#' },
    { name: 'MOBILE PREPAID', icon: <FiSmartphone color="#2ecc71" />, path: '/member/dashboard/service/mobile-recharge' },
    { name: 'DONATION', icon: <FiHeart color="#e74c3c" />, path: '#' },
    { name: 'HEALTH INSURANCE', icon: <FiActivity color="#e91e63" />, path: '#' },
    { name: 'HOUSING SOCIETY', icon: <FiHome color="#1c3b72" />, path: '#' },
    { name: 'LIFE INSURANCE', icon: <FiShield color="#3498db" />, path: '#' },
    { name: 'LOAN REPAY', icon: <FiDollarSign color="#2ecc71" />, path: '#' },
    { name: 'MUNICIPAL SERVICE', icon: <FiMapPin color="#e67e22" />, path: '#' },
    { name: 'RECURRING DEPOSIT', icon: <FiRepeat color="#9b59b6" />, path: '#' },
    { name: 'CLUBS ASSOC.', icon: <FiGlobe color="#1c3b72" />, path: '#' },
    { name: 'RENTAL', icon: <FiKey color="#1abc9c" />, path: '#' },
    { name: 'SUBSCRIPTION', icon: <FiBell color="#f1c40f" />, path: '#' },
    { name: 'NPMC', icon: <FiCreditCard color="#3498db" />, path: '#' },
  ];

  const filteredServices = bbpsServices.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
        
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h2 className={styles.title}>All Services</h2>
              <p className={styles.subtitle}>Quick access to Bharat Connect</p>
            </div>
          </div>
          
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button 
            type="button"
            className={styles.closeBtn} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose();
            }}
          >
            <FiX />
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.bbpsGrid}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div 
                  key={service.name} 
                  className={styles.bbpsItem}
                  onClick={() => { navigate(service.path); handleClose(); }}
                >
                  <div className={styles.bbpsIconBox}>
                    {service.icon}
                  </div>
                  <span className={styles.bbpsName}>{service.name}</span>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No matching services found.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyServicesModal;
