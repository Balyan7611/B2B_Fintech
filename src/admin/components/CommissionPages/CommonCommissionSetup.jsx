import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FiGrid, FiArrowRight, FiFilter, FiChevronDown
} from 'react-icons/fi';
import { 
  setCommonService, 
  setCommonSearchQuery, 
  setCommonRowsPerPage, 
  setCommonCurrentPage
} from '../../../store/slices/commissionSlice';
import AdminTable from '../../../shared/components/common/AdminTable';
import styles from './CommonCommissionSetup.module.css';

const CommonCommissionSetup = () => {
  const dispatch = useDispatch();
  const { 
    selectedService, 
    list, 
    searchQuery, 
    rowsPerPage, 
    currentPage 
  } = useSelector(state => state.commission.commonCommission);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Mock services list
  const services = [
    'Prepaid Mobile', 'Postpaid Mobile', 'DTH', 'Electricity', 
    'Gas', 'Water', 'Insurance', 'DMT', 'AEPS'
  ];

  // Commission data will be fetched from API based on selected service

  // CLOSE DROPDOWN ON CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredList = list.filter(item => 
    item.opName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEntries = filteredList.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  return (
    <div className={styles.container}>
      
      {/* TABLE CARD WITH INLINE FILTERS */}
      <AdminTable
        title="Common Commission Setup"
        subtitle="View and manage operator-wise commission slabs"
        rightAction={
          <div className={styles.inlineFilterRow}>
            <div className={styles.customDropdown} ref={dropdownRef}>
              <div 
                className={`${styles.dropdownHeader} ${isDropdownOpen ? styles.active : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FiGrid className={styles.inputIcon} />
                <span className={styles.selectedVal}>
                  {selectedService || 'Select Service'}
                </span>
                <FiChevronDown className={`${styles.chevron} ${isDropdownOpen ? styles.rotate : ''}`} />
              </div>

              {isDropdownOpen && (
                <div className={styles.dropdownList}>
                  <div 
                    className={styles.dropdownItem}
                    onClick={() => {
                      dispatch(setCommonService(""));
                      setIsDropdownOpen(false);
                    }}
                  >
                    Select Service
                  </div>
                  {services.map(s => (
                    <div 
                      key={s} 
                      className={`${styles.dropdownItem} ${selectedService === s ? styles.itemActive : ''}`}
                      onClick={() => {
                        dispatch(setCommonService(s));
                        setIsDropdownOpen(false);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className={styles.submitBtn}>
              SUBMIT <FiArrowRight />
            </button>
          </div>
        }
        columns={['SL', 'OPNAME', 'STARTVAL', 'ENDVAL', 'SLAB']}
        data={filteredList}
        renderRow={(item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.opName}</td>
            <td>{item.startVal}</td>
            <td>{item.endVal}</td>
            <td>{item.slab}</td>
          </tr>
        )}
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setCommonSearchQuery(val))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(val) => dispatch(setCommonRowsPerPage(val))}
        currentPage={currentPage}
        onPageChange={(val) => dispatch(setCommonCurrentPage(val))}
        totalEntries={totalEntries}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CommonCommissionSetup;
