import { createSlice } from '@reduxjs/toolkit';

const HOLD_DATA = [
  { id: 1, name: 'Sachin Balyan', memberId: 'RT1236', amount: '100.00', reason: 'test', date: '15/09/2025 14:34' },
  { id: 2, name: 'Sachin Balyan', memberId: 'RT1236', amount: '200.00', reason: 'test', date: '15/09/2025 15:09' },
  { id: 3, name: 'Vivek Varshney', memberId: 'Pay99RT4003', amount: '1000.00', reason: 'VIVEK', date: '07/04/2025 17:08' },
  { id: 4, name: 'Vivek Varshney', memberId: 'Pay99RT4003', amount: '1.00', reason: 'ddd', date: '21/04/2025 11:11' },
  { id: 5, name: 'Vivek Varshney', memberId: 'Pay99RT4003', amount: '2.00', reason: 'admin', date: '21/04/2025 12:56' },
  { id: 6, name: 'Naruto', memberId: 'Pay99DT5048', amount: '1000.00', reason: 'i want you spend only this', date: '06/06/2025 17:19' },
];

const BANK_DATA = [
  { id: 1, active: true, bankName: 'ICICI Bank', branchName: 'SURAJKUND', accountHolder: 'VIRAT COMMUNICATION SERVICES INDIA PVT LTD', accountNumber: '184205500409', ifsc: 'ICIC0001842', billingInfo: 'Only cash deposit', charge: '0.00' },
  { id: 2, active: true, bankName: 'Equitas Small Finance Bank', branchName: 'EQUITAS TREASURY', accountHolder: 'VIRAT COMMUNICATION...', accountNumber: '200001962612', ifsc: 'ESFB0000002', billingInfo: 'online payment only retailer account', charge: '0.00' },
  { id: 3, active: true, bankName: 'Punjab National Bank', branchName: 'FARIDABAD NIT', accountHolder: 'VIRAT COMMUNICATION...', accountNumber: '0167002100194456', ifsc: 'PUNB0016700', billingInfo: 'only cash deposit', charge: '0.00' },
  { id: 4, active: true, bankName: 'State Bank of India', branchName: 'FARIDABAD NIT', accountHolder: 'VIRAT COMMUNICATION...', accountNumber: '40683257393', ifsc: '-', billingInfo: 'only cash deposit', charge: '0.00' },
];

const MASTER_BANKS = [
  { id: 1, name: 'Axis Bank', ifsc: 'UTIB0000003' },
  { id: 2, name: 'Bank of Baroda', ifsc: 'BARB0AAMBUR' },
  { id: 3, name: 'Bank of India', ifsc: 'BKID0000001' },
  { id: 4, name: 'Central Bank of India', ifsc: 'CBIN0283527' },
  { id: 5, name: 'Citibank', ifsc: 'CITI0000001' },
  { id: 6, name: 'HDFC Bank', ifsc: 'HDFC0000001' },
  { id: 7, name: 'ICICI Bank', ifsc: 'ICIC0000001' },
  { id: 8, name: 'IDBI Bank', ifsc: 'IBKL0000001' },
  { id: 9, name: 'Indian Bank', ifsc: 'IDIB000A001' },
  { id: 10, name: 'Indian Overseas Bank', ifsc: 'IOBA0000002' },
  { id: 11, name: 'Kotak Mahindra Bank', ifsc: 'KKBK0000001' },
  { id: 12, name: 'Punjab National Bank', ifsc: 'PUNB0016700' },
  { id: 13, name: 'State Bank of India', ifsc: 'SBIN0000001' },
  { id: 14, name: 'Union Bank of India', ifsc: 'UBIN0531200' },
  { id: 15, name: 'Yes Bank', ifsc: 'YESB0000001' },
  { id: 16, name: 'Canara Bank', ifsc: 'CNRB0000001' },
  { id: 17, name: 'Federal Bank', ifsc: 'FDRL0000001' },
  { id: 18, name: 'IndusInd Bank', ifsc: 'INDB0000001' },
  { id: 19, name: 'RBL Bank', ifsc: 'RATN0000001' },
  { id: 20, name: 'Equitas Small Finance', ifsc: 'ESFB0000002' },
];

const MEMBER_BANK_DATA = [
  { id: 1, name: 'VIVEK VARSHNEY', memberId: 'MDT8597', bankName: 'Kotak Mahindra Bank', ifsc: 'KKBK0005033', branch: 'NOIDA', accNo: '5846972399', date: '07/03/2025', status: 'Active' },
  { id: 2, name: 'VIVEK VARSHNEY', memberId: 'MDT8597', bankName: 'Kotak Mahindra Bank', ifsc: 'KKBK0005033', branch: 'NOIDA', accNo: '5846972399', date: '07/03/2025', status: 'InActive' },
  { id: 3, name: 'vivek', memberId: 'Pay99DT5001', bankName: 'Kotak Mahindra Bank', ifsc: 'KKBK0005033', branch: 'NOIDA', accNo: '5846972399', date: '08/03/2025', status: 'Active' },
  { id: 4, name: 'vivek', memberId: 'Pay99DT5001', bankName: 'Kotak Mahindra Bank', ifsc: 'KKBK0005033', branch: 'NOIDA', accNo: '5846972399', date: '08/03/2025', status: 'Active' },
  { id: 5, name: 'vivek', memberId: 'Pay99RT4003', bankName: 'Kotak Mahindra Bank', ifsc: 'KKBK0005033', branch: 'NOIDA', accNo: '5846972399', date: '08/03/2025', status: 'Active' },
];

