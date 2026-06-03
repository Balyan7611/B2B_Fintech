import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  FiSearch, FiEye, FiUser, FiCalendar, FiCheckCircle, 
  FiX, FiDownload, FiInfo, FiLayers, FiActivity, FiDatabase, FiShield, FiChevronLeft, FiChevronRight, FiFilter, FiCopy
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const KYCDetails = () => {
  const { list: memberList } = useSelector(state => state.member?.manageMemberState || { list: [] });
  const [selectedMember, setSelectedMember] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const kycDetailsData = [
    { id: 1, reqDate: '11/03/2025 19:38:25', personName: 'TSM1002 pawan 9354302228', parent: '100000 VIVEK VARSHNEY 9999999999', approveDate: '11/03/2025 19:44:54', approved: true, status: 'Approved' },
    { id: 2, reqDate: '06/03/2025 14:29:27', personName: '100000 VIVEK VARSHNEY 9999999999', parent: '100000 VIVEK VARSHNEY 9999999999', approveDate: '06/03/2025 14:29:27', approved: true, status: 'Approved' },
    { id: 3, reqDate: '07/05/2025 11:47:21', personName: 'Pay99RT4537 KHEM CHAND 8750725849', parent: '100000 VIVEK VARSHNEY 9999999999', approveDate: '07/05/2025 11:47:21', approved: true, status: 'Approved' },
    { id: 4, reqDate: '06/05/2025 08:47:42', personName: 'Pay99RT4527 NARESH KUMAR 8700095925', parent: '100000 VIVEK VARSHNEY 9999999999', approveDate: '06/05/2025 08:47:42', approved: true, status: 'Approved' },
    { id: 5, reqDate: '23/04/2025 17:16:11', personName: 'Pay99RT4417 Arun Dalal 8683806397', parent: '100000 VIVEK VARSHNEY 9999999999', approveDate: '24/04/2025 19:38:22', approved: true, status: 'Approved' },
  ];

  const handleView = (item) => {
    setViewingItem(item);
    setShowModal(true);
  };

  const filteredData = kycDetailsData.filter(item => {
    const matchesSearch = item.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.parent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = selectedMember ? item.personName.includes(selectedMember) : true;
    return matchesSearch && matchesMember;
  });

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* ── MAIN REPORT CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <div className={styles.directoryTitleGroup}>
            <h2 className={styles.directoryTitle} style={{ fontSize: '1.2rem' }}>KYC Member Report</h2>
            <p className={styles.directorySubtitle} style={{ fontSize: '0.75rem' }}>Tracking history of identification verification</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select 
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: '0.85rem', color: '#0D1B3E', fontWeight: 600, background: '#F8FAFF', minWidth: '200px' }}
            >
              <option value="">All Members</option>
              <option value="100000">100000 VIVEK VARSHNEY</option>
              <option value="TSM1002">TSM1002 pawan</option>
              <option value="Pay99RT4537">Pay99RT4537 KHEM CHAND</option>
              <option value="Pay99RT4527">Pay99RT4527 NARESH KUMAR</option>
              <option value="Pay99RT4417">Pay99RT4417 Arun Dalal</option>
              {memberList && memberList.map(m => (
                 <option key={m.id} value={m.memberId}>{m.memberId} - {m.name}</option>
              ))}
            </select>

            {selectedMember && (
              <button 
                onClick={() => setSelectedMember('')}
                style={{ background: '#FFF5F5', color: '#E53E3E', border: '1.5px solid #FED7D7', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="global-table-toolbar" style={{ padding: '15px 20px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select 
              className={styles.selectEntries} 
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            <button className="global-export-btn btn-copy" title="Copy Table"><FaCopy /></button>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>

          <div className="global-search-box">
            <FiSearch />
            <input 
              type="text" 
              placeholder="Search history..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ minWidth: '1200px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '50px' }}>#</th>
                <th style={{ textAlign: 'center', width: '60px' }}>VIEW</th>
                <th>MEMBER IDENTITY</th>
                <th>PARENT BRANCH</th>
                <th style={{ textAlign: 'center' }}>REQ. DATE</th>
                <th style={{ textAlign: 'center' }}>APP. DATE</th>
                <th style={{ textAlign: 'center', width: '90px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                   <td colSpan="7" style={{ padding: 0, background: '#fff' }}>
                     <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px', color: '#A0AEC0' }}>
                       <div style={{ fontSize: '1.5rem', opacity: 0.3 }}><FiDatabase /></div>
                       <div style={{ fontSize: '0.85rem' }}>No records match selection</div>
                     </div>
                   </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className={styles.editBtn} 
                        style={{ background: 'rgba(23, 86, 170, 0.1)', color: '#1756AA', border: 'none', width: '36px', height: '36px' }}
                        onClick={() => handleView(item)}
                      >
                        <FiEye />
                      </button>
                    </td>
                    <td>
                       <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 700, color: '#0D1B3E', fontSize: '0.85rem' }}>{item.personName.split(' ').slice(1, 4).join(' ')}</span>
                          <small style={{ color: '#1756AA', fontWeight: 600, fontSize: '0.7rem' }}>ID: {item.personName.split(' ')[0]}</small>
                       </div>
                    </td>
                    <td>
                       <div style={{ fontSize: '0.8rem', color: '#4E6080' }}>{item.parent}</div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '0.75rem' }}>{item.reqDate}</div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '0.75rem', color: '#27AE60', fontWeight: 600 }}>{item.approveDate}</div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className={styles.switch} style={{ transform: 'scale(0.7)' }}>
                        <input type="checkbox" checked={item.approved} readOnly />
                        <span className={styles.slider}></span>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="global-pagination">
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>Showing {filteredData.length} records</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="global-page-btn" disabled><FiChevronLeft /></button>
            <button className="global-page-btn global-page-active">1</button>
            <button className="global-page-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>



      {/* ── DETAILS MODAL ── */}
      {showModal && viewingItem && (
        <div className={styles.modalOverlay} style={{ zIndex: 3500 }}>
          <div className={styles.modalContainer} style={{ width: '600px', borderRadius: '20px' }}>
            <div className={styles.modalHeader} style={{ padding: '15px 25px', borderBottom: '1px solid #F1F5F9' }}>
              <div className={styles.directoryTitleGroup}>
                <h3 className={styles.directoryTitle} style={{ fontSize: '1.1rem' }}>KYC Dossier</h3>
                <p className={styles.directorySubtitle} style={{ fontSize: '0.7rem' }}>Review status and identity proofs</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            
            <div className={styles.modalBody} style={{ padding: '25px' }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '25px' }}>
                  <div style={{ background: '#F8FAFF', padding: '15px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                     <small style={{ color: '#718096', display: 'block', marginBottom: '3px', textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 800 }}>Member Name</small>
                     <span style={{ fontWeight: 800, color: '#0D1B3E', fontSize: '0.9rem' }}>{viewingItem.personName.split(' ').slice(1, 3).join(' ')}</span>
                  </div>
                  <div style={{ background: '#F8FAFF', padding: '15px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                     <small style={{ color: '#718096', display: 'block', marginBottom: '3px', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 800 }}>Member ID</small>
                     <span style={{ fontWeight: 800, color: '#1756AA', fontSize: '0.9rem' }}>{viewingItem.personName.split(' ')[0]}</span>
                  </div>
                  <div style={{ gridColumn: 'span 2', background: '#F8FAFF', padding: '15px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                     <small style={{ color: '#718096', display: 'block', marginBottom: '3px', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 800 }}>Parent Info</small>
                     <span style={{ fontWeight: 700, color: '#4E6080', fontSize: '0.85rem' }}>{viewingItem.parent}</span>
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div style={{ border: '1.5px dashed #CBD5E0', padding: '12px', borderRadius: '12px', textAlign: 'center', background: '#F1F5F9' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', color: '#4E6080' }}>FRONT SIDE</div>
                    <div style={{ width: '100%', height: '120px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0', fontSize: '0.65rem' }}>IMAGE PREVIEW</div>
                  </div>
                  <div style={{ border: '1.5px dashed #CBD5E0', padding: '12px', borderRadius: '12px', textAlign: 'center', background: '#F1F5F9' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', color: '#4E6080' }}>BACK SIDE</div>
                    <div style={{ width: '100%', height: '120px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0', fontSize: '0.65rem' }}>IMAGE PREVIEW</div>
                  </div>
               </div>
            </div>

            <div className={styles.modalFooter} style={{ padding: '15px 25px', background: '#FBFDFF' }}>
                <button type="button" className={styles.prevBtn} style={{ height: '38px', padding: '0 25px', fontSize: '0.8rem' }} onClick={() => setShowModal(false)}>Close</button>
                <div style={{ flex: 1 }}></div>
                <button type="button" className={styles.publishBtn} style={{ height: '38px', padding: '0 20px', fontSize: '0.8rem' }} onClick={() => setShowModal(false)}>
                  <FiDownload /> Download Proofs
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCDetails;
