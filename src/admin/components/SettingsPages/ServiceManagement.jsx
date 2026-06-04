import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader, setNotification } from '../../../store/slices/uiSlice';
import { API } from '../../../api/endpoints';
import {
  FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiDatabase, FiX, FiCheck, FiSettings, FiActivity, FiLayers, FiImage
} from 'react-icons/fi';
import { FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint } from 'react-icons/fa';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import styles from '../MemberPages/MemberPages.module.css';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { services = [] } = useSelector(state => state.settings || {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, id: null });
  const [isLoading, setIsLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState({ isOpen: false, imageUrl: null });

  const [localServices, setLocalServices] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await API.service.getAll();
      if (res && res.status === true && Array.isArray(res.data)) {
        setLocalServices(res.data.map(item => ({
          id: item.id,
          name: item.name,
          apiName: item.apiName || 'SoniTechno',
          url: item.url || '',
          sectionType: item.sectionType || 'Utility',
          price: item.price !== undefined && item.price !== null ? parseFloat(item.price).toFixed(2) : '0.00',
          status: item.isActive,
          onOff: item.onoff || item.isActive,
          position: item.orderBy || item.position || 0,
          image: item.image || '',
          ...item
        })));
        setErrorMsg('');
      } else {
        setErrorMsg('Failed to fetch services from API.');
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setErrorMsg('Failed to connect to the service API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const [formData, setFormData] = useState({
    id: '', name: '', url: '', price: '0', image: '', sectionType: '', api: '',
    status: true, isNew: false, commingSoon: false, onOff: true,
    txtReason: '0', onTime: '0', offTime: '0',
    gstApply: false, gstType: '+ GST', tdsApply: false, tdsVal: '0'
  });

  const handleDelete = () => {
    // Delete service not present in OpenAPI, fallback to local toggle
    setLocalServices(localServices.filter(s => s.id !== showConfirmModal.id));
    setShowConfirmModal({ isOpen: false, id: null });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddClick = () => {
    setFormData({
      id: '', name: '', url: '', price: '0', image: '', sectionType: '', api: '',
      status: true, isNew: false, commingSoon: false, onOff: true,
      txtReason: '0', onTime: '0', offTime: '0',
      gstApply: false, gstType: '+ GST', tdsApply: false, tdsVal: '0'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setFormData({ ...formData, ...service });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(showLoader());
    
    setTimeout(() => {
      if (formData.id) {
        setLocalServices(localServices.map(s => s.id === formData.id ? { ...s, ...formData } : s));
      } else {
        const newService = {
          ...formData,
          id: Date.now(),
          category: formData.sectionType || 'General',
          addDate: new Date().toLocaleDateString('en-GB')
        };
        setLocalServices([newService, ...localServices]);
      }
      dispatch(hideLoader());
      dispatch(setNotification({
        type: 'success',
        message: formData.id ? 'Service updated successfully!' : 'Service created successfully!'
      }));
      setIsModalOpen(false);
    }, 800);
  };

  return (
    <div className={styles.container} style={{ padding: '5px 2px 60px 2px', maxWidth: '100%' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ margin: '8px 8px 60px 8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: '#fff', borderRadius: '16px' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'nowrap', gap: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Service Management</h3>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#fff', border: 'none', borderRadius: '8px',
            padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s'
          }} onClick={handleAddClick}>
            <FiPlus size={16} /> <span>Add New Service</span>
          </button>
        </div>

        {errorMsg && (
          <div style={{ margin: '15px 20px 0 20px', padding: '12px 16px', background: '#FFF5F5', color: '#E53E3E', borderRadius: '8px', border: '1px solid #FEB2B2', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <span>⚠️</span> {errorMsg}
          </div>
        )}

        {/* ── TOOLBAR ── */}
        <div className="global-table-toolbar" style={{ padding: '10px 15px', flexWrap: 'wrap', gap: '15px', borderBottom: 'none' }}>
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries} style={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>entries</span>
          </div>

          <ExportButtons 
            headers={['Service Name', 'API Name', 'Service URL', 'SectionType', 'Price', 'Position']}
            rows={localServices.map((service) => [
              service.name, service.apiName, service.url, service.sectionType, service.price, service.position
            ])}
            fileNamePrefix="service_report"
            sheetName="Services"
          />

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
          <table className={styles.table} style={{ width: '100%', minWidth: '1300px', tableLayout: 'auto' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0D1B5E 0%, #1a2f8a 100%)' }}>
                <th style={{ width: '100px', textAlign: 'center' }}>Active/DeActive</th>
                <th style={{ width: '80px', textAlign: 'center' }}>On/Off</th>
                <th style={{ width: '60px', textAlign: 'center' }}>Edit</th>
                <th style={{ width: '180px', textAlign: 'left' }}>Service Name</th>
                <th style={{ width: '120px', textAlign: 'left' }}>API Name</th>
                <th style={{ width: '250px', textAlign: 'left' }}>Service URL</th>
                <th style={{ width: '100px', textAlign: 'left' }}>SectionType</th>
                <th style={{ width: '100px', textAlign: 'left' }}>Price</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Image</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Position</th>
              </tr>
            </thead>
            <tbody>
              {localServices.map((service, idx) => (
                <tr key={service.id} className={styles.hoverRow}>
                  <td style={{ textAlign: 'center' }}>
                    <label className={styles.switch} style={{ transform: 'scale(0.8)', margin: 0 }}>
                      <input type="checkbox" checked={service.status} readOnly />
                      <span className={styles.slider}></span>
                    </label>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <label className={styles.switch} style={{ transform: 'scale(0.8)', margin: 0 }}>
                      <input type="checkbox" checked={service.onOff} readOnly />
                      <span className={styles.slider}></span>
                    </label>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button className={styles.editBtn} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F8FAFC', color: '#3B82F6', border: '1px solid #E2E8F0', cursor: 'pointer' }} onClick={() => handleEdit(service)} title="Edit Service"><FiEdit /></button>
                    </div>
                  </td>
                  <td style={{ textAlign: 'left', fontWeight: 600, color: '#4E6080' }}>
                    {service.name}
                  </td>
                  <td style={{ textAlign: 'left', color: '#4E6080' }}>
                    {service.apiName}
                  </td>
                  <td style={{ textAlign: 'left', color: '#4E6080', wordBreak: 'break-all' }}>
                    {service.url}
                  </td>
                  <td style={{ textAlign: 'left', color: '#4E6080' }}>
                    {service.sectionType}
                  </td>
                  <td style={{ textAlign: 'left', color: '#4E6080' }}>
                    {service.price}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div
                      onClick={() => setShowImageModal({ isOpen: true, imageUrl: service.image })}
                      style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', margin: '0 auto', cursor: 'pointer', transition: 'all 0.2s' }}
                      title="View Image"
                    >
                      <FiImage size={20} />
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#4E6080' }}>
                    {service.position}
                  </td>
                </tr>
              ))}
              {isLoading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '30px 0', color: '#64748B' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Loading data...</span>
                  </td>
                </tr>
              ) : localServices.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '30px 0', color: '#64748B' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FiDatabase style={{ fontSize: '1.5rem', opacity: 0.3 }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>No data available in table</span>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="global-pagination" style={{ padding: '25px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
            Showing 1 to {localServices.length} of {localServices.length} records
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
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()} style={{ width: '850px', maxWidth: '95%', background: '#fff' }}>
            <div className={styles.drawerHeader} style={{ padding: '20px 25px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                  <FiLayers size={18} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0F172A', fontWeight: 800 }}>{formData.id ? 'Service Details Update' : 'Service Details'}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}>
                <FiX size={16} />
              </button>
            </div>

            <div className={styles.drawerBody} style={{ padding: '25px', overflowY: 'auto' }}>
              <form onSubmit={handleSave}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* ROW 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ServiceName</label>
                      <input type="text" name="name" className={styles.inputControl} value={formData.name} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service URL</label>
                      <input type="text" name="url" className={styles.inputControl} value={formData.url} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</label>
                      <input type="number" name="price" className={styles.inputControl} value={formData.price} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                  </div>

                  {/* ROW 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Image</label>
                      <input type="file" name="image" className={styles.inputControl} style={{ borderRadius: '10px', padding: '8px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SectionType</label>
                      <select name="sectionType" className={styles.inputControl} value={formData.sectionType} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }}>
                        <option value="">Select SectionType</option>
                        <option value="Utility">Utility</option>
                        <option value="Banking">Banking</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>API</label>
                      <select name="api" className={styles.inputControl} value={formData.api} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }}>
                        <option value="">-- Select API --</option>
                        <option value="Eko">Eko</option>
                        <option value="PaySprint">PaySprint</option>
                      </select>
                    </div>
                  </div>

                  {/* ROW 3 (Checkboxes) */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', height: '42px' }}>
                        <input type="checkbox" name="status" checked={formData.status} onChange={handleInputChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>New</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', height: '42px' }}>
                        <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleInputChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Comming Soon</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', height: '42px' }}>
                        <input type="checkbox" name="commingSoon" checked={formData.commingSoon} onChange={handleInputChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>OnOff Service</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', height: '42px' }}>
                        <input type="checkbox" name="onOff" checked={formData.onOff} onChange={handleInputChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      </div>
                    </div>
                  </div>

                  {/* ROW 4 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>txtReason</label>
                      <input type="text" name="txtReason" className={styles.inputControl} value={formData.txtReason} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>OnTime</label>
                      <input type="number" name="onTime" className={styles.inputControl} value={formData.onTime} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>OffTime</label>
                      <input type="number" name="offTime" className={styles.inputControl} value={formData.offTime} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                  </div>

                  {/* ROW 5 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GST Apply Or Not</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', height: '42px' }}>
                        <input type="checkbox" name="gstApply" checked={formData.gstApply} onChange={handleInputChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GST</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '15px', height: '42px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}>
                          <input type="radio" name="gstType" value="+ GST" checked={formData.gstType === '+ GST'} onChange={handleInputChange} /> + GST
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}>
                          <input type="radio" name="gstType" value="- GST" checked={formData.gstType === '- GST'} onChange={handleInputChange} /> - GST
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TDS Apply Or Not</label>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', height: '42px' }}>
                        <input type="checkbox" name="tdsApply" checked={formData.tdsApply} onChange={handleInputChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TDS Val</label>
                      <input type="number" name="tdsVal" className={styles.inputControl} value={formData.tdsVal} onChange={handleInputChange} style={{ borderRadius: '10px', padding: '10px 14px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                  <button type="submit" style={{ padding: '12px 30px', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', border: 'none', color: '#fff', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', transition: 'all 0.2s' }}>
                    Submit
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
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Delete Service</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                Are you sure you want to delete this service? This action cannot be undone.
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

      {/* IMAGE PREVIEW MODAL */}
      {showImageModal.isOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 3600 }} onClick={() => setShowImageModal({ isOpen: false, imageUrl: null })}>
          <div className={styles.modalContainer} style={{ width: '400px', borderRadius: '16px', padding: '20px', textAlign: 'center', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowImageModal({ isOpen: false, imageUrl: null })}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4E6080' }}
            >
              <FiX />
            </button>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#0D1B3E' }}>Service Image</h3>

            {showImageModal.imageUrl ? (
              <div style={{ width: '100%', height: '250px', borderRadius: '12px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={showImageModal.imageUrl} alt="Service" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            ) : (
              <div style={{ width: '100%', height: '200px', borderRadius: '12px', background: '#F8FAFC', border: '2px dashed #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                <FiImage style={{ fontSize: '3rem', marginBottom: '10px', opacity: 0.5 }} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>No Image Available</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
