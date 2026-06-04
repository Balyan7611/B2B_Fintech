import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleBankActive } from '../../../store/slices/balanceSlice';
import { 
  FaEdit, FaSearch, FaFileExcel, FaFilePdf, FaPrint, FaCopy, FaFileCsv,
  FaChevronLeft, FaChevronRight, FaPlus, FaTimes 
} from 'react-icons/fa';
import { FiDatabase } from 'react-icons/fi';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import styles from './CompanyBank.module.css';

const CompanyBank = () => {
  const dispatch = useDispatch();
  const { companyBankList } = useSelector((s) => s.balance);
  const [activeTab, setActiveTab] = useState('BANK');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // Handle Open Modal (Add)
  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditData(null);
    setShowModal(true);
  };

  // Handle Open Modal (Edit)
  const handleEdit = (bank) => {
    setIsEditing(true);
    setEditData(bank);
    setShowModal(true);
  };

  // Filter Data
  const filteredData = companyBankList.filter(item => 
    item.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={styles.container}>
      
      {/* ── MODAL POPUP ── */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{isEditing ? 'Edit Bank Details' : 'Company Bank Details'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>IFSC Code</label>
                  <input 
                    type="text" 
                    className={styles.inputControl} 
                    placeholder="Enter IFSC" 
                    defaultValue={editData?.ifsc || ''}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Bank Name</label>
                  <select className={styles.inputControl} defaultValue={editData?.bankName || ''}>
                    <option value="">Select Bank Name</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Account Holder</label>
                  <input 
                    type="text" 
                    className={styles.inputControl} 
                    placeholder="Holder Name" 
                    defaultValue={editData?.accountHolder || ''}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Account Number</label>
                  <input 
                    type="text" 
                    className={styles.inputControl} 
                    placeholder="Account No" 
                    defaultValue={editData?.accountNumber || ''}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Billing Info</label>
                  <input 
                    type="text" 
                    className={styles.inputControl} 
                    placeholder="Billing detail" 
                    defaultValue={editData?.billingInfo || ''}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Cash Deposit Charge</label>
                  <input 
                    type="text" 
                    className={styles.inputControl} 
                    placeholder="Charge amount" 
                    defaultValue={editData?.charge || ''}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>QR Logo</label>
                  <input type="file" className={`${styles.inputControl} ${styles.inputFile}`} />
                </div>
              </div>

              {/* Tabs */}
              <div className={styles.tabsWrapper}>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'BRANCH' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('BRANCH')}
                >
                  BRANCH
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'ADDRESS' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('ADDRESS')}
                >
                  ADDRESS
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'BANK' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('BANK')}
                >
                  BANK
                </button>
              </div>

              {/* Tab Content Area */}
              <div className={styles.tabContentArea}>
                {activeTab === 'BRANCH' && (
                  <div className={styles.formGroup}>
                    <label>Branch Name</label>
                    <input 
                      type="text" 
                      className={styles.inputControl} 
                      placeholder="Enter Branch Name" 
                      defaultValue={editData?.branchName || ''}
                    />
                  </div>
                )}
                
                {activeTab === 'ADDRESS' && (
                  <div className={styles.formGroup}>
                    <label>Bank Address</label>
                    <textarea 
                      className={styles.inputControl} 
                      placeholder="Enter complete bank address..."
                      rows={3}
                      style={{ resize: 'none' }}
                      defaultValue={editData?.address || ''}
                    ></textarea>
                  </div>
                )}

                {activeTab === 'BANK' && (
                  <div className={styles.formGroup}>
                    <label>Bank Logo</label>
                    <input type="file" className={`${styles.inputControl} ${styles.inputFile}`} />
                  </div>
                )}
              </div>

              {/* Action Row - Always Visible */}
              <div className={styles.actionRow}>
                <div className={styles.toggleContainer}>
                  <span className={styles.toggleLabel}>Active</span>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <button className={styles.submitBtn} onClick={() => setShowModal(false)}>
                  {isEditing ? 'Update Details' : 'Submit Details'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.pageTitle} style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            Bank Accounts List
          </h2>
          <button className={styles.addBtn} onClick={handleOpenAdd}>
            <FaPlus /> Add Bank
          </button>
        </div>

        {/* Top Controls */}
        <div className={styles.topControls}>
          <div className={styles.rowsSelector}>
            <span>Show</span>
            <select 
              className={styles.selectInput}
              value={rowsPerPage} 
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>rows</span>
          </div>

          <ExportButtons 
            headers={['S.No', 'Status', 'Bank Name', 'Branch Name', 'Account Holder', 'Account Number', 'IFSC Code', 'Billing Info', 'Charge']}
            rows={currentData.map((row, index) => [
              startIndex + index + 1, row.active ? 'Active' : 'Inactive', row.bankName, row.branchName, row.accountHolder, row.accountNumber, row.ifsc, row.billingInfo, row.charge
            ])}
            fileNamePrefix="company_bank_report"
            sheetName="Company Banks"
          />

          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search Bank or Account..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Status</th>
                <th>Action</th>
                <th>Bank Name</th>
                <th>Branch Name</th>
                <th>Account Holder</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>Billing Info</th>
                <th>Charge</th>
                <th>QR</th>
                <th>Logo</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={row.active} 
                        onChange={() => dispatch(toggleBankActive(row.id))} 
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </td>
                  <td>
                    <button 
                      className={styles.editBtn} 
                      title="Edit"
                      onClick={() => handleEdit(row)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className={styles.fwBold}>{row.bankName}</td>
                  <td>{row.branchName}</td>
                  <td>{row.accountHolder}</td>
                  <td className={styles.fwBold}>{row.accountNumber}</td>
                  <td>{row.ifsc}</td>
                  <td>{row.billingInfo}</td>
                  <td>{row.charge}</td>
                  <td>
                    <span className={styles.placeholderImg}>QR</span>
                  </td>
                  <td>
                    <span className={styles.placeholderImg}>Logo</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FiDatabase style={{ fontSize: '1.5rem', opacity: 0.3 }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>No data available in table</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.paginationRow}>
          <div className={styles.pageInfo}>
            Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className={styles.pagination}>
            <button 
              className={styles.pageBtn} 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button 
                key={num}
                className={`${styles.pageBtn} ${currentPage === num ? styles.pageActive : ''}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button 
              className={styles.pageBtn} 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyBank;

