import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiX, FiCheck, FiMail, FiPhone, FiUser, FiArrowLeft, FiImage, FiLink, FiDollarSign, FiGlobe, FiMapPin, FiBriefcase
} from 'react-icons/fi';
import {
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';
import { SITE_CONFIG } from '../../../config/siteConfig';

const ManageCompany = () => {
  const dispatch = useDispatch();
  const { companies = [] } = useSelector(state => state.settings || {});
  const [viewState, setViewState] = useState('table'); // 'table' or 'add'
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, id: null });

  const [localCompanies, setLocalCompanies] = useState([
    {
      id: 1,
      name: SITE_CONFIG.companyName,
      owner: SITE_CONFIG.ownerName,
      email: SITE_CONFIG.email,
      phone: SITE_CONFIG.phone,
      status: 'ACTIVE',
      addDate: '09/08/2022'
    }
  ]);

  const initialForm = {
    member: '', companyName: '', logo: '', signature: '', favicon: '', ownerName: '',
    email: '', alternateEmail: '', mobile: '', alternateMobile: '', websiteUrl: '', androidUrl: '',
    address: '', copyright: '', facebook: '', whatsapp: '', instagram: '', twitter: '', youtube: '',
    bankName: '', acName: '', acType: '', acNumber: '', ifsc: '', micrcode: '', profileAmount: '', map: '',
    headerColor: '#1756AA', bodyColor: '#F8FAFC', leftColor: '#0F172A'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleDelete = () => {
    setLocalCompanies(localCompanies.filter(c => c.id !== showConfirmModal.id));
    setShowConfirmModal({ isOpen: false, id: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0].name }));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Edit existing
      setLocalCompanies(localCompanies.map(c => c.id === formData.id ? {
        ...c,
        name: formData.companyName,
        owner: formData.ownerName,
        email: formData.email,
        phone: formData.mobile
      } : c));
    } else {
      // Add new
      const newId = localCompanies.length ? Math.max(...localCompanies.map(c => c.id)) + 1 : 1;
      const newComp = {
        id: newId,
        name: formData.companyName || 'New Company',
        owner: formData.ownerName || 'Unknown Owner',
        email: formData.email || 'N/A',
        phone: formData.mobile || 'N/A',
        status: 'ACTIVE',
        addDate: new Date().toLocaleDateString('en-GB')
      };
      setLocalCompanies([newComp, ...localCompanies]);
    }
    setViewState('table');
    setFormData(initialForm);
  };

  const handleEdit = (comp) => {
    setFormData({ 
      ...initialForm, 
      id: comp.id,
      companyName: comp.name, 
      ownerName: comp.owner, 
      email: comp.email, 
      mobile: comp.phone 
    });
    setViewState('add');
  };

  return (
    <div className={styles.container} style={{ padding: '15px 12px', maxWidth: '100%' }}>
      
      {/* ── TABLE VIEW ── */}
      {viewState === 'table' && (
        <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px', minHeight: '42px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Manage Companies</h3>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#1756AA',
              color: '#fff', border: 'none', borderRadius: '8px',
              padding: '6px 14px', fontSize: '0.85rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 10px rgba(23, 86, 170, 0.15)'
            }} onClick={() => {
              setFormData(initialForm);
              setViewState('add');
            }}>
              <FiPlus /> <span>Add New Company</span>
            </button>
          </div>

          <div className="global-table-toolbar" style={{ padding: '20px 25px', flexWrap: 'wrap', gap: '20px', borderBottom: 'none' }}>
            <div className={styles.pillRow} style={{ alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
              <select className={styles.selectEntries} style={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}>
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
                type="text"
                placeholder="Search by name..."
                style={{ borderRadius: '10px' }}
              />
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table} style={{ width: '100%', minWidth: '850px', tableLayout: 'auto' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                  <th style={{ width: '60px', color: '#FFFFFF' }}>S.NO</th>
                  <th style={{ width: '100px', textAlign: 'center', color: '#FFFFFF' }}>ACTION</th>
                  <th style={{ width: '120px', color: '#FFFFFF' }}>NAME</th>
                  <th style={{ width: 'auto', color: '#FFFFFF' }}>DESCRIPTION</th>
                  <th style={{ textAlign: 'left', width: '120px', color: '#FFFFFF' }}>STATUS</th>
                  <th style={{ textAlign: 'left', width: '150px', color: '#FFFFFF' }}>ADD DATE</th>
                </tr>
              </thead>
              <tbody>
                {localCompanies.map((comp, idx) => (
                  <tr key={comp.id} className={styles.hoverRow}>
                    <td style={{ fontWeight: 700, color: '#64748B' }}>{idx + 1}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <button className={styles.editBtn} style={{ width: '32px', height: '32px', background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', borderRadius: '8px', cursor: 'pointer' }} onClick={() => handleEdit(comp)} title="Edit"><FiEdit /></button>
                        <button className={styles.deleteBtn} style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer' }} title="Delete" onClick={() => setShowConfirmModal({ isOpen: true, id: comp.id })}><FiTrash2 /></button>
                      </div>
                    </td>
                    <td style={{ fontWeight: 800, color: '#334155' }}>Company</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span style={{ color: '#1D4ED8', fontWeight: 800, fontSize: '0.95rem' }}>{comp.name}</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: '#64748B' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser /> Owner: {comp.owner}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiMail /> {comp.email}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiPhone /> Call no: {comp.phone}
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <span style={{ background: '#ECFDF5', color: '#059669', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block' }}>
                        ● ACTIVE
                      </span>
                    </td>
                    <td style={{ textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '0.85rem' }}>{comp.addDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="global-pagination" style={{ padding: '20px 25px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
              Showing 1 to {localCompanies.length} of {localCompanies.length} records
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronLeft /></button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#1D4ED8', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>1</div>
              <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronRight /></button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD COMPANY VIEW ── */}
      {viewState === 'add' && (
        <div className={styles.cardFullMobile} style={{ margin: '8px 8px 15px 8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: '#fff', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => {
                setViewState('table');
                setFormData(initialForm);
              }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}>
                <FiArrowLeft size={14} />
              </button>
              <div style={{ transform: 'translateY(-1px)' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', lineHeight: '1' }}>
                  {formData.id ? 'Edit Company' : 'Add New Company'}
                </h3>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddSubmit} style={{ padding: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Section 1: Basic Information */}
              <div>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                    <FiBriefcase size={18} />
                  </div>
                  Basic Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Member</label>
                    <select name="member" value={formData.member} onChange={handleInputChange} className={styles.inputControl} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <option value="">-- Select Member --</option>
                      <option value="member1">Admin</option>
                      <option value="member2">Super Distributor</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company Name <span style={{color: '#EF4444'}}>*</span></label>
                    <input name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Enter company name" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Owner Name <span style={{color: '#EF4444'}}>*</span></label>
                    <input name="ownerName" value={formData.ownerName} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Enter owner name" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Address</label>
                    <input name="address" value={formData.address} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Enter full address" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                    <FiPhone size={18} />
                  </div>
                  Contact Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address <span style={{color: '#EF4444'}}>*</span></label>
                    <input name="email" value={formData.email} onChange={handleInputChange} type="email" className={styles.inputControl} placeholder="primary@email.com" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Alternate Email</label>
                    <input name="alternateEmail" value={formData.alternateEmail} onChange={handleInputChange} type="email" className={styles.inputControl} placeholder="alternate@email.com" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mobile Number <span style={{color: '#EF4444'}}>*</span></label>
                    <input name="mobile" value={formData.mobile} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="10-digit mobile number" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Alternate Mobile</label>
                    <input name="alternateMobile" value={formData.alternateMobile} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Alternate number" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>

              {/* Section 3: Web & Social Links */}
              <div>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>
                    <FiGlobe size={18} />
                  </div>
                  Web & Social Links
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Website URL</label>
                    <input name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} type="url" className={styles.inputControl} placeholder="https://www.example.com" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Android App URL</label>
                    <input name="androidUrl" value={formData.androidUrl} onChange={handleInputChange} type="url" className={styles.inputControl} placeholder="Play store link" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Facebook</label>
                    <input name="facebook" value={formData.facebook} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Facebook profile link" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WhatsApp</label>
                    <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="WhatsApp number" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instagram</label>
                    <input name="instagram" value={formData.instagram} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Instagram handle" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Twitter</label>
                    <input name="twitter" value={formData.twitter} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Twitter handle" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>YouTube</label>
                    <input name="youtube" value={formData.youtube} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="YouTube channel link" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Copyright Text</label>
                    <input name="copyright" value={formData.copyright} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="© 2026 Company Name" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>

              {/* Section 4: Bank Details */}
              <div>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                    <FiDollarSign size={18} />
                  </div>
                  Banking & Accounts
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bank Name</label>
                    <input name="bankName" value={formData.bankName} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Bank Name" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account Name</label>
                    <input name="acName" value={formData.acName} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="Account Holder Name" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account Type</label>
                    <select name="acType" value={formData.acType} onChange={handleInputChange} className={styles.inputControl} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <option value="">-- Select Type --</option>
                      <option value="Current">Current</option>
                      <option value="Savings">Savings</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account Number</label>
                    <input name="acNumber" value={formData.acNumber} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="A/C Number" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>IFSC Code</label>
                    <input name="ifsc" value={formData.ifsc} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="IFSC Code" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MICR Code</label>
                    <input name="micrcode" value={formData.micrcode} onChange={handleInputChange} type="text" className={styles.inputControl} placeholder="MICR Code" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>

              {/* Section 5: Media & Theme */}
              <div>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899' }}>
                    <FiImage size={18} />
                  </div>
                  Media & Branding
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logo</label>
                    <input name="logo" onChange={handleFileChange} type="file" className={styles.inputControl} style={{ borderRadius: '10px', padding: '10px', border: '1px dashed #CBD5E1', background: '#F8FAFC', color: '#475569', fontSize: '0.85rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Signature</label>
                    <input name="signature" onChange={handleFileChange} type="file" className={styles.inputControl} style={{ borderRadius: '10px', padding: '10px', border: '1px dashed #CBD5E1', background: '#F8FAFC', color: '#475569', fontSize: '0.85rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Favicon</label>
                    <input name="favicon" onChange={handleFileChange} type="file" className={styles.inputControl} style={{ borderRadius: '10px', padding: '10px', border: '1px dashed #CBD5E1', background: '#F8FAFC', color: '#475569', fontSize: '0.85rem' }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Profile Amount</label>
                    <input name="profileAmount" value={formData.profileAmount} onChange={handleInputChange} type="number" className={styles.inputControl} placeholder="0" style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                  </div>
                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Map Embed Code</label>
                    <textarea name="map" value={formData.map} onChange={handleInputChange} className={styles.inputControl} placeholder="<iframe>...</iframe>" style={{ borderRadius: '10px', padding: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem', minHeight: '100px', resize: 'vertical' }} />
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #E2E8F0' }}>
                  <label className={styles.label} style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '15px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Theme Colors</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #E2E8F0', overflow: 'hidden', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                        <input name="headerColor" value={formData.headerColor} onChange={handleInputChange} type="color" style={{ position: 'absolute', top: '-10px', left: '-10px', width: '60px', height: '60px', border: 'none', cursor: 'pointer', padding: 0 }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Header</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #E2E8F0', overflow: 'hidden', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                        <input name="bodyColor" value={formData.bodyColor} onChange={handleInputChange} type="color" style={{ position: 'absolute', top: '-10px', left: '-10px', width: '60px', height: '60px', border: 'none', cursor: 'pointer', padding: 0 }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Body</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #E2E8F0', overflow: 'hidden', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                        <input name="leftColor" value={formData.leftColor} onChange={handleInputChange} type="color" style={{ position: 'absolute', top: '-10px', left: '-10px', width: '60px', height: '60px', border: 'none', cursor: 'pointer', padding: 0 }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Sidebar</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px', padding: '20px 0 0 0', borderTop: '1px solid #F1F5F9' }}>
              <button type="button" onClick={() => setViewState('table')} style={{ padding: '10px 24px', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                Cancel
              </button>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 28px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s' }}>
                <FiCheck /> Save Company
              </button>
            </div>
          </form>
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
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Delete Company</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to delete this company? This action cannot be undone.
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

export default ManageCompany;
