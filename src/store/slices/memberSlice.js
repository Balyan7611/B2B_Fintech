import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staffList: [
    { id: 1, memberId: 'admin@gmail.com', name: 'Admin', email: 'sales@betasourcesoftware.com', mobile: '7611887834', doj: '09/08/2022', password: '•••••', tpin: '1234', active: true },
    { id: 2, memberId: 'honey123', name: 'honey', email: 'honey123123@gmail.com', mobile: '9782477712', doj: '04/06/2025', password: '•••••', tpin: '1234', active: true },
  ],
  staffForm: {
    role: '', name: '', age: '', email: '', mobile: '', loginId: '',
    loginPin: '', password: '', pan: '', aadhar: '', address: '', pincode: '', active: true
  },
  isDrawerOpen: false,
  editingStaff: null,
  changePassword: {
    member: '',
    newPass: '',
    confirmPass: '',
  },
  tpinState: {
    member: '',
    tpin: ['', '', '', ''],
    confirmTpin: ['', '', '', ''],
  },
  securityState: {
    globalToggles: { twoWay: true, otp: false, tpin: false },
    memberList: [
      { id: 1, name: 'Pay99RT4190', memberId: '—', twoWay: true, otp: false, tpin: false },
      { id: 2, name: 'Pay99RT4193', memberId: '—', twoWay: true, otp: false, tpin: false },
      { id: 3, name: 'Pay99RT4200', memberId: '—', twoWay: true, otp: false, tpin: false },
      { id: 4, name: 'Pay99RT4254', memberId: '—', twoWay: true, otp: false, tpin: false },
      { id: 5, name: 'Pay99RT4521', memberId: '—', twoWay: true, otp: false, tpin: false },
      { id: 6, name: 'Aabid Hussain', memberId: 'Pay99RT4412', twoWay: true, otp: false, tpin: false },
      { id: 7, name: 'Aakash', memberId: 'Pay99RT4477', twoWay: true, otp: false, tpin: false },
      { id: 8, name: 'Aakash Gautam', memberId: 'Pay99RT4489', twoWay: true, otp: false, tpin: false },
      { id: 9, name: 'Aakash Tyagi', memberId: 'Pay99RT4547', twoWay: true, otp: false, tpin: false },
      { id: 10, name: 'Askib', memberId: 'Pay99RT4528', twoWay: true, otp: false, tpin: false },
    ]
  },
  creditLimitState: {
    form: { memberId: '', amount: '0', narration: '', mode: '' },
    list: [
      { id: 1, member: 'VIVEK VARSHNEY (MDT8597)', amount: '5000', narration: 'Opening credit', factor: 'Add', date: '25/09/2025' },
    ]
  },
  manageMemberState: {
    filters: { fromDate: '', toDate: '', role: '', search: '', memberType: 'All', kycStatus: 'All' },
    list: [
      { 
        id: 1, memberId: 'RT705 Neno [6377749427]', name: 'vishnu prajapat', city: 'jaipur', 
        parent: 'VIVEK VARSHNEY 100000', mobile: '6377749427', aepsStatus: 'Not Registered',
        email: 'vishnusiroya485@gmail.com', altMobile: '6377749427', shop: 'Neno',
        aadhar: '121212121212', pan: '12342423', dob: '30/04/2026', doj: '30/04/2026 14:39:54',
        joinedBy: '100000 Pay99 [9999999999]', password: 'System.Byte[]', pin: '9327', source: 'Web',
        mainBal: '0.00', aepsBal: '0.00', holdAmt: '0'
      },
      { 
        id: 2, memberId: 'RT992 Rahul [9876543210]', name: 'Rahul Sharma', city: 'Delhi', 
        parent: 'ADMIN 100000', mobile: '9876543210', aepsStatus: 'Registered',
        email: 'rahul.sharma@example.com', altMobile: '9876543210', shop: 'Rahul Traders',
        aadhar: '987698769876', pan: 'ABCDE1234F', dob: '15/08/1995', doj: '02/05/2025 10:20:15',
        joinedBy: 'Admin', password: '••••••••', pin: '4521', source: 'App',
        mainBal: '5420.50', aepsBal: '1250.00', holdAmt: '500'
      }
    ]
  },
  registrationState: {
    currentStep: 1,
    form: {
      role: '', upline: '', packageId: '',
      title: 'Mr', gender: 'Male', name: '', aadhar: '', pan: '', dob: '', mobile: '', whatsapp: '', email: '',
      address1: '', pincode: '', postOffice: '', city: '', state: '',
      businessName: '', bizAddress: '', bizPincode: '', bizPostOffice: '', bizCity: '', bizState: ''
    }
  },
  tidState: {
    form: { member: '', status: '', aepsid: '', mobile: '0', pin: '0', lat: '0.00', lng: '0.00' },
    list: [
      { id: 1, member: 'RT1236 Sachin Balyan [6377487868]', aepsid: 'd', bank: 'bank6', status: 'Accepted', mobile: '6377487868', pin: '0', lat: '0.00', lng: '0.00' },
      { id: 2, member: 'Pay99DT5001 vivek varshney [9355196019]', aepsid: '129253', bank: 'bank6', status: 'Accepted', mobile: '9355196019', pin: '0', lat: '0.00', lng: '0.00' },
      { id: 3, member: 'Pay99RT4003 vivek varshney [8700683809]', aepsid: '129252', bank: 'bank6', status: 'Accepted', mobile: '9716800202', pin: '0', lat: '28.37', lng: '77.28' },
      { id: 4, member: 'Pay99RT4005 Satish Kumar [8700294647]', aepsid: '490871', bank: 'bank6', status: 'Accepted', mobile: '8700294647', pin: '0', lat: '0.00', lng: '0.00' },
      { id: 5, member: 'Pay99RT4006 Rohit [9560931035]', aepsid: '137741', bank: 'bank6', status: 'Accepted', mobile: '0', pin: '0', lat: '28.37', lng: '77.27' },
      { id: 6, member: 'Pay99RT4008 Chaman Lal [9899729232]', aepsid: '130077', bank: 'bank6', status: 'Accepted', mobile: '9899729232', pin: '0', lat: '0.00', lng: '0.00' },
      { id: 7, member: 'Pay99RT4011 Gaurav Kumar [7017250455]', aepsid: '279211', bank: 'bank6', status: 'Accepted', mobile: '7017250455', pin: '0', lat: '0.00', lng: '0.00' },
      { id: 8, member: 'Pay99RT4013 Prakash Singh Singwal [8881550888]', aepsid: '475607', bank: 'bank6', status: 'Accepted', mobile: '8881550888', pin: '0', lat: '0.00', lng: '0.00' },
      { id: 9, member: 'Pay99RT4014 Pooja Tomar [8826396131]', aepsid: '455252', bank: 'bank6', status: 'Accepted', mobile: '8826396131', pin: '0', lat: '0.00', lng: '0.00' },
    ],
    isDrawerOpen: false,
    selectedTid: null
  }
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.isDrawerOpen = action.payload;
      if (!action.payload) state.editingStaff = null;
    },
    setEditingStaff: (state, action) => {
      state.editingStaff = action.payload;
      if (action.payload) {
        state.staffForm = { ...action.payload };
      }
      state.isDrawerOpen = true;
    },
    updateStaffForm: (state, action) => {
      state.staffForm = { ...state.staffForm, ...action.payload };
    },
    resetStaffForm: (state) => {
      state.staffForm = { ...initialState.staffForm, loginId: 'EMP' + Math.floor(Math.random()*9000 + 1000) };
    },
    addStaff: (state, action) => {
      state.staffList.unshift({
        id: Date.now(),
        ...action.payload,
        doj: new Date().toLocaleDateString('en-GB')
      });
    },
    updateStaff: (state, action) => {
      const index = state.staffList.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.staffList[index] = { ...state.staffList[index], ...action.payload };
      }
    },
    deleteStaff: (state, action) => {
      state.staffList = state.staffList.filter(s => s.id !== action.payload);
    },
    updateChangePassword: (state, action) => {
      state.changePassword = { ...state.changePassword, ...action.payload };
    },
    toggleStaffStatus: (state, action) => {
      const staff = state.staffList.find(s => s.id === action.payload);
      if (staff) staff.active = !staff.active;
    },
    updateTpin: (state, action) => {
      state.tpinState = { ...state.tpinState, ...action.payload };
    },
    updateSecurityToggle: (state, action) => {
      const { id, field } = action.payload;
      if (id === 'global') {
        state.securityState.globalToggles[field] = !state.securityState.globalToggles[field];
      } else {
        const member = state.securityState.memberList.find(m => m.id === id);
        if (member) member[field] = !member[field];
      }
    },
    updateCreditLimitForm: (state, action) => {
      state.creditLimitState.form = { ...state.creditLimitState.form, ...action.payload };
    },
    addCreditLimit: (state, action) => {
      state.creditLimitState.list.unshift({
        id: Date.now(),
        ...action.payload,
        date: new Date().toLocaleDateString('en-GB')
      });
      state.creditLimitState.form = { memberId: '', amount: '0', narration: '', mode: '' };
    },
    updateRegistrationForm: (state, action) => {
      state.registrationState.form = { ...state.registrationState.form, ...action.payload };
    },
    setRegStep: (state, action) => {
      state.registrationState.currentStep = action.payload;
    },
    addMember: (state, action) => {
      state.manageMemberState.list.unshift({
        id: Date.now(),
        ...action.payload,
        doj: new Date().toLocaleString('en-GB'),
        mainBal: '0.00',
        aepsBal: '0.00',
        holdAmt: '0'
      });
      state.registrationState.form = initialState.registrationState.form;
      state.registrationState.currentStep = 1;
    },
    updateManageMemberFilters: (state, action) => {
      state.manageMemberState.filters = { ...state.manageMemberState.filters, ...action.payload };
    },
    updateTidForm: (state, action) => {
      state.tidState.form = { ...state.tidState.form, ...action.payload };
    },
    toggleTidDrawer: (state, action) => {
      state.tidState.isDrawerOpen = action.payload;
    },
    setEditingTid: (state, action) => {
      state.tidState.selectedTid = action.payload;
      state.tidState.isDrawerOpen = true;
    },
    deleteTid: (state, action) => {
      state.tidState.list = state.tidState.list.filter(t => t.id !== action.payload);
    },
    updateMemberDirect: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.manageMemberState.list.findIndex(m => m.id === id);
      if (index !== -1) {
        state.manageMemberState.list[index] = {
          ...state.manageMemberState.list[index],
          ...updates
        };
      }
    },
    deleteMember: (state, action) => {
      state.manageMemberState.list = state.manageMemberState.list.filter(m => m.id !== action.payload);
    }
  }
});

export const { 
  toggleDrawer, setEditingStaff, updateStaffForm, 
  resetStaffForm, addStaff, updateStaff, deleteStaff, updateChangePassword, toggleStaffStatus,
  updateTpin, updateSecurityToggle, updateCreditLimitForm, addCreditLimit,
  updateRegistrationForm, setRegStep, addMember, updateManageMemberFilters,
  updateTidForm, toggleTidDrawer, setEditingTid, deleteTid, updateMemberDirect, deleteMember
} = memberSlice.actions;

export default memberSlice.reducer;