const FUND_REQUEST_DATA = [
  { id: 1, memberId: 'Pay99RT4003', amount: '1000.00', companyBankName: 'ICICI Bank', bankRefId: 'REF123456789', paymentDate: '15/09/2025', paymentMode: 'IMPS', remark: 'Urgent fund', status: 'Pending', reason: '-', addDate: '15/09/2025', approveRejectDate: '-', cashSlip: 'slip_01.jpg', indemnityBond: 'bond_01.pdf' },
  { id: 2, memberId: 'MDT8597', amount: '5000.00', companyBankName: 'State Bank of India', bankRefId: 'SBIN987654321', paymentDate: '14/09/2025', paymentMode: 'NEFT', remark: 'Wallet topup', status: 'Approved', reason: 'Verified', addDate: '14/09/2025', approveRejectDate: '15/09/2025', cashSlip: 'slip_02.jpg', indemnityBond: 'bond_02.pdf' },
];

const TRANSFER_DATA = [
  { id: 1, userText: '100000 VIVEK VARSHNEY', mobile: '9999999999', bal: '0.00', aepsBal: '0.00', creditLimit: '0.00' },
  { id: 2, userText: 'RT1236 Sachin Balyan', mobile: '6377487868', bal: '1000.00', aepsBal: '0.00', creditLimit: '0.00' },
  { id: 3, userText: 'MDT8597 vivek varshney', mobile: '9354821335', bal: '0.00', aepsBal: '389.55', creditLimit: '0.00' },
  { id: 4, userText: 'Pay99RT4002 vipin soni', mobile: '8005575599', bal: '0.00', aepsBal: '0.00', creditLimit: '0.00' },
  { id: 5, userText: 'Pay99DT5001 vivek varshney', mobile: '9355196019', bal: '0.00', aepsBal: '779.10', creditLimit: '0.00' },
];

const initialState = {
  holdAmountList: HOLD_DATA,
  companyBankList: BANK_DATA,
  addBankList: MASTER_BANKS,
  memberBankList: MEMBER_BANK_DATA,
  fundRequestList: FUND_REQUEST_DATA,
  transferList: TRANSFER_DATA,
  addBankSearchQuery: '',
  addBankSelectedBank: null,
  addBankIsPanelOpen: false,
  addBankIsActive: true,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    toggleBankActive: (state, action) => {
      const bank = state.companyBankList.find(b => b.id === action.payload);
      if (bank) {
        bank.active = !bank.active;
      }
    },
    setAddBankSearchQuery: (state, action) => { state.addBankSearchQuery = action.payload; },
    setAddBankSelectedBank: (state, action) => { state.addBankSelectedBank = action.payload; },
    setAddBankIsPanelOpen: (state, action) => { state.addBankIsPanelOpen = action.payload; },
    setAddBankIsActive: (state, action) => { state.addBankIsActive = action.payload; },
    addHoldAmount: (state, action) => {
      state.holdAmountList.unshift({
        id: Date.now(),
        ...action.payload,
        date: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
      });
    },
    deleteHoldAmount: (state, action) => {
      state.holdAmountList = state.holdAmountList.filter(item => item.id !== action.payload);
    },
    updateHoldAmount: (state, action) => {
      const index = state.holdAmountList.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.holdAmountList[index] = {
          ...state.holdAmountList[index],
          ...action.payload
        };
      }
    },
    toggleMemberBankStatus: (state, action) => {
      const bank = state.memberBankList.find(b => b.id === action.payload);
      if (bank) {
        bank.status = bank.status === 'Active' ? 'InActive' : 'Active';
      }
    },
    updateFundRequestStatus: (state, action) => {
      const { id, status, reason, date } = action.payload;
      const req = state.fundRequestList.find(r => r.id === id);
      if (req) {
        req.status = status;
        req.reason = reason;
        req.approveRejectDate = date;
      }
    },
  },
});

export const { 
  toggleBankActive, 
  setAddBankSearchQuery, 
  setAddBankSelectedBank, 
  setAddBankIsPanelOpen, 
  setAddBankIsActive,
  addHoldAmount,
  deleteHoldAmount,
  updateHoldAmount,
  toggleMemberBankStatus,
  updateFundRequestStatus
} = balanceSlice.actions;
export default balanceSlice.reducer;
