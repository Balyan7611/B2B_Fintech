import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiDatabase, FiX, FiCheck, FiCheckCircle, FiLayout, FiMaximize, FiLayers
} from 'react-icons/fi';
import { 
  FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint 
} from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const allServicesList = [
  "Recharge", "MOBILE POSTPAID", "DTH", "Electricity", "Water", "GAS", 
  "LPG Gas", "Insurance", "Internet", "Landline Postpaid", "EMI", "FasTag",
  "Education", "Cable Tv", "Municipal Tax", "AEPS", "Aadhar Pay", "Payment Gateway",
  "Scan & Pay", "NSDL PAN", "mATM", "Settlement", "Fund Transfer", "My Services",
  "MATM OnBoard", "Credit Card", "Money Transfer", "Broadband", "DataCard", "BroadBand",
  "Digital Voucher", "Prepaid DataCard", "Metro", "Prebooking", "WiFi", "E-Challan",
  "Broadband Postpaid", "Pay Credit Card Bills", "Account Verification", "DMT PPI", "Account Opening", "Loan",
  "Mobile Prepaid", "Donation", "Health Insurance", "Housing Society", "Life Insurance", "Loan Repay",
  "Muncipal Service", "Recurring Deposit", "Clubs Association", "Rental", "Subscription", "NPMC",
  "NPS", "Prepaid Meter", "Neeraj Bar"
];

