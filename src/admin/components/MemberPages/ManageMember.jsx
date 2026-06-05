import React, { useState } from 'react';
import { FiDatabase } from 'react-icons/fi';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaSearch, FaFileExcel, FaFilePdf, FaPrint, FaCopy, FaFileCsv,
  FaChevronLeft, FaChevronRight, FaEllipsisV, FaCog, FaEdit, FaEye, 
  FaUserLock, FaTrash, FaCheck, FaExclamationCircle, FaFilter,
  FaCalendarAlt, FaUserTag, FaIdCard, FaMobileAlt, FaHandHoldingUsd, FaArrowRight,
  FaUsersCog, FaUserFriends, FaEnvelope, FaSms, FaVideo
} from 'react-icons/fa';
import { updateManageMemberFilters, updateMemberDirect, deleteMember } from '../../../store/slices/memberSlice';
import styles from './MemberPages.module.css';

const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    style={{
      width: '32px', height: '18px', background: checked ? '#27AE60' : '#CBD5E0',
      borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s'
    }}
  >
    <div style={{
      width: '14px', height: '14px', background: '#fff', borderRadius: '50%',
      position: 'absolute', top: '2px', left: checked ? '16px' : '2px', transition: '0.3s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }} />
  </div>
);

const ManageMember = () => {
  const dispatch = useDispatch();
  const { manageMemberState } = useSelector((s) => s.member);
  const { filters, list } = manageMemberState;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [viewMember, setViewMember] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [holdInputs, setHoldInputs] = useState({});
  const [confirmHold, setConfirmHold] = useState(null);

  const handleDropdownToggle = (e, mId) => {
    if (activeDropdown === mId) {
      setActiveDropdown(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setDropdownPos({ top: rect.top - 10, left: rect.right + 12 });
      setActiveDropdown(mId);
    }
  };

  const handleSearchClick = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateManageMemberFilters({ [name]: value }));
  };

  const handlePillClick = (name, value) => {
    dispatch(updateManageMemberFilters({ [name]: value }));
  };

  const handleToggle = (field, m) => {
    dispatch(updateMemberDirect({ id: m.id, updates: { [field]: !m[field] } }));
  };

  const handleActionClick = (action, m) => {
    setActiveDropdown(null);
    if (action === 'Edit') setEditMember(m);
    else if (action === 'Send Email') alert(`Email sent successfully to ${m.email}`);
    else if (action === 'Send SMS') alert(`SMS sent successfully to ${m.mobile}`);
    else if (action === 'Re-KYC') alert(`Re-KYC process initiated for ${m.name}`);
  };

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      
      {/* ── DROPDOWN OVERLAY ── */}
      {activeDropdown && (
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 999 }} 
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* ── ENHANCED FILTER CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', padding: '6px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div className={styles.directoryTitleGroup}>
            <h2 className={styles.directoryTitle} style={{ fontSize: '1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaUserFriends style={{ color: '#1756AA' }} /> Member Directory
            </h2>
            <p className={styles.directorySubtitle} style={{ fontSize: '0.65rem', margin: '0' }}>Manage and monitor network members</p>
          </div>
        </div>
        
        <div className={styles.formGrid4} style={{ marginTop: '20px' }}>
          {/* MOBILE DATE ROW */}
          <div style={{ display: 'flex', gap: '12px', gridColumn: 'span 2' }}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.label} style={{ fontSize: '0.75rem' }}>From Date</label>
              <div className={styles.inputWrap}>
                <input type="date" name="fromDate" className={styles.inputControl} style={{ paddingLeft: '12px', fontSize: '0.85rem' }} value={filters.fromDate} onChange={handleFilterChange} />
              </div>
            </div>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.label} style={{ fontSize: '0.75rem' }}>To Date</label>
              <div className={styles.inputWrap}>
                <input type="date" name="toDate" className={styles.inputControl} style={{ paddingLeft: '12px', fontSize: '0.85rem' }} value={filters.toDate} onChange={handleFilterChange} />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} style={{ fontSize: '0.75rem' }}>Role</label>
            <div className={styles.inputWrap}>
              <select name="role" className={styles.inputControl} style={{ paddingLeft: '12px', fontSize: '0.85rem' }} value={filters.role} onChange={handleFilterChange}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} style={{ fontSize: '0.75rem' }}>Search Member</label>
            <div className={styles.inputWrap}>
              <input type="text" name="search" className={styles.inputControl} style={{ paddingLeft: '12px', fontSize: '0.85rem' }} placeholder="Mobile / LoginID" value={filters.search} onChange={handleFilterChange} />
            </div>
          </div>
        </div>

        <div className={styles.formGrid3} style={{ marginTop: '24px', alignItems: 'flex-end' }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Member Type</label>
            <div className={styles.pillRow}>
              {['Active', 'DeActive', 'All'].map(t => (
                <button 
                  key={t}
                  className={`${styles.pillTab} ${filters.memberType === t ? styles.pillTabActive : ''}`}
                  onClick={() => handlePillClick('memberType', t)}
                >{t}</button>
              ))}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>KYC Status</label>
            <div className={styles.pillRow}>
              {['KYC', 'Non-KYC', 'All'].map(k => (
                <button 
                  key={k}
                  className={`${styles.pillTab} ${filters.kycStatus === k ? styles.pillTabActive : ''}`}
                  onClick={() => handlePillClick('kycStatus', k)}
                >{k}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className={styles.searchBtnRed} style={{ background: 'linear-gradient(135deg, #27AE60 0%, #1e8449 100%)', boxShadow: '0 4px 15px rgba(39, 174, 96, 0.25)' }} onClick={handleSearchClick} disabled={isSearching}>
              {isSearching ? <div className={styles.spinner}></div> : <FaSearch />} 
              {isSearching ? 'Searching...' : 'Search Member'}
            </button>
          </div>
        </div>
      </div>

      {/* ── TABLE CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div className={styles.directoryHeader} style={{ background: '#F8FAFF', padding: '15px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <ExportButtons headers={[]} rows={[]} fileNamePrefix="managemember_report" sheetName="Report" />

          <div className={styles.tableSearch} style={{ background: '#fff', minWidth: '240px' }}>
            <FaSearch />
            <input type="text" placeholder="Quick search..." />
          </div>
        </div>

        <div className={styles.tableContainer} style={{ minHeight: '380px' }}>
          <table className={styles.tableFull} style={{ minWidth: '1800px', width: '100%', marginBottom: 0 }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Action</th>
                <th>Main Balance</th>
                <th>AEPS Balance</th>
                <th>Hold Amount</th>
                <th>MemberID</th>
                <th>Member Name</th>
                <th>City</th>
                <th>Parent Details</th>
                <th>Mobile</th>
                <th>AEPS Status</th>
                <th>Email</th>
                <th>Alt Mobile</th>
                <th>Shop Name</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>DOB</th>
                <th>DOJ</th>
                <th>Joined By</th>
                <th>Password</th>
                <th>LoginPin</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="22" style={{ textAlign: 'center', padding: '40px', color: '#718096', fontSize: '0.9rem' }}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                list.map((m, i) => (
                  <tr key={m.id}>
                    <td>{i + 1}</td>
                    <td style={{ position: 'relative', zIndex: activeDropdown === m.id ? 1001 : 1 }}>
                      <div style={{ position: 'relative' }}>
                        <button 
                          className={styles.actionBtnGreen}
                          onClick={(e) => handleDropdownToggle(e, m.id)}
                        >
                          Action <FaEllipsisV />
                        </button>
                        {activeDropdown === m.id && (
                          <div className={styles.actionMenu} style={{ top: dropdownPos.top, left: dropdownPos.left }}>
                            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', fontSize: '0.8rem', color: '#4E6080', fontWeight: 600 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaVideo style={{ color: '#1756AA', fontSize: '1rem' }} /> Video KYC</div>
                              <ToggleSwitch checked={m.videoKyc} onChange={() => handleToggle('videoKyc', m)} />
                            </div>
                            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', fontSize: '0.8rem', color: '#4E6080', fontWeight: 600 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaUserLock style={{ color: '#EAA21F', fontSize: '1rem' }} /> Acct Active</div>
                              <ToggleSwitch checked={m.isActive !== false} onChange={() => handleToggle('isActive', m)} />
                            </div>
                            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', fontSize: '0.8rem', color: '#4E6080', fontWeight: 600 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaHandHoldingUsd style={{ color: '#E53E3E', fontSize: '1rem' }} /> Hold Acct</div>
                              <ToggleSwitch checked={m.isHold} onChange={() => handleToggle('isHold', m)} />
                            </div>
                            <button onClick={() => handleActionClick('Send Email', m)}><FaEnvelope style={{ color: '#27AE60' }} /> Send Gmail</button>
                            <button onClick={() => handleActionClick('Send SMS', m)}><FaSms style={{ color: '#3182CE' }} /> Send SMS</button>
                            <button onClick={() => handleActionClick('Edit', m)}><FaEdit style={{ color: '#1756AA' }} /> Edit Details</button>
                            <button onClick={() => handleActionClick('Re-KYC', m)}><FaIdCard style={{ color: '#718096' }} /> Member Re-KYC</button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className={styles.fwBold} style={{ color: '#27AE60' }}>₹ {m.mainBal}</td>
                    <td className={styles.fwBold} style={{ color: '#1756AA' }}>₹ {m.aepsBal}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input 
                          type="number" 
                          className={styles.inputControl} 
                          style={{ 
                            width: '85px', padding: '6px 10px', 
                            borderColor: Number(m.holdAmt) > 0 ? '#FEB2B2' : '#E2E8F0',
                            color: Number(m.holdAmt) > 0 ? '#E53E3E' : '#0D1B3E',
                            background: Number(m.holdAmt) > 0 ? '#FFF5F5' : '#fff',
                            fontWeight: Number(m.holdAmt) > 0 ? '700' : '500'
                          }} 
                          value={holdInputs[m.id] !== undefined ? holdInputs[m.id] : m.holdAmt} 
                          onChange={(e) => setHoldInputs({ ...holdInputs, [m.id]: e.target.value })} 
                        />
                        <button 
                          className={styles.pillRedSmall}
                          onClick={() => setConfirmHold({ member: m, amount: holdInputs[m.id] !== undefined ? holdInputs[m.id] : m.holdAmt })}
                          style={{ background: Number(m.holdAmt) > 0 ? '#C53030' : '#E53E3E', opacity: (holdInputs[m.id] !== undefined ? holdInputs[m.id] : m.holdAmt) === '' ? 0.5 : 1 }}
                          disabled={(holdInputs[m.id] !== undefined ? holdInputs[m.id] : m.holdAmt) === ''}
                        >
                          {Number(m.holdAmt) > 0 ? 'Update' : 'Hold'}
                        </button>
                      </div>
                    </td>
                    <td className={styles.fwBold}>{m.memberId}</td>
                    <td className={styles.fwBold}>{m.name}</td>
                    <td>{m.city}</td>
                    <td>{m.parent}</td>
                    <td>{m.mobile}</td>
                    <td>
                      <span className={`${styles.badge} ${m.aepsStatus === 'Registered' ? styles.badge_green : styles.badge_red}`}>
                        {m.aepsStatus === 'Registered' ? <FaCheck /> : <FaExclamationCircle />} {m.aepsStatus}
                      </span>
                    </td>
                    <td>{m.email}</td>
                    <td>{m.altMobile}</td>
                    <td>{m.shop}</td>
                    <td>{m.aadhar}</td>
                    <td>{m.pan}</td>
                    <td>{m.dob}</td>
                    <td>{m.doj}</td>
                    <td>{m.joinedBy}</td>
                    <td style={{ color: '#A0AEC0', fontStyle: 'italic', fontSize: '0.75rem' }}>{m.password}</td>
                    <td className={styles.fwBold}>{m.pin}</td>
                    <td><span className={styles.badge} style={{ background: '#F1F5F9', color: '#4E6080' }}>{m.source}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>
            Showing 1 to {list.length} of {list.length} entries
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className={styles.pageBtn} style={{ width: '36px', height: '36px' }}>
              <FaChevronLeft />
            </button>
            <span className={styles.pageActive} style={{ 
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '8px', background: '#1756AA', color: '#fff', fontSize: '0.9rem', fontWeight: 600
            }}>1</span>
            <button className={styles.pageBtn} style={{ width: '36px', height: '36px' }}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ── VIEW MODAL ── */}
      {viewMember && (
        <div className={styles.drawerOverlay} onClick={() => setViewMember(null)}>
          <div className={styles.drawerContent} onClick={e => e.stopPropagation()} style={{ width: '400px', background: '#fff', borderRadius: '12px', padding: '24px', margin: 'auto', alignSelf: 'center', height: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 20px', color: '#0D1B3E' }}>Member Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#4E6080' }}>
              <p style={{ margin: 0 }}><strong>Name:</strong> {viewMember.name}</p>
              <p style={{ margin: 0 }}><strong>Mobile:</strong> {viewMember.mobile}</p>
              <p style={{ margin: 0 }}><strong>Email:</strong> {viewMember.email}</p>
              <p style={{ margin: 0 }}><strong>Shop:</strong> {viewMember.shop}</p>
              <p style={{ margin: 0 }}><strong>City:</strong> {viewMember.city}</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> {viewMember.aepsStatus}</p>
            </div>
            <button onClick={() => setViewMember(null)} style={{ marginTop: '24px', width: '100%', padding: '12px', background: '#1756AA', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editMember && (
        <div className={styles.drawerOverlay} onClick={() => setEditMember(null)}>
          <div className={styles.drawerContent} onClick={e => e.stopPropagation()} style={{ width: '400px', background: '#fff', borderRadius: '12px', padding: '24px', margin: 'auto', alignSelf: 'center', height: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 20px', color: '#0D1B3E' }}>Edit Member</h3>
            <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
              <label>Name</label>
              <input type="text" className={styles.inputControl} value={editMember.name} onChange={(e) => setEditMember({...editMember, name: e.target.value})} />
            </div>
            <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
              <label>Mobile</label>
              <input type="text" className={styles.inputControl} value={editMember.mobile} onChange={(e) => setEditMember({...editMember, mobile: e.target.value})} />
            </div>
            <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
              <label>Shop Name</label>
              <input type="text" className={styles.inputControl} value={editMember.shop} onChange={(e) => setEditMember({...editMember, shop: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button onClick={() => {
                dispatch(updateMemberDirect({ id: editMember.id, updates: { name: editMember.name, mobile: editMember.mobile, shop: editMember.shop } }));
                setEditMember(null);
              }} style={{ padding: '12px', background: '#27AE60', color: '#fff', border: 'none', borderRadius: '8px', flex: 1, fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
              <button onClick={() => setEditMember(null)} style={{ padding: '12px', background: '#E53E3E', color: '#fff', border: 'none', borderRadius: '8px', flex: 1, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HOLD CONFIRM MODAL ── */}
      {confirmHold && (
        <div className={styles.drawerOverlay} onClick={() => setConfirmHold(null)}>
          <div className={styles.drawerContent} onClick={e => e.stopPropagation()} style={{ width: '340px', background: '#fff', borderRadius: '20px', padding: '30px 24px', margin: 'auto', alignSelf: 'center', height: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', textAlign: 'center', animation: 'premiumFadeIn 0.3s ease' }}>
            <div style={{ width: '60px', height: '60px', background: '#FFF5F5', color: '#E53E3E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px', boxShadow: '0 4px 10px rgba(229, 62, 62, 0.15)' }}>
              <FaHandHoldingUsd />
            </div>
            <h3 style={{ margin: '0 0 12px', color: '#0D1B3E', fontSize: '1.3rem', fontWeight: 800 }}>Confirm Hold Amount</h3>
            <p style={{ margin: '0 0 28px', color: '#4E6080', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Are you sure you want to hold <strong style={{ color: '#E53E3E', fontSize: '1rem' }}>₹{confirmHold.amount || 0}</strong> for <strong>{confirmHold.member.name}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => {
                dispatch(updateMemberDirect({ id: confirmHold.member.id, updates: { holdAmt: confirmHold.amount || '0' } }));
                setHoldInputs({ ...holdInputs, [confirmHold.member.id]: undefined });
                setConfirmHold(null);
              }} style={{ padding: '12px', background: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)', color: '#fff', border: 'none', borderRadius: '10px', flex: 1, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(229, 62, 62, 0.25)' }}>Confirm</button>
              <button onClick={() => setConfirmHold(null)} style={{ padding: '12px', background: '#F1F5F9', color: '#4E6080', border: 'none', borderRadius: '10px', flex: 1, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMember;
