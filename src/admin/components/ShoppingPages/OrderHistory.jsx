import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FaSearch, FaFileExcel, FaFilePdf, FaPrint, FaCopy, FaFileCsv,
  FaChevronLeft, FaChevronRight, FaCircle, FaImage, FaBoxOpen
} from 'react-icons/fa';
import { updateFilters, setPagination } from '../../../store/slices/shoppingSlice';
import styles from './ShoppingPages.module.css';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orderList, filters, currentPage, rowsPerPage } = useSelector((s) => s.shopping);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return styles.badge_green;
      case 'Pending': return styles.badge_yellow;
      case 'Cancelled': return styles.badge_red;
      default: return '';
    }
  };

  const filteredData = orderList.filter(o => {
    const matchesSearch = 
      o.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      o.memberId.toLowerCase().includes(filters.search.toLowerCase()) ||
      (o.product || '').toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = 
      !filters.status || o.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* Filter Card */}
      <div className={styles.filterCard} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: '16px', padding: '20px', background: '#fff', marginBottom: '24px' }}>
        <h2 className={styles.cardTitle} style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Shopping Order History</h2>
        <div className={styles.filterRowThree}>
          <div className={styles.formGroup}>
            <label>From Date</label>
            <input type="date" name="fromDate" className={styles.inputControl} value={filters.fromDate} onChange={handleFilterChange} />
          </div>
          <div className={styles.formGroup}>
            <label>To Date</label>
            <input type="date" name="toDate" className={styles.inputControl} value={filters.toDate} onChange={handleFilterChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select name="status" className={styles.inputControl} value={filters.status} onChange={handleFilterChange}>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button style={{ marginTop: 'auto', height: '40px', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Search</button>
        </div>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: '16px', background: '#fff' }}>
        <div className={styles.topControls} style={{ background: '#F8FAFF', padding: '15px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
          <div className={styles.rowsSelector}>
            <span>Show</span>
            <select className={styles.selectInput} value={rowsPerPage} onChange={(e) => dispatch(setPagination({ rows: Number(e.target.value) }))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>rows</span>
          </div>
          <div className={styles.exportRow}>
            <button className={styles.exportBtn}><FaCopy /></button>
            <button className={styles.exportBtn}><FaFileExcel /></button>
            <button className={styles.exportBtn}><FaFileCsv /></button>
            <button className={styles.exportBtn}><FaFilePdf /></button>
            <button className={styles.exportBtn}><FaPrint /></button>
          </div>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search..." className={styles.searchInput} value={filters.search} onChange={handleFilterChange} name="search" />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>SL</th>
                <th style={{ width: '120px' }}>Member ID</th>
                <th style={{ width: '150px' }}>Name</th>
                <th style={{ width: '150px' }}>Product</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Photo</th>
                <th style={{ width: '100px' }}>Price</th>
                <th style={{ width: '80px' }}>Qty</th>
                <th style={{ width: '100px' }}>Discount</th>
                <th style={{ width: '120px' }}>Status</th>
                <th style={{ width: '120px' }}>Order Date</th>
                <th style={{ width: '180px' }}>Status Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((o, i) => (
                <tr key={o.id}>
                  <td>{i + 1}</td>
                  <td className={styles.fwBold} style={{ color: '#1756AA' }}>{o.memberId}</td>
                  <td style={{ fontSize: '0.8rem' }}>{o.name}</td>
                  <td className={styles.fwBold} style={{ fontSize: '0.85rem' }}>{o.product}</td>
                  <td style={{ textAlign: 'center' }}>
                    {o.photo ? (
                      <img src={o.photo} alt="product" className={styles.orderThumb} />
                    ) : (
                      <div className={styles.emptyThumb}>
                        <FaImage className={styles.emptyIcon} />
                      </div>
                    )}
                  </td>
                  <td className={styles.fwBold}>₹ {o.price}</td>
                  <td style={{ textAlign: 'center' }}>{o.qty}</td>
                  <td style={{ color: '#E53E3E' }}>₹ {o.discount}</td>
                  <td>
                    <span className={`${styles.badge} ${getStatusBadge(o.status)}`}>
                      <FaCircle style={{ fontSize: '8px' }} /> {o.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{o.date}</td>
                  <td>
                    <select className={styles.statusSelect}>
                      <option value="">Update Status</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="11" style={{ padding: 0, background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
                      No data available
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>Showing 1 to {filteredData.length} of {filteredData.length} entries</div>
          <div className={styles.pageBtns}>
            <button className={styles.pageBtn}><FaChevronLeft /></button>
            <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
            <button className={styles.pageBtn}><FaChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