const DesignService = () => {
  const dispatch = useDispatch();
  const { designs = [] } = useSelector(state => state.settings || {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '', boxColor: '#ffffff', textColor: '#333333', serviceType: 'Service', bannerImage: null
  });
  
  const [selectedServices, setSelectedServices] = useState({});

  const [designsList, setDesignsList] = useState([
    { id: 1, name: '!! Bharat Connect !!', service: ',1,2,3,4,5,6,7,8,10,12,13,14,15,38,47,1070', position: 4, status: true },
    { id: 2, name: '!! BANKING SERVICES !!', service: ',17,18,19,20,21,22,23,28,31,33,36,37,57,1062', position: 3, status: false },
    { id: 3, name: 'Insurnace', service: ',8,28', position: 5, status: true },
    { id: 4, name: 'Recharge & BC Services', service: ',1067', position: 2, status: true },
    { id: 5, name: 'Banner', service: ',18', position: 1, status: true },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleService = (srv) => {
    setSelectedServices(prev => ({ ...prev, [srv]: !prev[srv] }));
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setDesignsList(prev => prev.filter(d => d.id !== deleteId));
    setShowDeleteModal(false);
  };

  const handleToggleStatus = (id) => {
    setDesignsList(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  const handleEdit = (design) => {
    setFormData({
      name: design.name, 
      boxColor: '#ffffff', 
      textColor: '#333333', 
      serviceType: design.name === 'Banner' ? 'Banner' : 'Service', 
      bannerImage: null
    });
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container} style={{ padding: '20px', maxWidth: '100%', background: '#F4F7FE', minHeight: '100vh' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ marginTop: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Design Service</h3>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
            color: '#fff', border: 'none', borderRadius: '8px', 
            padding: '10px 18px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }} onClick={() => setIsModalOpen(true)}>
            <FiPlus /> <span>New Design Service</span>
          </button>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="global-table-toolbar" style={{ padding: '15px 20px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>Show</span>
            <select className={styles.selectEntries} style={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>entries</span>
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
              placeholder="Search services..." 
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ width: '100%', minWidth: '950px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '60px' }}>S.NO</th>
                <th style={{ width: '120px', textAlign: 'center' }}>ACTION</th>
                <th style={{ width: '250px' }}>NAME</th>
                <th style={{ width: '400px', textAlign: 'left' }}>SERVICE</th>
                <th style={{ width: '100px', textAlign: 'center' }}>POSITION</th>
              </tr>
            </thead>
            <tbody>
              {designsList.map((design, idx) => (
                <tr key={design.id} className={styles.hoverRow} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ fontWeight: 700, color: '#A0AEC0' }}>{idx + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                     <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                        <button onClick={() => confirmDelete(design.id)} style={{ background: '#FFF5F5', border: '1px solid #FED7D7', color: '#EF4444', fontSize: '1rem', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete"><FiTrash2 /></button>
                        <label className={styles.switch} style={{ transform: 'scale(0.8)', margin: 0 }}>
                          <input type="checkbox" checked={design.status} onChange={() => handleToggleStatus(design.id)} />
                          <span className={styles.slider}></span>
                        </label>
                        <button onClick={() => handleEdit(design)} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#3B82F6', fontSize: '1rem', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit"><FiEdit /></button>
                     </div>
                  </td>
                  <td>
                    <span style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 600 }}>{design.name}</span>
                  </td>
                  <td style={{ textAlign: 'left' }}>
                     <div style={{ color: '#475569', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '350px' }}>
                       {design.service}
                     </div>
                  </td>
                  <td style={{ textAlign: 'center', color: '#0F172A', fontWeight: 700, fontSize: '0.9rem' }}>{design.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="global-pagination" style={{ padding: '20px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
            Showing 1 to 2 of 2 records
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronLeft /></button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', background: '#3B82F6', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>1</div>
            <button className="global-page-btn" disabled style={{ borderRadius: '8px' }}><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ── ADD MODAL (PREMIUM FULL-PAGE DRAWER) ── */}
      {isModalOpen && (
        <div className={styles.drawerOverlay} onClick={() => setIsModalOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()} style={{ width: '1100px', maxWidth: '100%', maxHeight: '90vh', background: '#fff', borderRadius: '20px', transform: 'none', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            
            {/* Header */}
            <div style={{ padding: '12px 25px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: '20px 20px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiLayout size={18} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Create Service Section</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>
                <FiX size={16} />
              </button>
            </div>
            
            {/* Body */}
            <div style={{ padding: '30px', overflowY: 'auto', flex: 1, background: '#F8FAFC' }}>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9' }}>
                
                {/* Top Form Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name</label>
                    <input type="text" placeholder="Enter service name" style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.95rem', background: '#F8FAFC', color: '#0F172A', outline: 'none' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Box Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <input type="color" value={formData.boxColor} onChange={e => setFormData({...formData, boxColor: e.target.value})} style={{ width: '30px', height: '30px', padding: 0, border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                      <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>{formData.boxColor}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Text Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <input type="color" value={formData.textColor} onChange={e => setFormData({...formData, textColor: e.target.value})} style={{ width: '30px', height: '30px', padding: 0, border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                      <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>{formData.textColor}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Type</label>
                    <select style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.95rem', background: '#F8FAFC', color: '#0F172A', outline: 'none', cursor: 'pointer' }} value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                      <option value="Service">Service</option>
                      <option value="Banner">Banner</option>
                    </select>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '20px 0' }} />

                {formData.serviceType === 'Banner' ? (
                  <div style={{ display: 'flex', gap: '30px', background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Upload Banner Image</h4>
                      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '150px', border: '2px dashed #CBD5E1', borderRadius: '10px', background: '#fff', cursor: 'pointer' }}>
                        <FiPlus size={24} color="#64748B" style={{ marginBottom: '10px' }} />
                        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>Click to browse image</span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            setFormData({...formData, bannerImage: url});
                          }
                        }} />
                      </label>
                    </div>
                    {formData.bannerImage && (
                      <div style={{ width: '250px' }}>
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Banner Preview</h4>
                        <div style={{ width: '100%', height: '150px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                          <img src={formData.bannerImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Services Checkbox Grid */}
                    <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Assign Services</h4>
                      <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, background: '#F1F5F9', padding: '4px 12px', borderRadius: '20px' }}>
                        {Object.values(selectedServices).filter(Boolean).length} Selected
                      </span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                      {allServicesList.map((srv, index) => (
                        <label key={index} style={{ 
                          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', 
                          background: selectedServices[srv] ? 'rgba(59, 130, 246, 0.05)' : '#fff', 
                          border: selectedServices[srv] ? '1px solid #3B82F6' : '1px solid #E2E8F0', 
                          borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
                          boxShadow: selectedServices[srv] ? '0 4px 10px rgba(59, 130, 246, 0.1)' : 'none'
                        }}>
                          <div style={{ 
                            width: '20px', height: '20px', borderRadius: '6px', 
                            border: selectedServices[srv] ? 'none' : '2px solid #CBD5E1', 
                            background: selectedServices[srv] ? '#3B82F6' : 'transparent', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center' 
                          }}>
                            {selectedServices[srv] && <FiCheck size={14} color="#fff" />}
                          </div>
                          <input type="checkbox" checked={!!selectedServices[srv]} onChange={() => toggleService(srv)} style={{ display: 'none' }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: selectedServices[srv] ? 700 : 600, color: selectedServices[srv] ? '#1E293B' : '#475569' }}>
                            {srv}
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '15px 25px', borderTop: '1px solid #F1F5F9', background: '#fff', borderRadius: '0 0 20px 20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', background: '#F1F5F9', color: '#475569', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 25px', borderRadius: '8px', background: '#3B82F6', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiCheckCircle size={16} /> Assign Section
              </button>
            </div>
          </div>
        </div>
      )}
            
      {/* ── DELETE CONFIRMATION MODAL ── */}
      {showDeleteModal && (
        <div className={styles.drawerOverlay} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', width: '360px', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#FEF2F2', color: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <FiTrash2 size={28} />
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.15rem', color: '#0F172A', fontWeight: 800 }}>Confirm Deletion</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '0.9rem', color: '#64748B', lineHeight: '1.5' }}>
              Are you sure you want to delete this design layout? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: '10px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '10px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DesignService;
