import React, { useState } from 'react';
import { FiSearch, FiChevronRight, FiCreditCard, FiX } from 'react-icons/fi';
import styles from './ServiceGrid.module.css';
import ServiceQuickNav from './ServiceQuickNav';

const Fastag = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState('');

  const providers = [
    { id: 'airtel', name: 'Airtel Payments Bank Fastag', logo: 'https://logo.clearbit.com/airtel.in' },
    { id: 'axis', name: 'Axis Bank Fastag', logo: 'https://logo.clearbit.com/axisbank.com' },
    { id: 'bob', name: 'Bank of Baroda - Fastag', logo: 'https://logo.clearbit.com/bankofbaroda.in' },
    { id: 'bom', name: 'Bank of Maharashtra FASTag', logo: 'https://logo.clearbit.com/bankofmaharashtra.in' },
    { id: 'equitas', name: 'Equitas Fastag Recharge', logo: 'https://logo.clearbit.com/equitasbank.com' },
    { id: 'federal', name: 'Federal Bank - Fastag', logo: 'https://logo.clearbit.com/federalbank.co.in' },
    { id: 'hdfc', name: 'HDFC Bank - Fastag', logo: 'https://logo.clearbit.com/hdfcbank.com' },
    { id: 'icici', name: 'ICICI Bank Fastag', logo: 'https://logo.clearbit.com/icicibank.com' },
    { id: 'idbi', name: 'IDBI Bank Fastag', logo: 'https://logo.clearbit.com/idbibank.in' },
    { id: 'idfc', name: 'IDFC First Bank - Fastag', logo: 'https://logo.clearbit.com/idfcfirstbank.com' },
    { id: 'indian', name: 'Indian Bank Fastag', logo: 'https://logo.clearbit.com/indianbank.in' },
    { id: 'indusind', name: 'IndusInd Bank Fastag', logo: 'https://logo.clearbit.com/indusind.com' },
    { id: 'iob', name: 'IOB Fastag', logo: 'https://logo.clearbit.com/iob.in' },
    { id: 'j&k', name: 'Jammu and Kashmir Bank Fastag', logo: 'https://logo.clearbit.com/jkbank.com' },
    { id: 'karur', name: 'Karur Vysya Bank Fastag', logo: 'https://logo.clearbit.com/kvb.co.in' },
    { id: 'kotak', name: 'Kotak Mahindra Bank - Fastag', logo: 'https://logo.clearbit.com/kotak.com' },
    { id: 'paytm', name: 'Paytm Payments Bank Fastag', logo: 'https://logo.clearbit.com/paytm.com' },
    { id: 'sbi', name: 'State Bank of India Fastag', logo: 'https://logo.clearbit.com/sbi.co.in' },
  ];

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Fastag Recharge</h1>
          <p className={styles.subtitle}>Recharge your Fastag instantly</p>
        </div>
        <ServiceQuickNav />
      </div>

      <div className={styles.searchSection}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search for your bank..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h2 className={styles.sectionTitle}>
        <FiCreditCard size={16} color="#1c3b72" /> All Banks
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
              <span className={styles.providerType}>Fastag Bank</span>
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
                <h2 className={styles.modalTitle}>FASTAG Bill Payment Done!</h2>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedProvider(null)}><FiX /></button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.providerSelectionRow}>
                <div className={styles.providerInfo}>
                  <div className={styles.selectedLogo}>{selectedProvider.logo ? <img src={selectedProvider.logo} alt="" style={{width:'40px'}} /> : selectedProvider.name[0]}</div>
                  <span className={styles.selectedName}>{selectedProvider.name}(IHT30)</span>
                </div>
                <button className={styles.editBtn} onClick={() => setSelectedProvider(null)}>EDIT</button>
              </div>
              
              <div className={styles.formSection}>
                <div className={styles.formGroup}>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    placeholder="Vehicle No :" 
                    value={vehicleNumber} 
                    onChange={(e) => setVehicleNumber(e.target.value)} 
                  />
                  <p className={styles.validationText}>Please Enter Valid Vehicle No :(Min. 8 to Max. 12)</p>
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

export default Fastag;
