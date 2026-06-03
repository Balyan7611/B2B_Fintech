import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight, FiRefreshCw, FiCheck
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

// ── CUSTOM SEARCHABLE DROPDOWN ──
const CustomSearchSelect = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '10px', 
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          background: '#fff', height: '48px'
        }}>
        <span style={{ color: value ? '#1E293B' : '#94A3B8', fontSize: '0.95rem', fontWeight: 600 }}>{value || placeholder}</span>
        <FiChevronDown style={{ color: '#94A3B8', transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
      </div>
      {isOpen && (
        <div style={{ 
          position: 'absolute', top: 'calc(100% + 5px)', left: 0, right: 0, background: '#fff', 
          border: '1px solid #E2E8F0', borderRadius: '10px', zIndex: 50, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' 
        }}>
          <div style={{ padding: '12px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
            <input 
              autoFocus
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
             {filtered.map((opt, i) => (
               <div 
                 key={i} 
                 onClick={() => { onChange(opt); setIsOpen(false); setSearch(""); }}
                 style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #F1F5F9', fontSize: '0.95rem', color: '#1E293B', fontWeight: 500 }}
                 onMouseEnter={(e) => e.target.style.background = '#F8FAFC'}
                 onMouseLeave={(e) => e.target.style.background = 'transparent'}
               >
                 {opt}
               </div>
             ))}
             {filtered.length === 0 && <div style={{ padding: '15px', color: '#94A3B8', fontSize: '0.95rem', textAlign: 'center' }}>No results found</div>}
          </div>
        </div>
      )}
    </div>
  );
};

const ParentChange = () => {
  const dispatch = useDispatch();

  const [member, setMember] = useState("");
  const [role, setRole] = useState("");
  const [parent, setParent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const memberOptions = ["MDT8597 (vivek varshney)", "Pay99RT4011 (Gaurav Kumar)", "Pay99RT4014 (Pooja Tomar)", "Pay99RT4015 (Vikram)"];
  const roleOptions = ["Master Distributor", "Distributor", "Retailer", "API User"];
  const parentOptions = ["100000 (VIVEK VARSHNEY)", "TSM1002 (pawan)", "Pay99DT5001 (vivek varshney)"];

  const sampleList = [
    { id: 1, member: 'MDT8597 (vivek varshney)', role: 'Master Distributor', roleAfter: 'Master Distributor', parent: '100000 (VIVEK VARSHNEY)', parentAfter: 'TSM1002 (pawan)', addDate: '18/03/2025 10:30:15' },
    { id: 2, member: 'Pay99RT4011 (Gaurav Kumar)', role: 'Retailer', roleAfter: 'Retailer', parent: 'Pay99DT5001 (vivek varshney)', parentAfter: '100000 (VIVEK VARSHNEY)', addDate: '15/04/2025 11:20:00' },
    { id: 3, member: 'Pay99RT4014 (Pooja Tomar)', role: 'Retailer', roleAfter: 'Retailer', parent: 'TSM1002 (pawan)', parentAfter: 'Pay99DT5009 (Pooja Tomar)', addDate: '26/03/2025 14:15:30' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg("Parent change updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      setMember("");
      setRole("");
      setParent("");
    }, 1500);
  };

  return (
    <div className={styles.container} style={{ padding: '15px 10px', maxWidth: '100%' }}>
      
      {/* ── FORM CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 25px rgba(0,0,0,0.03)', borderRadius: '16px', marginBottom: '20px' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>Parent Change</h3>
        </div>

        <div style={{ padding: '25px 20px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '25px' }}>
              
              {/* Member ID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <label style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>MemberID :</label>
                 <CustomSearchSelect options={memberOptions} placeholder="Select Member" value={member} onChange={setMember} />
              </div>

              {/* Current Parent ID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <label style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>Current ParentID :</label>
                 <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '10px', color: '#64748B', fontSize: '0.95rem', fontWeight: 600, height: '48px', display: 'flex', alignItems: 'center' }}>
                   {member ? 'TSM1002 (pawan)' : 'No member selected'}
                 </div>
              </div>

              {/* Role */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <label style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>Role :</label>
                 <CustomSearchSelect options={roleOptions} placeholder="Select Role" value={role} onChange={setRole} />
              </div>

              {/* Parent ID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <label style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>ParentID :</label>
                 <CustomSearchSelect options={parentOptions} placeholder="Select Parent" value={parent} onChange={setParent} />
              </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                style={{ 
                  background: isSaving ? '#60A5FA' : '#1756AA', color: '#fff', border: 'none', 
                  padding: '12px 40px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 800, 
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                {isSaving && <FiRefreshCw className={styles.spin} />}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              
              {successMsg && (
                <div style={{ color: '#16A34A', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiCheck style={{ fontSize: '1.2rem' }} /> {successMsg}
                </div>
              )}
           </div>
        </div>
      </div>

      {/* ── LIST CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 25px rgba(0,0,0,0.03)', borderRadius: '16px' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>Parent Change List</h3>
        </div>

        {/* TOOLBAR */}
        <div className="global-table-toolbar" style={{ padding: '10px 20px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries} style={{ borderRadius: '8px', border: '1px solid #E2E8F0', padding: '6px 10px' }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>

          <div className="global-search-box" style={{ maxWidth: '250px' }}>
            <FiSearch />
            <input type="text" placeholder="Search..." style={{ borderRadius: '8px', padding: '8px 12px 8px 35px' }} />
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ width: '100%', minWidth: '1100px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ width: '60px', padding: '15px', textAlign: 'center', color: '#475569' }}>S. No.</th>
                <th style={{ width: '220px', padding: '15px', textAlign: 'left', color: '#475569' }}>Member</th>
                <th style={{ width: '150px', padding: '15px', textAlign: 'left', color: '#475569' }}>Role</th>
                <th style={{ width: '150px', padding: '15px', textAlign: 'left', color: '#475569' }}>Role After Change</th>
                <th style={{ width: '220px', padding: '15px', textAlign: 'left', color: '#475569' }}>Parent</th>
                <th style={{ width: '220px', padding: '15px', textAlign: 'left', color: '#475569' }}>Parent After Change</th>
                <th style={{ width: '150px', padding: '15px', textAlign: 'left', color: '#475569' }}>AddDate</th>
              </tr>
            </thead>
            <tbody>
              {sampleList.map((item, idx) => (
                <tr key={item.id} className={styles.hoverRow}>
                  <td style={{ fontWeight: 700, color: '#64748B', padding: '15px', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ padding: '15px', color: '#1E293B', fontWeight: 700 }}>{item.member}</td>
                  <td style={{ padding: '15px', color: '#64748B', fontWeight: 600 }}>{item.role}</td>
                  <td style={{ padding: '15px', color: '#1E293B', fontWeight: 600 }}>{item.roleAfter}</td>
                  <td style={{ padding: '15px', color: '#64748B', fontWeight: 600 }}>{item.parent}</td>
                  <td style={{ padding: '15px', color: '#1E293B', fontWeight: 600 }}>{item.parentAfter}</td>
                  <td style={{ padding: '15px', color: '#64748B', fontWeight: 600, fontSize: '0.85rem' }}>{item.addDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="global-pagination" style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
            Showing 1 to 3 of 3 entries
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronLeft /></button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', background: '#1756AA', color: '#fff', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem' }}>1</div>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentChange;
