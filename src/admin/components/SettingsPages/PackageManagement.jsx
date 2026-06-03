import React, { useState } from 'react';
import { 
  FiPackage, FiUserCheck, FiDollarSign, FiShield, FiEdit, FiSearch, FiCopy, FiPlus, FiX, FiCheck, FiChevronRight, FiChevronLeft, FiTrash2
} from 'react-icons/fi';
import { FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint, FaRupeeSign } from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const PackageManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    role: '', name: '', price: '0', capping: '0', copySlab: '', status: true
  });

  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, id: null });

  const [localPackages, setLocalPackages] = useState([
    { id: 1, name: 'Retailer', role: 'Retailer', price: '0.00', capping: '0.00', copySlab: '', status: true, addDate: '27/03/2025' },
    { id: 2, name: 'Admin', role: 'Admin', price: '0.00', capping: '0.00', copySlab: '', status: true, addDate: '27/03/2025' },
    { id: 3, name: 'Distributor', role: 'Distributor', price: '0.00', capping: '0.00', copySlab: 'Retailer', status: true, addDate: '27/03/2025' },
    { id: 4, name: 'Master', role: 'Master', price: '0.00', capping: '0.00', copySlab: 'Retailer', status: true, addDate: '27/03/2025' },
    { id: 5, name: 'API USER', role: 'API User', price: '0.00', capping: '0.00', copySlab: '', status: true, addDate: '27/03/2025' },
    { id: 6, name: 'Direct retailer', role: 'Retailer', price: '0.00', capping: '0.00', copySlab: 'Retailer', status: true, addDate: '27/03/2025' },
  ]);

  const handleDelete = () => {
    setLocalPackages(localPackages.filter(p => p.id !== showConfirmModal.id));
    setShowConfirmModal({ isOpen: false, id: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ role: '', name: '', price: '0', capping: '0', copySlab: '', status: true });
    setIsModalOpen(true);
  };

  const handleEdit = (pkg) => {
    setFormData({ ...pkg });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // If editing an existing package, update it; otherwise add a new one.
      if (formData.id) {
        setLocalPackages(localPackages.map(p => p.id === formData.id ? { ...p, ...formData } : p));
      } else {
        const newPkg = { ...formData, id: Date.now(), addDate: new Date().toLocaleDateString('en-GB') };
        setLocalPackages([...localPackages, newPkg]);
      }
      setIsLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  return (
    <div className={styles.container} style={{ padding: '5px 2px 0px 2px', maxWidth: '100%' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ margin: '8px 8px 15px 8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: '#fff', borderRadius: '16px' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'nowrap', gap: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Package List</h3>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
            color: '#fff', border: 'none', borderRadius: '8px', 
            padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700, 
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s' 
          }} onClick={handleAddClick}>
            <FiPlus size={16} /> <span>Add New Package</span>
          </button>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="global-table-toolbar" style={{ padding: '10px 15px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select 
              className={styles.selectEntries} 
              style={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            <button className="global-export-btn btn-copy" title="Copy Table"><FaCopy /></button>
            <button className="global-export-btn btn-excel" title="Download Excel"><FaFileExcel /></button>
            <button className="global-export-btn btn-pdf" title="Download PDF"><FaFilePdf /></button>
            <button className="global-export-btn btn-csv" title="Download CSV"><FaFileCsv /></button>
            <button className="global-export-btn btn-print" title="Print Table"><FaPrint /></button>
          </div>

          <div className="global-search-box" style={{ maxWidth: '300px' }}>
            <FiSearch />
            <input 
              type="text" placeholder="Search packages..." 
              style={{ borderRadius: '10px' }}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ width: '100%', minWidth: '950px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '50px' }}>S.NO</th>
                <th style={{ width: '90px', textAlign: 'center' }}>ACTION</th>
                <th style={{ width: '250px' }}>PACKAGE DETAILS</th>
                <th style={{ width: '120px' }}>ROLE</th>
                <th style={{ textAlign: 'left', width: '120px' }}>PRICE (₹)</th>
                <th style={{ textAlign: 'left', width: '100px' }}>CAPPING</th>
                <th style={{ textAlign: 'left', width: '120px' }}>STATUS</th>
                <th style={{ textAlign: 'left', width: '120px' }}>ADD DATE</th>
              </tr>
            </thead>
            <tbody>
              {localPackages.map((pkg, idx) => (
                <tr key={pkg.id} className={styles.hoverRow}>
                  <td style={{ fontWeight: 700, color: '#A0AEC0' }}>{idx + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className={styles.editBtn} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F8FAFC', color: '#3B82F6', border: '1px solid #E2E8F0', cursor: 'pointer' }} onClick={() => handleEdit(pkg)} title="Edit Package"><FiEdit /></button>
                      <button className={styles.deleteBtn} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7', cursor: 'pointer' }} title="Delete Package" onClick={() => setShowConfirmModal({ isOpen: true, id: pkg.id })}><FiTrash2 /></button>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#1756AA', fontSize: '0.95rem', fontWeight: 800 }}>{pkg.name}</span>
                      <small style={{ color: '#718096', fontWeight: 600 }}>Copy Slab: {pkg.copySlab || 'None'}</small>
                    </div>
                  </td>
                  <td>
                    <span style={{ background: 'rgba(23, 86, 170, 0.08)', color: '#1756AA', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {pkg.role}
                    </span>
                  </td>
                  <td style={{ textAlign: 'left', fontWeight: 800, color: '#27AE60' }}>₹{pkg.price}</td>
                  <td style={{ textAlign: 'left', fontWeight: 700, color: '#4E6080' }}>{pkg.capping}</td>
                  <td style={{ textAlign: 'left' }}>
                    <span style={{ background: pkg.status ? 'rgba(39, 174, 96, 0.1)' : 'rgba(229, 62, 62, 0.1)', color: pkg.status ? '#27AE60' : '#E53E3E', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800 }}>
                      ● {pkg.status ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'left', fontWeight: 700, color: '#718096', fontSize: '0.85rem' }}>{pkg.addDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="global-pagination" style={{ padding: '25px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
            Showing 1 to {localPackages.length} of {localPackages.length} records
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronLeft /></button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', background: '#1756AA', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>1</div>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── ADD/EDIT MODAL (DRAWER STYLE) ── */}
      {isModalOpen && (
        <div className={styles.drawerOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()} style={{ width: '450px', maxWidth: '95%', background: '#fff' }}>
            <div className={styles.drawerHeader} style={{ padding: '20px 25px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                  <FiPackage size={18} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0F172A', fontWeight: 800 }}>{formData.id ? 'Edit Package' : 'Package Config'}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}>
                <FiX size={16} />
              </button>
            </div>
            
            <div className={styles.drawerBody} style={{ padding: '25px', overflowY: 'auto' }}>
              <form onSubmit={handleSave}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiUserCheck size={14}/> Select Role</label>
                    <select name="role" className={styles.inputControl} value={formData.role} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required>
                      <option value="">-- Select Role --</option>
                      <option value="Retailer">Retailer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Master">Master Distributor</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiPackage size={14}/> Package Name</label>
                    <input type="text" name="name" className={styles.inputControl} placeholder="e.g. Silver Pack" value={formData.name} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaRupeeSign size={12}/> Price</label>
                      <input type="number" name="price" className={styles.inputControl} value={formData.price} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiShield size={14}/> Capping</label>
                      <input type="number" name="capping" className={styles.inputControl} value={formData.capping} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiCopy size={14}/> Copy Slab From</label>
                    <select name="copySlab" className={styles.inputControl} value={formData.copySlab} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }}>
                      <option value="">No Slab</option>
                      <option value="Retailer">Retailer</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Package Status</label>
                    <div style={{ background: '#F8FAFC', padding: '12px 20px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: formData.status ? '#10B981' : '#E53E3E' }}>{formData.status ? 'ACTIVE' : 'INACTIVE'}</span>
                      <label className={styles.switch} style={{ transform: 'scale(0.8)' }}>
                        <input type="checkbox" checked={formData.status} onChange={(e) => setFormData({...formData, status: e.target.checked})} />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                  <button type="button" style={{ padding: '12px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', flex: 1 }} onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', border: 'none', color: '#fff', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flex: 1.5, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', transition: 'all 0.2s' }} disabled={isLoading}>
                    {isLoading ? <div className={styles.spinner} style={{ width: '18px', height: '18px', borderTopColor: '#fff' }}></div> : <>Save Package <FiCheck size={16} /></>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showConfirmModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3600 }}>
          <div className={styles.modalContainer} style={{ width: '380px', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', background: '#FFF5F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53E3E', marginBottom: '16px' }}>
                <FiTrash2 style={{ fontSize: '1.2rem' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Delete Package</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to delete this package? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button 
                  onClick={() => setShowConfirmModal({ isOpen: false, id: null })}
                  style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', color: '#4E6080', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  style={{ flex: 1, padding: '10px', background: '#E53E3E', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageManagement;
