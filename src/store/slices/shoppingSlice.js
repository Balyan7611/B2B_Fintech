import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryForm: {
    name: '',
    link: '',
    level: '',
    position: '',
    mainMenu: '',
    subMenu: '',
    icon: '',
    image: null,
  },
  productForm: {
    name: '',
    category: '',
    shortDesc: '',
    description: '',
    hsn: '',
    sku: '',
    barcode: '',
    origin: '',
    mediaType: 'Images', // Default
    images: [],
    videoUrl: '',
    weight: '',
    returnDays: '',
    labels: [],
    price: '',
    quantity: '',
    discount: '',
    isFlat: false,
    gst: '0',
  },
  productList: [
    { id: 1, status: 'Active', category: 'Electronics', name: 'iPhone 15 Pro', amount: '1,29,900', date: '15/09/2025' },
    { id: 2, status: 'Active', category: 'Fashion', name: 'Levi\'s 501 Jeans', amount: '3,499', date: '18/09/2025' },
  ],
  orderList: [
    { id: 1, memberId: 'MDT8597', name: 'VIVEK VARSHNEY', product: 'iPhone 15 Pro', photo: 'https://via.placeholder.com/40', price: '1,29,900', qty: 1, discount: '0', status: 'Pending', date: '20/09/2025' },
    { id: 2, memberId: 'Pay99DT5001', name: 'vivek', product: 'Levi\'s Jeans', photo: 'https://via.placeholder.com/40', price: '3,499', qty: 2, discount: '200', status: 'Delivered', date: '21/09/2025' },
  ],
  filters: {
    category: '',
    fromDate: '',
    toDate: '',
    status: '',
    search: '',
  },
  currentPage: 1,
  rowsPerPage: 10,
  categoryList: [
    { id: 1, active: true, name: 'Electronics', parentMenu: '—', level: '1' },
    { id: 2, active: true, name: 'Fashion', parentMenu: '—', level: '1' },
    { id: 3, active: false, name: 'Smartphones', parentMenu: 'Electronics', level: '2' },
  ],
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    updateCategoryForm: (state, action) => {
      state.categoryForm = { ...state.categoryForm, ...action.payload };
    },
    resetCategoryForm: (state) => {
      state.categoryForm = initialState.categoryForm;
    },
    toggleCategoryStatus: (state, action) => {
      const category = state.categoryList.find(c => c.id === action.payload);
      if (category) category.active = !category.active;
    },
    addCategory: (state, action) => {
      state.categoryList.push({
        id: state.categoryList.length + 1,
        active: true,
        ...action.payload
      });
    },
    deleteCategory: (state, action) => {
      state.categoryList = state.categoryList.filter(c => c.id !== action.payload);
    },
    updateProductForm: (state, action) => {
      state.productForm = { ...state.productForm, ...action.payload };
    },
    resetProductForm: (state) => {
      state.productForm = initialState.productForm;
    },
    addProduct: (state, action) => {
      state.productList.unshift({
        id: state.productList.length + 1,
        status: 'Active',
        date: new Date().toLocaleDateString('en-GB'),
        ...action.payload
      });
      state.productForm = initialState.productForm;
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter(p => p.id !== action.payload);
    },
    setEditingProduct: (state, action) => {
      state.productForm = { ...state.productForm, ...action.payload };
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      if (action.payload.page) state.currentPage = action.payload.page;
      if (action.payload.rows) state.rowsPerPage = action.payload.rows;
    }
  },
});

export const { 
  updateCategoryForm, 
  resetCategoryForm, 
  toggleCategoryStatus, 
  addCategory,
  deleteCategory,
  updateProductForm,
  resetProductForm,
  addProduct,
  deleteProduct,
  setEditingProduct,
  updateFilters,
  setPagination
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
