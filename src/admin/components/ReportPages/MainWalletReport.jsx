import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiFilter } from 'react-icons/fi';
import { 
  setMainWalletList, 
  updateMainWalletFilters, 
  setMainWalletSearchQuery, 
  setMainWalletRowsPerPage, 
  setMainWalletCurrentPage 
} from '../../../store/slices/reportSlice';
import AdminTable from '../../../shared/components/common/AdminTable';
import styles from './AEPSReport.module.css';

const MainWalletReport = () => {
  const dispatch = useDispatch();
  const { 
    list, 
    filters,
    searchQuery, 
    rowsPerPage, 
    currentPage 
  } = useSelector(state => state.report.mainWalletReport);

  // Load dummy data
  useEffect(() => {
    const dummyData = [
      { id: 1, member: 'RT1236 (Sachin Balyan)', opening: '1000.00', amount: '500.00', factor: 'Credit', surcharge: '0.00', gst: '0.00', tds: '0.00', commission: '10.00', closing: '1510.00', narration: 'Fund Transferred', date: '2026-05-05 10:20' },
      { id: 2, member: 'RT1236 (Sachin Balyan)', opening: '1510.00', amount: '200.00', factor: 'Debit', surcharge: '0.00', gst: '0.00', tds: '0.00', commission: '0.00', closing: '1310.00', narration: 'Recharge Deduction', date: '2026-05-05 14:15' },
    ];
    dispatch(setMainWalletList(dummyData));
  }, [dispatch]);

  const totalEntries = list.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateMainWalletFilters({ [name]: value }));
  };

  const columns = [
    'SL', 'MEMBER DETAILS', 'OPENING AMOUNT', 'AMOUNT', 
    'FACTOR', 'SURCHARGE', 'GST', 'TDS', 'COMMISSION', 
    'CLOSING BALANCE', 'NARRATION', 'TRANSFERDATE'
  ];

  return (
    <div className={styles.container}>
      <AdminTable
        title="E-WALLET HISTORY"
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
            <div className={styles.formGroup}>
              <label>Member ID :</label>
              <select 
                className={styles.inputControl}
                name="memberId"
                value={filters.memberId}
                onChange={handleFilterChange}
              >
                <option value="">Select Member</option>
                <option value="RT1236">Sachin Balyan (RT1236)</option>
              </select>
            </div>
            <button className={styles.submitBtn} style={{marginTop: '22px'}}>Search</button>
          </div>
        }
        columns={columns}
        data={list}
        renderRow={(item, index) => {
          return (
            <tr key={item.id}>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td>{item.member}</td>
              <td>{item.opening}</td>
              <td style={{fontWeight: '700', color: item.factor === 'Credit' ? '#27ae60' : '#e74c3c'}}>
                {item.factor === 'Credit' ? '+' : '-'}{item.amount}
              </td>
              <td>{item.factor}</td>
              <td>{item.surcharge}</td>
              <td>{item.gst}</td>
              <td>{item.tds}</td>
              <td>{item.commission}</td>
              <td>{item.closing}</td>
              <td style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {item.narration}
              </td>
              <td>{item.date}</td>
            </tr>
          );
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setMainWalletSearchQuery(val))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(val) => dispatch(setMainWalletRowsPerPage(val))}
        currentPage={currentPage}
        onPageChange={(val) => dispatch(setMainWalletCurrentPage(val))}
        totalEntries={totalEntries}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MainWalletReport;
