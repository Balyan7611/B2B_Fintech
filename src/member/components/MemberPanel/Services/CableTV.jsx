import React, { useState } from 'react';
import { FiSearch, FiChevronRight, FiMonitor, FiX } from 'react-icons/fi';
import styles from './ServiceGrid.module.css';
import ServiceQuickNav from './ServiceQuickNav';

const CableTV = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [customerNumber, setCustomerNumber] = useState('');

  const providers = [
    { id: 'act', name: 'ACT Digital TV', logo: 'https://logo.clearbit.com/actcorp.in' },
    { id: 'asianet', name: 'Asianet Digital', logo: 'https://logo.clearbit.com/asianet.co.in' },
    { id: 'den', name: 'DEN Networks', logo: 'https://logo.clearbit.com/dennetworks.com' },
    { id: 'digiana', name: 'Digiana', logo: '' },
    { id: 'gtpl', name: 'GTPL KCBPL', logo: 'https://logo.clearbit.com/gtpl.net' },
    { id: 'hathway', name: 'Hathway Digital', logo: 'https://logo.clearbit.com/hathway.com' },
    { id: 'incable', name: 'InDigital (InCable)', logo: 'https://logo.clearbit.com/indigital.co.in' },
    { id: 'siti', name: 'Siti Networks', logo: 'https://logo.clearbit.com/sitinetworks.com' },
    { id: 'tata-play', name: 'Tata Play Fiber', logo: 'https://logo.clearbit.com/tataplay.com' },
  ];

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Cable TV</h1>
          <p className={styles.subtitle}>Pay your cable TV bills instantly</p>
        </div>
        <ServiceQuickNav />
      </div>

      <div className={styles.searchSection}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search for your provider..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h2 className={styles.sectionTitle}>
        <FiMonitor size={16} color="#9b59b6" /> All Operators
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
              <span className={styles.providerType}>Cable Operator</span>
            </div>
            <FiChevronRight className={styles.arrow} />
          </div>
        ))}
      </div>

      {selectedProvider && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProvider(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Cable TV Bill</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedProvider(null)}><FiX /></button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.providerSelection}>
                <div className={styles.selectedLogo}>{selectedProvider.logo ? <img src={selectedProvider.logo} alt="" style={{width:'100%'}} /> : selectedProvider.name[0]}</div>
                <span style={{ fontWeight: '700' }}>{selectedProvider.name}</span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Customer Number / MAC ID :</label>
                <input type="text" className={styles.inputField} placeholder="Enter your customer number" value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} />
              </div>
              <button className={styles.payBtn}>Fetch Bill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CableTV;
