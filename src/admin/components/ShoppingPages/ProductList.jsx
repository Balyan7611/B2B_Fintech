import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FaSearch, FaFileExcel, FaFilePdf, FaPrint, FaCopy, FaFileCsv,
  FaEdit, FaTrash, FaPlus, FaImage, FaChevronLeft, FaChevronRight,
  FaCircle, FaTimes
} from 'react-icons/fa';
import { updateFilters, setPagination, deleteProduct, setEditingProduct } from '../../../store/slices/shoppingSlice';
import styles from './ShoppingPages.module.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, filters, currentPage, rowsPerPage } = useSelector((s) => s.shopping);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  const filteredData = productList.filter(p => 
    p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    p.category.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div className={styles.container} style={{ padding: '15px 15px 0px 15px', maxWidth: '100%' }}>
      {/* Filter Card */}
      <div className={styles.filterCard} style={{ marginTop: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: '16px', padding: '20px', background: '#fff', marginBottom: '24px' }}>
        <h2 className={styles.cardTitle} style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Product List</h2>
        <div className={styles.filterRow}>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select name="category" className={styles.inputControl} value={filters.category} onChange={handleFilterChange}>
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>From Date</label>
            <input type="date" name="fromDate" className={styles.inputControl} value={filters.fromDate} onChange={handleFilterChange} />
          </div>
          <div className={styles.formGroup}>
            <label>To Date</label>
            <input type="date" name="toDate" className={styles.inputControl} value={filters.toDate} onChange={handleFilterChange} />
          </div>
          <div className={styles.formGroup} style={{ flexDirection: 'row', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Search</label>
              <input type="text" name="search" className={styles.inputControl} placeholder="Search products..." value={filters.search} onChange={handleFilterChange} />
            </div>
            <button style={{ marginTop: 'auto', height: '40px', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Submit</button>
          </div>
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
                <th style={{ width: '50px' }}>S.No</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Upload Image</th>
                <th style={{ width: '100px' }}>Status</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Net Amount</th>
                <th>Add Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className={styles.iconBtn} title="Upload More Images" style={{ margin: '0 auto' }}><FaImage /></button>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${p.status === 'ACTIVE' ? styles.badge_green : styles.badge_red}`}>
                      <FaCircle style={{ fontSize: '8px' }} /> {p.status}
                    </span>
                  </td>
                  <td>{p.category}</td>
                  <td className={styles.fwBold}>{p.name}</td>
                  <td className={styles.fwBold}>₹ {p.amount}</td>
                  <td>{p.date}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={{ padding: 0, background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
                      No data available in table
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
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

export default ProductList;
