import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateProductForm, 
  resetProductForm,
  addProduct,
  deleteProduct,
  setEditingProduct
} from '../../../store/slices/shoppingSlice';
import { 
  FaCalendarAlt, FaPercentage, FaCheck, FaInfoCircle, FaEdit, FaBoxOpen, FaLayerGroup,
  FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaTrashAlt,
  FaCloudUploadAlt, FaTimes, FaArrowRight, FaTag, FaGlobe, FaVideo, FaImages, FaRupeeSign, FaWeightHanging
} from 'react-icons/fa';
import styles from './AddProduct.module.css';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { productForm, productList } = useSelector((s) => s.shopping);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateProductForm({ [name]: type === 'checkbox' ? checked : value }));
  };

  // Tags Logic
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!productForm.labels.includes(tagInput.trim())) {
        dispatch(updateProductForm({ labels: [...productForm.labels, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    dispatch(updateProductForm({ labels: productForm.labels.filter(t => t !== tagToRemove) }));
  };

  // Image Logic
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(f => URL.createObjectURL(f));
    dispatch(updateProductForm({ images: [...productForm.images, ...newImages] }));
  };

  const removeImage = (idx) => {
    dispatch(updateProductForm({ images: productForm.images.filter((_, i) => i !== idx) }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(addProduct({
        name: productForm.name,
        category: productForm.category || 'General',
        amount: productForm.price,
        images: productForm.images
      }));
      setIsLoading(false);
      setIsModalOpen(false);
      setActiveStep(1);
    }, 1500);
  };

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 1));

  const handleEdit = (product) => {
    dispatch(setEditingProduct(product));
    setIsModalOpen(true);
    setActiveStep(1);
  };

  const confirmDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const handleDelete = () => {
    dispatch(deleteProduct(deleteModal.id));
    setDeleteModal({ open: false, id: null });
  };

  const openNewProductModal = () => {
    dispatch(resetProductForm());
    setIsModalOpen(true);
    setActiveStep(1);
  };

  // Filtered Table Data
  const filteredData = (productList || []).filter(item => 
    (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={styles.container} style={{ padding: '24px 24px 0px 24px', maxWidth: '100%' }}>
      
      {/* ── MULTI-STEP MODAL ── */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.headerLeft}>
                <h2 className={styles.modalTitle}>Add New Product</h2>
                <span className={styles.modalSubtitle}>Fill in the details to publish your product</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Stepper */}
            <div className={styles.stepperContainer}>
              <div className={`${styles.stepItem} ${activeStep >= 1 ? styles.stepActive : ''}`}>
                <div className={styles.stepCircle}>1</div>
                <span>Info</span>
              </div>
              <div className={styles.stepLine}></div>
              <div className={`${styles.stepItem} ${activeStep >= 2 ? styles.stepActive : ''}`}>
                <div className={styles.stepCircle}>2</div>
                <span>Pricing</span>
              </div>
              <div className={styles.stepLine}></div>
              <div className={`${styles.stepItem} ${activeStep >= 3 ? styles.stepActive : ''}`}>
                <div className={styles.stepCircle}>3</div>
                <span>Media</span>
              </div>
              <div className={styles.stepLine}></div>
              <div className={`${styles.stepItem} ${activeStep >= 4 ? styles.stepActive : ''}`}>
                <div className={styles.stepCircle}>4</div>
                <span>SEO</span>
              </div>
            </div>
            
            <div className={styles.modalBody}>
              {/* STEP 1: BASIC INFO */}
              {activeStep === 1 && (
                <div className={styles.stepContent}>
                  <div className={styles.sectionHeader}><FaInfoCircle /> Basic Information</div>
                  <div className={styles.gridTwo}>
                    <div className={styles.formGroup}>
                      <label>Product Name*</label>
                      <input type="text" name="name" className={styles.inputControl} value={productForm.name} onChange={handleInputChange} placeholder="e.g. Wireless Buds" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Category</label>
                      <select name="category" className={styles.inputControl} value={productForm.category} onChange={handleInputChange}>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formGroupFull} style={{ marginTop: '16px' }}>
                    <label>Full Detailed Description</label>
                    <textarea 
                      name="description" className={styles.inputControl} style={{ minHeight: '120px' }}
                      value={productForm.description} onChange={handleInputChange} placeholder="Product features and specs..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: PRICING & STOCK */}
              {activeStep === 2 && (
                <div className={styles.stepContent}>
                  <div className={styles.sectionHeader}><FaRupeeSign /> Pricing & Inventory</div>
                  <div className={styles.gridThree}>
                    <div className={styles.formGroup}>
                      <label>Selling Price</label>
                      <input type="number" name="price" className={styles.inputControl} value={productForm.price} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Stock Qty</label>
                      <input type="number" name="quantity" className={styles.inputControl} value={productForm.quantity} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>GST %</label>
                      <input type="number" name="gst" className={styles.inputControl} value={productForm.gst} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className={styles.gridThree} style={{ marginTop: '16px' }}>
                    <div className={styles.formGroup}>
                      <label>Discount Value</label>
                      <input type="number" name="discount" className={styles.inputControl} value={productForm.discount} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>SKU Code</label>
                      <input type="text" name="sku" className={styles.inputControl} value={productForm.sku} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>HSN Code</label>
                      <input type="text" name="hsn" className={styles.inputControl} value={productForm.hsn} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA */}
              {activeStep === 3 && (
                <div className={styles.stepContent}>
                  <div className={styles.sectionHeader}><FaImages /> Media Gallery</div>
                  <div className={styles.uploadContainer}>
                    <input type="file" multiple id="prodImgs" className={styles.hiddenInput} onChange={handleImageUpload} />
                    <label htmlFor="prodImgs" className={styles.dropZone}>
                      <FaCloudUploadAlt className={styles.uploadIcon} />
                      <span>Upload Photos</span>
                    </label>
                    <div className={styles.imagePreviewRow}>
                      {productForm.images.map((img, i) => (
                        <div key={i} className={styles.previewThumb}>
                          <img src={img} alt="preview" />
                          <FaTimes className={styles.removeBtn} onClick={() => removeImage(i)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: TAGS & SEO */}
              {activeStep === 4 && (
                <div className={styles.stepContent}>
                  <div className={styles.sectionHeader}><FaTag /> SEO & Search</div>
                  <div className={styles.formGroupFull}>
                    <label>Keywords / Tags</label>
                    <div className={styles.tagsInputContainer}>
                      {productForm.labels.map((tag, i) => (
                        <span key={i} className={styles.tagChip}>{tag} <FaTimes onClick={() => removeTag(tag)} /></span>
                      ))}
                      <input 
                        type="text" className={styles.tagInnerInput} value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown}
                        placeholder="Type and press Enter"
                      />
                    </div>
                  </div>
                  <div className={styles.gridTwo} style={{ marginTop: '16px' }}>
                    <div className={styles.formGroup}>
                      <label>Product Slug</label>
                      <input type="text" name="link" className={styles.inputControl} value={productForm.link} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Origin Country</label>
                      <input type="text" name="origin" className={styles.inputControl} value={productForm.origin} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              {activeStep > 1 && <button className={styles.prevBtn} onClick={prevStep}>Back</button>}
              {activeStep < 4 ? (
                <button className={styles.nextBtn} onClick={nextStep}>Next Step <FaArrowRight /></button>
              ) : (
                <button className={styles.publishBtn} onClick={handleSave} disabled={isLoading}>
                  {isLoading ? <div className={styles.spinner}></div> : <><FaCheck /> Complete & Publish</>}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteModal.open && (
        <div className={styles.modalOverlay} onClick={() => setDeleteModal({ open: false, id: null })}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconBox}>
              <FaTrashAlt />
            </div>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this product? This action cannot be undone.</p>
            <div className={styles.deleteActionBtns}>
              <button className={styles.cancelBtn} onClick={() => setDeleteModal({ open: false, id: null })}>Cancel</button>
              <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRODUCT REPOSITORY TABLE ── */}
      <div className={styles.productCard} style={{ marginTop: 0, padding: '24px' }}>
        <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', paddingBottom: '16px', borderBottom: '1px solid #EDF2F7', marginBottom: '20px' }}>
          <div className={styles.cardHeaderLeft}>
            <h2 className={styles.pageTitle} style={{ fontSize: '1.25rem', margin: 0, border: 'none', padding: 0 }}>Add Product</h2>
            <p className={styles.pageSubtitle} style={{ marginTop: '4px' }}>View and manage all your shopping inventory</p>
          </div>
          <button onClick={openNewProductModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.2)' }}>
            <FaPlus /> New Product
          </button>
        </div>

        <div className={styles.topControls} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <div className={styles.rowsSelector}>
            <span>Show</span>
            <select className={styles.selectInput} value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>rows</span>
          </div>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" placeholder="Search by name or category..." className={styles.searchInput}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper} style={{ border: '1px solid #EDF2F7', borderRadius: '12px' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Status</th>
                <th>Product</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td>{startIndex + index + 1}</td>
                  <td><span className={styles.badgeActive}>{row.status}</span></td>
                  <td>
                    <div className={styles.prodInfo}>
                      <div className={styles.prodThumb}>
                        {row.images && row.images[0] ? <img src={row.images[0]} alt="p" /> : <FaBoxOpen />}
                      </div>
                      <span className={styles.fwBold}>{row.name}</span>
                    </div>
                  </td>
                  <td>{row.category}</td>
                  <td className={styles.amountText}>₹ {row.amount}</td>
                  <td>{row.date}</td>
                  <td>
                    <div className={styles.actionRow}>
                      <button className={styles.editBtn} title="Edit" onClick={() => handleEdit(row)}><FaEdit /></button>
                      <button className={styles.deleteBtn} title="Delete" onClick={() => confirmDelete(row.id)}><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={{ padding: 0, background: '#fff' }}>
                    <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
                      No products found
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
            <button className={styles.pageBtn} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><FaChevronLeft /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button key={num} className={`${styles.pageBtn} ${currentPage === num ? styles.pageActive : ''}`} onClick={() => setCurrentPage(num)}>{num}</button>
            ))}
            <button className={styles.pageBtn} disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}><FaChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

