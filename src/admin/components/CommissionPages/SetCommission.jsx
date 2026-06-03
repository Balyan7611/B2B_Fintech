import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaCheckCircle, FaTimesCircle, FaSearch, FaCopy, FaFileExcel, FaFilePdf, FaFileCsv, FaPrint, FaChevronLeft, FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { updateFormField, updateSlabField, addCommission, setFormData, updateCommission, toggleCommissionStatus, deleteCommission } from '../../../store/slices/commissionSlice';
import styles from './Commission.module.css';

const SLABS = [
  { key: 'slabCharges', title: 'Slab Charges' },
  { key: 'retailer', title: 'Retailer' },
  { key: 'distributer', title: 'Distributer' },
  { key: 'superDistributer', title: 'SuperDistributer' },
  { key: 'client', title: 'Client' },
];

const SetCommission = () => {
  const dispatch = useDispatch();
  const { form, list } = useSelector(state => state.commission);

  const packageRef = useRef(null);
  const serviceRef = useRef(null);
  const operatorRef = useRef(null);
  const topFormRef = useRef(null);

  const [errors, setErrors] = useState({ package: false, service: false, operator: false });
  const [editingId, setEditingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', id: null, title: '', desc: '' });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ name, value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSlabChange = (slabKey, field, value) => {
    dispatch(updateSlabField({ slabName: slabKey, field, value }));
  };

  const handleSubmit = () => {
    const newErrors = {
      package: !form.package,
      service: !form.service,
      operator: !form.operator
    };
    setErrors(newErrors);

    if (newErrors.package) {
      packageRef.current?.focus();
      return;
    }
    if (newErrors.service) {
      serviceRef.current?.focus();
      return;
    }
    if (newErrors.operator) {
      operatorRef.current?.focus();
      return;
    }
    
    if (editingId) {
      dispatch(updateCommission(editingId));
      setEditingId(null);
    } else {
      dispatch(addCommission());
    }
    setErrors({ package: false, service: false, operator: false });
  };

  const handleEdit = (item) => {
    topFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setEditingId(item.id);
    const formData = {
      package: item.package,
      service: item.service,
      operator: item.operator,
      startValue: item.startValue,
      endValue: item.endValue,
      details: item.details || '',
      slabs: item.slabs
    };
    dispatch(setFormData(formData));
  };

  const cancelEdit = () => {
    setEditingId(null);
    dispatch(setFormData({
        package: '',
        service: '',
        operator: '',
        startValue: 0,
        endValue: 0,
        details: '',
        slabs: {
          slabCharges: { general: 0, amountType: 'COM', valueType: 'PER' },
          retailer: { general: 0, amountType: 'COM', valueType: 'PER' },
          distributer: { general: 0, amountType: 'COM', valueType: 'PER' },
          superDistributer: { general: 0, amountType: 'COM', valueType: 'PER' },
          client: { general: 0, amountType: 'COM', valueType: 'PER' }
        }
    }));
  };

  const handleConfirmAction = () => {
    if (confirmModal.type === 'toggle') {
      dispatch(toggleCommissionStatus(confirmModal.id));
    } else if (confirmModal.type === 'delete') {
      dispatch(deleteCommission(confirmModal.id));
    }
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  return (
    <div className={styles.container} ref={topFormRef}>
      {/* ── FORM CARD ── */}
      <div className={styles.card} style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1.5px solid #F8FAFF' }}>
          <div className={styles.directoryTitleGroup}>
            <h2 className={styles.directoryTitle} style={{ fontSize: '1.2rem' }}>Commission Range</h2>
            <p className={styles.directorySubtitle} style={{ fontSize: '0.75rem' }}>Configure network-wide commission slabs</p>
          </div>
        </div>
        
        {/* SECTION 1 */}
        <div className={styles.formGridFive}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Package <span style={{color: '#EF4444'}}>*</span></label>
            <select ref={packageRef} name="package" className={styles.inputControl} value={form.package} onChange={handleFormChange}>
              <option value="">Select Package</option>
              <option value="Base Package">Base Package</option>
              <option value="Premium Package">Premium Package</option>
            </select>
            {errors.package && <span className={styles.errorText}><FaExclamationCircle /> Package is required</span>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Service <span style={{color: '#EF4444'}}>*</span></label>
            <select ref={serviceRef} name="service" className={styles.inputControl} value={form.service} onChange={handleFormChange}>
              <option value="">Select Service</option>
              <option value="AEPS">AEPS</option>
              <option value="DMT">DMT</option>
              <option value="Recharge">Recharge</option>
            </select>
            {errors.service && <span className={styles.errorText}><FaExclamationCircle /> Service is required</span>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Operator <span style={{color: '#EF4444'}}>*</span></label>
            <select ref={operatorRef} name="operator" className={styles.inputControl} value={form.operator} onChange={handleFormChange}>
              <option value="">Select Operator</option>
              <option value="Jio">Jio</option>
              <option value="Airtel">Airtel</option>
              <option value="Yes Bank">Yes Bank</option>
            </select>
            {errors.operator && <span className={styles.errorText}><FaExclamationCircle /> Operator is required</span>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Value</label>
            <input type="number" name="startValue" className={styles.inputControl} value={form.startValue} onChange={handleFormChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>End Value</label>
            <input type="number" name="endValue" className={styles.inputControl} value={form.endValue} onChange={handleFormChange} />
          </div>
        </div>

        {/* SECTION 2: SLABS */}
        <div className={styles.slabsScrollContainer}>
          <div className={styles.slabsWrapper}>
            {SLABS.map(slab => (
              <div key={slab.key} className={styles.slabCol}>
                <h4 className={styles.slabColTitle}>{slab.title}</h4>
                <div className={styles.slabGeneralRow}>
                  <span>General</span>
                  <input 
                    type="number" 
                    className={styles.inputControl} 
                    style={{ padding: '8px 12px', flex: 1 }} 
                    value={form.slabs[slab.key].general}
                    onChange={(e) => handleSlabChange(slab.key, 'general', e.target.value)}
                  />
                </div>
                <div className={styles.pillGroupWrapper}>
                  <div className={styles.pillGroup}>
                    {['COM', 'SUR'].map(t => (
                      <button 
                        key={t}
                        className={`${styles.pillBtn} ${form.slabs[slab.key].amountType === t ? styles.pillBtnActiveCOM : ''}`}
                        onClick={() => handleSlabChange(slab.key, 'amountType', t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className={styles.pillGroup}>
                    {['PER', 'FIX'].map(t => (
                      <button 
                        key={t}
                        className={`${styles.pillBtn} ${form.slabs[slab.key].valueType === t ? styles.pillBtnActivePER : ''}`}
                        onClick={() => handleSlabChange(slab.key, 'valueType', t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: DETAILS */}
        <div className={styles.detailRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} style={{ fontSize: '1rem', color: '#0D1B3E' }}>Commission/Surcharge Details</label>
            <input 
              type="text" 
              name="details" 
              className={styles.inputControl} 
              placeholder="Enter specific details or notes"
              value={form.details}
              onChange={handleFormChange}
            />
          </div>
          {editingId && (
            <button className={styles.cancelUpdateBtn} onClick={cancelEdit}>
              Cancel
            </button>
          )}
          <button className={styles.saveBtn} onClick={handleSubmit}>
            <FaCheckCircle /> {editingId ? "Update Commission" : "All Save"}
          </button>
        </div>
      </div>

      {/* ── TABLE CARD ── */}
      <div className={styles.card}>
        <div className="global-table-toolbar">
          <div className={styles.pillRow} style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#4E6080', fontWeight: 600 }}>Show</span>
            <select className={styles.selectEntries}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
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
            <FaSearch />
            <input type="text" placeholder="Search range..." />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.tableFull} style={{ minWidth: '1200px' }}>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>DETAILS</th>
                <th>SLAB CHARGES</th>
                <th>RETAILER</th>
                <th>DISTRIBUTER</th>
                <th>SUPERDISTRIBUTER</th>
                <th>CLIENT</th>
                <th>UPDATE</th>
                <th>ACTIVE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? list.map((item, i) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 700, color: '#A0AEC0' }}>{i + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0D1B3E' }}>{item.operator}</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>{item.startValue} - {item.endValue}</div>
                  </td>
                  {SLABS.map(slab => (
                    <td key={slab.key}>
                      <span style={{ fontWeight: 600 }}>{item.slabs[slab.key].general}</span>
                      <span style={{ fontSize: '0.75rem', color: '#718096', marginLeft: '6px' }}>({item.slabs[slab.key].amountType} - {item.slabs[slab.key].valueType})</span>
                    </td>
                  ))}
                  <td>
                    <button className={styles.pillBlue} onClick={() => handleEdit(item)}>Update</button>
                  </td>
                  <td>
                    <button 
                      className={`${styles.toggleStatus} ${!item.isActive ? styles.inactive : ''}`}
                      onClick={() => setConfirmModal({ isOpen: true, type: 'toggle', id: item.id, title: item.isActive ? 'Deactivate Status' : 'Activate Status', desc: `Are you sure you want to ${item.isActive ? 'deactivate' : 'activate'} this commission?` })}
                    >
                      {item.isActive ? 'Active' : 'Deactive'}
                    </button>
                  </td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => setConfirmModal({ isOpen: true, type: 'delete', id: item.id, title: 'Delete Commission', desc: 'Are you sure you want to delete this commission? This action cannot be undone.' })}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className={styles.emptyState}>
                    No commission ranges set up yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* ── PAGINATION ── */}
        <div className="global-pagination">
          <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>
            Showing 1 to {list.length} of {list.length} entries
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="global-page-btn">
              <FaChevronLeft />
            </button>
            <span className="global-page-btn global-page-active">1</span>
            <button className="global-page-btn">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {confirmModal.isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <h3 className={styles.modalTitle}>{confirmModal.title}</h3>
            <p className={styles.modalDesc}>{confirmModal.desc}</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}>Cancel</button>
              <button className={`${styles.confirmBtn} ${confirmModal.type === 'delete' ? styles.danger : ''}`} onClick={handleConfirmAction}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetCommission;
