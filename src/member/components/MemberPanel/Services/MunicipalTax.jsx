import React, { useState } from 'react';
import { FiSearch, FiChevronRight, FiHome, FiX } from 'react-icons/fi';
import styles from './ServiceGrid.module.css';
import ServiceQuickNav from './ServiceQuickNav';

const MunicipalTax = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [propertyId, setPropertyId] = useState('');

  const providers = [
    { id: 'mcgm', name: 'MCGM - Mumbai Municipal Corp', logo: 'https://logo.clearbit.com/mcgm.gov.in' },
    { id: 'ndmc', name: 'New Delhi Municipal Council', logo: 'https://logo.clearbit.com/ndmc.gov.in' },
    { id: 'pmc', name: 'Pune Municipal Corporation', logo: 'https://logo.clearbit.com/pmc.gov.in' },
    { id: 'smc', name: 'Surat Municipal Corporation', logo: 'https://logo.clearbit.com/suratmunicipal.gov.in' },
    { id: 'ghmc', name: 'Greater Hyderabad Municipal Corp', logo: 'https://logo.clearbit.com/ghmc.gov.in' },
    { id: 'knmc', name: 'Kalyan-Dombivli Municipal Corp', logo: 'https://logo.clearbit.com/kdmc.gov.in' },
    { id: 'vvcmc', name: 'Vasai-Virar City Municipal Corp', logo: 'https://logo.clearbit.com/vvcmc.in' },
    { id: 'nmmc', name: 'Navi Mumbai Municipal Corp', logo: 'https://logo.clearbit.com/nmmc.gov.in' },
  ];

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Municipal Tax</h1>
          <p className={styles.subtitle}>Pay your property and municipal taxes</p>
        </div>
        <ServiceQuickNav />
      </div>

      <div className={styles.searchSection}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search for your corporation..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h2 className={styles.sectionTitle}>
        <FiHome size={16} color="#e67e22" /> All Corporations
      </h2>

      <div className={styles.grid}>
        {filteredProviders.map((provider) => (
          <div key={provider.id} className={styles.card} onClick={() => setSelectedProvider(provider)}>
            <div className={styles.logoWrapper}>
              <img src={provider.logo} alt="" className={styles.logoImg} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#1c3b72' }}>{provider.name[0]}</div>
            </div>
            <div className={styles.info}>
              <span className={styles.providerName}>{provider.name}</span>
              <span className={styles.providerType}>Municipal Tax</span>
            </div>
            <FiChevronRight className={styles.arrow} />
          </div>
        ))}
      </div>

      {selectedProvider && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProvider(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Municipal Tax</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedProvider(null)}><FiX /></button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.providerSelection}>
                <div className={styles.selectedLogo}>{selectedProvider.logo ? <img src={selectedProvider.logo} alt="" style={{width:'100%'}} /> : selectedProvider.name[0]}</div>
                <span style={{ fontWeight: '700' }}>{selectedProvider.name}</span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Property ID / Assessment No :</label>
                <input type="text" className={styles.inputField} placeholder="Enter your property ID" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
              </div>
              <button className={styles.payBtn}>Fetch Dues</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MunicipalTax;
