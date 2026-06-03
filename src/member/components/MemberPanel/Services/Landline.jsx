import React, { useState } from 'react';
import { FiSearch, FiChevronRight, FiPhoneCall, FiX } from 'react-icons/fi';
import styles from './ServiceGrid.module.css';
import ServiceQuickNav from './ServiceQuickNav';

const Landline = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [landlineNumber, setLandlineNumber] = useState('');

  const providers = [
    { id: 'airtel', name: 'Airtel Landline', logo: 'https://logo.clearbit.com/airtel.in' },
    { id: 'bsnl-corp', name: 'BSNL Landline - Corporate', logo: 'https://logo.clearbit.com/bsnl.co.in' },
    { id: 'bsnl-ind', name: 'BSNL Landline - Individual', logo: 'https://logo.clearbit.com/bsnl.co.in' },
    { id: 'mtnl-mum', name: 'MTNL Mumbai', logo: 'https://logo.clearbit.com/mtnl.net.in' },
    { id: 'mtnl-del', name: 'MTNL Delhi', logo: 'https://logo.clearbit.com/mtnl.net.in' },
    { id: 'tikona', name: 'Tikona', logo: 'https://logo.clearbit.com/tikona.in' },
  ];

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Landline Postpaid</h1>
          <p className={styles.subtitle}>Pay your landline bills instantly</p>
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
        <FiPhoneCall size={16} color="#3498db" /> All Providers
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
              <span className={styles.providerType}>Landline Bill</span>
            </div>
            <FiChevronRight className={styles.arrow} />
          </div>
        ))}
      </div>

      {selectedProvider && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProvider(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitles}>
                <p className={styles.modalPreTitle}>Lets Get Your</p>
                <h2 className={styles.modalTitle}>LANDLINE Bill Payment Done!</h2>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedProvider(null)}><FiX /></button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.providerSelectionRow}>
                <div className={styles.providerInfo}>
                  <div className={styles.selectedLogo}>{selectedProvider.logo ? <img src={selectedProvider.logo} alt="" style={{width:'40px'}} /> : selectedProvider.name[0]}</div>
                  <span className={styles.selectedName}>{selectedProvider.name}(ATL)</span>
                </div>
                <button className={styles.editBtn} onClick={() => setSelectedProvider(null)}>EDIT</button>
              </div>
              
              <div className={styles.formSection}>
                <div className={styles.formGroup}>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    placeholder="Landline Number :" 
                    value={landlineNumber} 
                    onChange={(e) => setLandlineNumber(e.target.value)} 
                  />
                  <p className={styles.validationText}>Please Enter Valid Landline Number :(Min. 5 to Max. 12)</p>
                </div>
                <button className={styles.nextBtn}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landline;
