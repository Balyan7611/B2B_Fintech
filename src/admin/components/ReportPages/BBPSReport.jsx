import React, { useEffect } from 'react';
import ExportButtons from '../../../shared/components/common/ExportButtons';
import { useDispatch, useSelector } from 'react-redux';
import { FiFilter } from 'react-icons/fi';
import { 
  setBBPSList, 
  updateBBPSFilters, 
  setBBPSSearchQuery, 
  setBBPSRowsPerPage, 
  setBBPSCurrentPage 
} from '../../../store/slices/reportSlice';
import AdminTable from '../../../shared/components/common/AdminTable';
import styles from './AEPSReport.module.css';

const BBPSReport = () => {
  const dispatch = useDispatch();
  const { 
    list, 
    filters,
    searchQuery, 
    rowsPerPage, 
    currentPage 
  } = useSelector(state => state.report.bbpsReport);

  // Load dummy data
  useEffect(() => {
    const dummyData = [
      { id: 1, date: '2026-05-01 10:20', status: 'SUCCESS', rechargeBy: 'Sachin Balyan', txid: 'TXN2001', operator: 'Electricity', number: '1234567890', amount: 1500.00, commission: 5.00, operatorId: 'OP999', receipt: 'REC101' },
      { id: 2, date: '2026-05-02 14:15', status: 'PENDING', rechargeBy: 'Sachin Balyan', txid: 'TXN2002', operator: 'Water Bill', number: '0987654321', amount: 450.00, commission: 2.00, operatorId: 'OP998', receipt: 'REC102' },
    ];
    dispatch(setBBPSList(dummyData));
  }, [dispatch]);

  const totalEntries = list.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBBPSFilters({ [name]: value }));
  };

  const columns = [
    'SNO', 'DATE TIME', 'STATUS', 'RECHARGE BY', 'TXID', 
    'OPERATOR', 'NUMBER', 'AMOUNT', 'COMMISSION', 
    'OPERATOR ID', 'RECEIPT'
  ];

  return (
    <div className={styles.container}>
      <AdminTable
        title="BBPS TRANSACTION"
        icon={<FiFilter />}
        topContent={
          <div className={styles.filterRow}>
            <div className={styles.formGroup}>
              <label>Search</label>
              <input 
                type="text" 
                className={styles.inputControl}
                placeholder="Search..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Service</label>
              <select 
                className={styles.inputControl}
                name="service"
                value={filters.service}
                onChange={handleFilterChange}
              >
                <option value="">Select Service</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Gas">Gas</option>
              </select>
            </div>
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
              <label>Status</label>
              <select 
                className={styles.inputControl}
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Select Status</option>
                <option value="SUCCESS">Success</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
              </select>
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
            <button className={styles.submitBtn}>Submit</button>
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
              <td>{item.date}</td>
              <td>
                <span className={`${styles.statusBadge} ${statusStyle}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.rechargeBy}</td>
              <td>{item.txid}</td>
              <td>{item.operator}</td>
              <td>{item.number}</td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.commission.toFixed(2)}</td>
              <td>{item.operatorId}</td>
              <td>{item.receipt}</td>
            </tr>
          );
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setBBPSSearchQuery(val))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(val) => dispatch(setBBPSRowsPerPage(val))}
        currentPage={currentPage}
        onPageChange={(val) => dispatch(setBBPSCurrentPage(val))}
        totalEntries={totalEntries}
        totalPages={totalPages}
      />
    </div>
  );
};

export default BBPSReport;
