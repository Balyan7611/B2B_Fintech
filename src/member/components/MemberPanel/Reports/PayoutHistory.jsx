import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setPayoutList, 
  updatePayoutFilters, 
  setPayoutSearchQuery, 
  setPayoutRowsPerPage, 
  setPayoutCurrentPage 
} from '../../../../store/slices/reportSlice';
import AdminTable from '../../../../shared/components/common/AdminTable';
import styles from './AEPSReport.module.css';

const PayoutHistory = () => {
  const dispatch = useDispatch();
  const { list, filters, searchQuery, rowsPerPage, currentPage } = useSelector(state => state.report.payoutReport);

  useEffect(() => {
    const dummyData = [
      { id: 1, date: '2026-05-01 12:30', memberId: 'RT1236', name: 'Sachin Balyan', bank: 'HDFC', accNo: '501000123456', amount: '2000.00', charges: '10.00', total: '2010.00', status: 'SUCCESS' },
    ];
    dispatch(setPayoutList(dummyData));
  }, [dispatch]);

  const filteredList = list.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.accNo.includes(searchQuery));

  return (
    <div className={styles.container}>
      <AdminTable
        title="PAYOUT HISTORY"
        topContent={
          <div className={styles.filterSection}>
            <div className={styles.filterRow}>
              <div className={styles.formGroup}><label>From Date</label><input type="date" className={styles.inputControl} name="fromDate" value={filters.fromDate} onChange={(e) => dispatch(updatePayoutFilters({fromDate: e.target.value}))} /></div>
              <div className={styles.formGroup}><label>To Date</label><input type="date" className={styles.inputControl} name="toDate" value={filters.toDate} onChange={(e) => dispatch(updatePayoutFilters({toDate: e.target.value}))} /></div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select className={styles.inputControl} name="status" value={filters.status} onChange={(e) => dispatch(updatePayoutFilters({status: e.target.value}))}>
                  <option value="">All Status</option>
                  <option value="SUCCESS">Success</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
              <button className={styles.submitBtn}>Apply Filters</button>
            </div>
          </div>
        }
        columns={['#', 'DATE & TIME', 'MEMBER NAME', 'BANK NAME', 'ACCOUNT NO', 'AMOUNT', 'CHARGES', 'TOTAL', 'STATUS', 'RECEIPT']}
        data={filteredList}
        renderRow={(item, index) => (
          <tr key={item.id}>
            <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
            <td style={{ fontSize: '0.8rem', color: '#4E6080' }}>{item.date}</td>
            <td style={{ fontWeight: 600 }}>{item.name}</td>
            <td>{item.bank}</td>
            <td style={{ fontWeight: 700 }}>{item.accNo}</td>
            <td style={{ fontWeight: 700 }}>₹{item.amount}</td>
            <td style={{ color: '#E74C3C' }}>₹{item.charges}</td>
            <td style={{ fontWeight: 800 }}>₹{item.total}</td>
            <td><span className={`${styles.statusBadge} ${item.status === 'SUCCESS' ? styles.statusSuccess : styles.statusFailed}`}>{item.status}</span></td>
            <td><button style={{ background: '#F1F5F9', color: '#1756AA', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>View</button></td>
          </tr>
        )}
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setPayoutSearchQuery(val))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(val) => dispatch(setPayoutRowsPerPage(val))}
        currentPage={currentPage}
        onPageChange={(val) => dispatch(setPayoutCurrentPage(val))}
        totalEntries={filteredList.length}
        totalPages={Math.ceil(filteredList.length / rowsPerPage)}
      />
    </div>
  );
};

export default PayoutHistory;
