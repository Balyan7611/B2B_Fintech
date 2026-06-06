import React from 'react';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { useDispatch, useSelector } from 'react-redux';
import { FiFilter } from 'react-icons/fi';
import { 
  setAEPSWalletList, 
  updateAEPSWalletFilters, 
  setAEPSWalletSearchQuery, 
  setAEPSWalletRowsPerPage, 
  setAEPSWalletCurrentPage 
} from '../../../store/slices/reportSlice';
import AdminTable from '../../../shared/components/common/AdminTable';
import styles from './AEPSReport.module.css';

const AEPSWalletReport = () => {
  const dispatch = useDispatch();
  const { 
    list, 
    filters,
    searchQuery, 
    rowsPerPage, 
    currentPage 
  } = useSelector(state => state.report.aepsWalletReport);

  // Data will be fetched from API when backend endpoints are ready
  // useEffect(() => { ... fetch AEPS wallet data ... }, [filters]);

  const totalEntries = list.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAEPSWalletFilters({ [name]: value }));
  };

  const columns = [
    'SNO', 'MEMBER', 'NAME', 'OPENING BALANCE', 'AMOUNT', 
    'FACTOR', 'COMMISSION', 'TDS', 'CHARGE', 'CLOSING BALANCE', 
    'DATE', 'DESCRIPTION', 'STATUS'
  ];

  return (
    <div className={styles.container}>
      <AdminTable
        title="AEPS EWALLET SUMMARY"
        icon={<FiFilter />}
        topContent={
          <div className={styles.filterRow}>
            <div className={styles.formGroup}>
              <label>From Date</label>
              <input 
                type="date" 
                className={styles.inputControl}
                name="fromDate"
                value={filters.fromDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>To Date</label>
              <input 
                type="date" 
                className={styles.inputControl}
                name="toDate"
                value={filters.toDate}
                onChange={handleFilterChange}
              />
            </div>
            <button className={styles.submitBtn} style={{marginTop: '22px'}}>Search</button>
          </div>
        }
        columns={columns}
        data={list}
        renderRow={(item, index) => {
          let statusStyle = styles.statusPending;
          if (item.status === 'SUCCESS') statusStyle = styles.statusSuccess;
          if (item.status === 'FAILED') statusStyle = styles.statusFailed;

          return (
            <tr key={item.id}>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td>{item.member}</td>
              <td>{item.name}</td>
              <td>{item.opening}</td>
              <td style={{fontWeight: '700', color: item.factor === 'Credit' ? '#27ae60' : '#e74c3c'}}>
                {item.factor === 'Credit' ? '+' : '-'}{item.amount}
              </td>
              <td>{item.factor}</td>
              <td>{item.commission}</td>
              <td>{item.tds}</td>
              <td>{item.charge}</td>
              <td>{item.closing}</td>
              <td>{item.date}</td>
              <td style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {item.desc}
              </td>
              <td>
                <span className={`${styles.statusBadge} ${statusStyle}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          );
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setAEPSWalletSearchQuery(val))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(val) => dispatch(setAEPSWalletRowsPerPage(val))}
        currentPage={currentPage}
        onPageChange={(val) => dispatch(setAEPSWalletCurrentPage(val))}
        totalEntries={totalEntries}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AEPSWalletReport;
