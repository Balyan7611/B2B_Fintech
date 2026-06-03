import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FaSearch, FaFileExcel, FaFilePdf, FaPrint, FaCopy, FaFileCsv,
  FaChevronLeft, FaChevronRight, FaEdit, FaTrash, FaPowerOff, 
  FaTimes, FaCheck, FaChevronDown, FaUser 
} from 'react-icons/fa';
import styles from './MemberBankDetails.module.css';
import { toggleMemberBankStatus } from '../../../store/slices/balanceSlice';

const MemberBankDetails = () => {
  const dispatch = useDispatch();
  const { memberBankList } = useSelector((s) => s.balance);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberSearch, setMemberSearch] = useState('');
  const dropdownRef = useRef(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  // Delete Confirmation State
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  // Status Change Confirmation State
  const [statusModal, setStatusModal] = useState({ open: false, row: null });

  // Mock Members for dropdown
  const members = [
    { id: 'MDT8597', name: 'VIVEK VARSHNEY' },
    { id: 'Pay99DT5001', name: 'vivek' },
    { id: 'Pay99RT4003', name: 'vivek' },
    { id: 'Pay99RT4005', name: 'Rahul Sharma' },
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.id.toLowerCase().includes(memberSearch.toLowerCase())
  );

  // Filter Data
  const filteredData = memberBankList.filter(item => {
    const matchMember = !selectedMember || item.memberId === selectedMember.id;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMember && matchSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openEditModal = (row) => {
    setEditingRow({...row});
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingRow(null);
  };

  const confirmDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const handleDelete = () => {
    // Logic to delete the record (would normally dispatch a Redux action)
    console.log('Deleting member bank detail:', deleteModal.id);
    setDeleteModal({ open: false, id: null });
  };

  const confirmStatusChange = (row) => {
    setStatusModal({ open: true, row });
  };

  const handleStatusToggle = () => {
    dispatch(toggleMemberBankStatus(statusModal.row.id));
    setStatusModal({ open: false, row: null });
  };

  return (
    <div className={styles.container}>
      
      {/* ── MODAL POPUP ── */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay} onClick={closeEditModal}>
          <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Bank Account Details</h2>
              <button className={styles.closeBtn} onClick={closeEditModal}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <div className={styles.formGroup}>
                  <label>Member Name</label>
                  <input type="text" className={styles.inputControl} value={editingRow?.name || ''} readOnly style={{ background: '#F1F5F9' }} />
                </div>
                <div className={styles.formGroup}>
                  <label>Member ID</label>
                  <input type="text" className={styles.inputControl} value={editingRow?.memberId || ''} readOnly style={{ background: '#F1F5F9' }} />
                </div>
                <div className={styles.formGroup}>
                  <label>Bank Name</label>
                  <input type="text" className={styles.inputControl} value={editingRow?.bankName || ''} />
                </div>
                <div className={styles.formGroup}>
                  <label>IFSC Code</label>
                  <input type="text" className={styles.inputControl} value={editingRow?.ifsc || ''} />
                </div>
                <div className={styles.formGroup}>
                  <label>Branch Name</label>
                  <input type="text" className={styles.inputControl} value={editingRow?.branch || ''} />
                </div>
                <div className={styles.formGroup}>
                  <label>Account Number</label>
                  <input type="text" className={styles.inputControl} value={editingRow?.accNo || ''} />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={closeEditModal}>Cancel</button>
              <button className={styles.saveBtn} onClick={closeEditModal}>
                Update Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteModal.open && (
        <div className={styles.modalOverlay} onClick={() => setDeleteModal({ open: false, id: null })}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconBox}>
              <FaTrash />
            </div>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this bank record? This action cannot be undone.</p>
            <div className={styles.deleteActionBtns}>
              <button className={styles.cancelBtn} onClick={() => setDeleteModal({ open: false, id: null })}>Cancel</button>
              <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── STATUS CHANGE MODAL ── */}
      {statusModal.open && (
        <div className={styles.modalOverlay} onClick={() => setStatusModal({ open: false, row: null })}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconBox} style={{ background: statusModal.row.status === 'Active' ? '#FFF5F5' : '#F0FDF4', color: statusModal.row.status === 'Active' ? '#E53E3E' : '#27AE60' }}>
              <FaPowerOff />
            </div>
            <h3>Confirm Status Change</h3>
            <p>Are you sure you want to change the status to <strong>{statusModal.row.status === 'Active' ? 'InActive' : 'Active'}</strong> for {statusModal.row.name}?</p>
            <div className={styles.deleteActionBtns}>
              <button className={styles.cancelBtn} onClick={() => setStatusModal({ open: false, row: null })}>Cancel</button>
              <button className={styles.deleteBtn} style={{ background: statusModal.row.status === 'Active' ? '#E53E3E' : '#27AE60' }} onClick={handleStatusToggle}>Yes, Change it</button>
            </div>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.pageTitle} style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            Bank Details Management
          </h2>
          
          <div className={styles.headerFilters}>
            {/* Custom Searchable Dropdown */}
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <div 
                className={`${styles.headerDropdown} ${isDropdownOpen ? styles.dropdownActive : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className={styles.selectedMemberText}>
                  {selectedMember ? (
                    <span className={styles.fwBold}>
                      <FaUser className={styles.memberIcon} /> {selectedMember.id}
                    </span>
                  ) : (
                    <span className={styles.placeholder}>All Members</span>
                  )}
                </div>
                <FaChevronDown className={`${styles.arrowIcon} ${isDropdownOpen ? styles.arrowRotate : ''}`} />
              </div>

              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownSearch}>
                    <FaSearch className={styles.innerSearchIcon} />
                    <input 
                      type="text" 
                      placeholder="Search member..." 
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                  </div>
                  <div className={styles.optionsList}>
                    <div 
                      className={styles.optionItem}
                      onClick={() => { setSelectedMember(null); setIsDropdownOpen(false); setMemberSearch(''); }}
                    >
                      All Members
                    </div>
                    {filteredMembers.map(m => (
                      <div 
                        key={m.id} 
                        className={`${styles.optionItem} ${selectedMember?.id === m.id ? styles.optionSelected : ''}`}
                        onClick={() => { setSelectedMember(m); setIsDropdownOpen(false); setMemberSearch(''); }}
                      >
                        <div className={styles.optionInfo}>
                          <span className={styles.optionName}>{m.name}</span>
                          <span className={styles.optionId}>{m.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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

          <div className={styles.exportRow}>
            <button className={styles.exportBtn} title="Copy"><FaCopy /></button>
            <button className={styles.exportBtn} title="Excel"><FaFileExcel /></button>
            <button className={styles.exportBtn} title="CSV"><FaFileCsv /></button>
            <button className={styles.exportBtn} title="PDF"><FaFilePdf /></button>
            <button className={styles.exportBtn} title="Print"><FaPrint /></button>
          </div>

          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search Name or ID..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Wrapper */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Action</th>
                <th>Member Details</th>
                <th>Bank Info</th>
                <th>Branch</th>
                <th>Account No</th>
                <th>Added On</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <div className={styles.actionRow}>
                      <button 
                        className={`${styles.toggleBtn} ${row.status === 'Active' ? styles.activeStatus : styles.inactiveStatus}`}
                        title={row.status === 'Active' ? 'Deactivate' : 'Activate'}
                        onClick={() => confirmStatusChange(row)}
                      >
                        <FaPowerOff /> {row.status === 'Active' ? 'Active' : 'InActive'}
                      </button>
                      <button 
                        className={`${styles.iconBtn} ${styles.editBtn}`} 
                        title="Edit Details"
                        onClick={() => openEditModal(row)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={`${styles.iconBtn} ${styles.deleteBtn}`} 
                        title="Delete Entry"
                        onClick={() => confirmDelete(row.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={styles.fwBold}>{row.name}</span>
                      <span className={styles.subText}>{row.memberId}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={styles.fwBold}>{row.bankName}</span>
                      <span className={styles.subText}>{row.ifsc}</span>
                    </div>
                  </td>
                  <td>{row.branch}</td>
                  <td className={styles.fwBold}>{row.accNo}</td>
                  <td className={styles.subText}>{row.date}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className={styles.noData}>No data available</td>
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

export default MemberBankDetails;

