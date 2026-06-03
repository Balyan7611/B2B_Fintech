import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FiUploadCloud, FiCheckCircle, FiPlus, FiEye, FiTrash2
} from 'react-icons/fi';
import { 
  addUploadRow, 
  updateUploadRow, 
  removeUploadRow, 
  submitUploadRow,
  setMemberUploadSearch,
  setMemberUploadRowsPerPage,
  setMemberUploadCurrentPage
} from '../../../store/slices/kycSlice';
import AdminTable from '../../../shared/components/common/AdminTable';
import KYCUploadModal from './KYCUploadModal';
import KYCViewModal from './KYCViewModal';
import styles from './UploadKYC.module.css';

const UploadKYC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState(null);

  const { 
    myDocuments, 
    searchQuery, 
    rowsPerPage, 
    currentPage 
  } = useSelector(state => state.kyc.memberUpload);

  // Filter for table
  const filteredDocs = myDocuments.filter(doc => 
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalEntries = filteredDocs.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  
  const currentData = filteredDocs.slice(
    (currentPage - 1) * rowsPerPage, 
    currentPage * rowsPerPage
  );

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      
      {/* KYC DOCUMENTS LIST */}
      <AdminTable
        title="KYC DOCUMENTS"
        subtitle="Manage and track your submitted identification documents"
        rightAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              color: '#fff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
            }}
          >
            <FiUploadCloud /> UPLOAD
          </button>
        }
        columns={['SNO', 'DOCUMENT NAME', 'STATUS', 'REASON', 'VIEW', 'ADDDATE']}
        data={currentData}
        renderRow={(item, index) => {
          let badgeClass = styles.badgePending;
          if (item.status === 'Approved') badgeClass = styles.badgeApproved;
          if (item.status === 'Rejected') badgeClass = styles.badgeRejected;

          return (
            <tr key={item.id}>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td style={{ fontWeight: 700, color: '#1756AA' }}>{item.documentName}</td>
              <td>
                <span className={`${styles.badge} ${badgeClass}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.reason}</td>
              <td>
                <button 
                  className={styles.viewBtn} 
                  title="View Document"
                  onClick={() => setSelectedDoc(item)}
                >
                  <FiEye />
                </button>
              </td>
              <td>{item.addDate}</td>
            </tr>
          );
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setMemberUploadSearch(val))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(val) => dispatch(setMemberUploadRowsPerPage(val))}
        currentPage={currentPage}
        onPageChange={(val) => dispatch(setMemberUploadCurrentPage(val))}
        totalEntries={totalEntries}
        totalPages={totalPages}
      />

      <KYCUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <KYCViewModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        documentName={selectedDoc?.documentName}
        imageUrl={selectedDoc?.imageUrl}
      />

    </div>
  );
};

export default UploadKYC;
