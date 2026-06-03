import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateCategoryForm, 
  toggleCategoryStatus,
  deleteCategory
} from '../../../store/slices/shoppingSlice';
import { 
  FaSearch, FaFileExcel, FaFilePdf, FaPrint, FaCopy, FaFileCsv,
  FaEdit, FaCloudUploadAlt, FaTimes, FaPlus, FaChevronLeft, FaChevronRight, FaTrash 
} from 'react-icons/fa';
import styles from './AddCategory.module.css';

const AddCategory = () => {
  const dispatch = useDispatch();
  const { categoryForm, categoryList } = useSelector((s) => s.shopping);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCategoryForm({ [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        dispatch(updateCategoryForm({ image: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    dispatch(updateCategoryForm({ image: null }));
  };

  const confirmDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const handleDelete = () => {
    dispatch(deleteCategory(deleteModal.id));
    setDeleteModal({ open: false, id: null });
  };

  // Filter Data
  const filteredData = (categoryList || []).filter(item => 
    (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.parentMenu || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={styles.container} style={{ padding: '24px 24px 0px 24px', maxWidth: '100%' }}>
      
      {/* ── ADD/EDIT CATEGORY MODAL ── */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Manage Category</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalFormGrid}>
                {/* Main Inputs */}
                <div className={styles.formFields}>
                  <div className={styles.formGroup}>
                    <label>Category Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className={styles.inputControl}
                      value={categoryForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category Level</label>
                    <select 
                      name="level"
                      className={styles.inputControl}
                      value={categoryForm.level}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Level</option>
                      <option value="1">Level 1 (Main Menu)</option>
                      <option value="2">Level 2 (Sub Menu)</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Parent Menu</label>
                    <select 
                      name="mainMenu"
                      className={styles.inputControl}
                      value={categoryForm.mainMenu}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Parent</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category Icon</label>
                    <input 
                      type="text" 
                      name="icon"
                      className={styles.inputControl}
                      value={categoryForm.icon}
                      onChange={handleInputChange}
                      placeholder="fa fa-shopping-cart"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Display Position</label>
                    <input 
                      type="number" 
                      name="position"
                      className={styles.inputControl}
                      value={categoryForm.position}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>URL Slug / Link</label>
                    <input 
                      type="text" 
                      name="link"
                      className={styles.inputControl}
                      value={categoryForm.link}
                      onChange={handleInputChange}
                      placeholder="category-url-slug"
                    />
                  </div>
                </div>

                {/* Image Upload Zone */}
                <div className={styles.imageUploadCol}>
                  <div className={styles.formGroup}>
                    <label>Category Banner / Image</label>
                    <div className={styles.uploadSection}>
                      <input 
                        type="file" 
                        id="categoryImage"
                        className={styles.fileInputHidden}
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      {!imagePreview ? (
                        <label htmlFor="categoryImage" className={styles.uploadLabel}>
                          <FaCloudUploadAlt className={styles.uploadIcon} />
                          <span>Upload Image</span>
                          <p style={{ margin: '4px 0 0', fontSize: '0.75rem', opacity: 0.6, fontWeight: 500 }}>PNG, JPG up to 2MB</p>
                        </label>
                      ) : (
                        <div className={styles.previewContainer}>
                          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                          <button className={styles.removeImgBtn} onClick={removeImage}>
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={() => setIsModalOpen(false)}>
                <FaPlus style={{ marginRight: '8px' }} /> Save Category
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
            <p>Do you really want to delete this category? This action cannot be undone.</p>
            <div className={styles.deleteActionBtns}>
              <button className={styles.cancelBtn} onClick={() => setDeleteModal({ open: false, id: null })}>Cancel</button>
              <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className={styles.card} style={{ marginTop: 0, padding: '24px' }}>
        <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', paddingBottom: '16px', borderBottom: '1px solid #EDF2F7', marginBottom: '20px' }}>
          <h2 className={styles.pageTitle} style={{ fontSize: '1.25rem', margin: 0, border: 'none', padding: 0 }}>
            Add Category
          </h2>
          <button onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.2)' }}>
            <FaPlus /> New Category
          </button>
        </div>
        
        {/* Top Controls */}
        <div className={styles.topControls} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
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
              placeholder="Search Category..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper} style={{ border: '1px solid #EDF2F7', borderRadius: '12px' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Status</th>
                <th>Action</th>
                <th>Category Name</th>
                <th>Parent Menu</th>
                <th>Menu Level</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((cat, index) => (
                <tr key={cat.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={cat.active} 
                        onChange={() => dispatch(toggleCategoryStatus(cat.id))}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </td>
                  <td>
                    <div className={styles.actionRow}>
                      <button 
                        className={styles.editBtn} 
                        title="Edit Category"
                        onClick={() => {
                          // In a real app, you'd dispatch an action to set the form state with cat data
                          setIsModalOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={styles.deleteBtn} 
                        title="Delete Category" 
                        onClick={() => confirmDelete(cat.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                  <td className={styles.fwBold}>{cat.name}</td>
                  <td>{cat.parentMenu}</td>
                  <td>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1756AA', background: 'rgba(23,86,170,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                      Level {cat.level}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{ padding: 0, background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
                      No categories found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.paginationRow} style={{ marginTop: '20px' }}>
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

export default AddCategory;
