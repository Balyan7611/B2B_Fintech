import { createSlice } from '@reduxjs/toolkit';
import { SITE_CONFIG } from '../../config/siteConfig';

const SAMPLE_DATA = [
  { id: 1, ticketId: 'Ticket 17', loginId: 'Pay99RT4003', name: 'Vivek Varshney', service: 'Recharge', message: 'recharge not work', date: '19/04/2025', status: 'Pending', approveDate: '-' },
  { id: 2, ticketId: 'Ticket 18', loginId: 'Pay99RT4003', name: 'Vivek Varshney', service: 'DL Verification', message: 'it', date: '19/04/2025', status: 'Approved', approveDate: '20/04/2025' },
  { id: 3, ticketId: 'Ticket 22', loginId: 'Pay99RT4003', name: 'Vivek Varshney', service: 'Recharge', message: 'gg', date: '29/04/2025', status: 'Pending', approveDate: '-' },
  { id: 4, ticketId: 'Ticket 23', loginId: 'Pay99RT4003', name: 'Vivek Varshney', service: 'Internet', message: 'poopvrtqrqvcc', date: '29/04/2025', status: 'Pending', approveDate: '-' },
  { id: 5, ticketId: 'Ticket 24', loginId: 'Pay99RT4003', name: 'Vivek Varshney', service: 'Recharge', message: 'good recharge service', date: '29/04/2025', status: 'Pending', approveDate: '-' },
  { id: 6, ticketId: 'Ticket 25', loginId: 'Pay99RT4008', name: 'Rohit', service: 'Recharge', message: 'very good', date: '30/04/2025', status: 'Pending', approveDate: '-' },
  { id: 7, ticketId: 'Ticket 1', loginId: 'Pay99RT4015', name: 'Vikram', service: 'AEPS', message: 'active my id', date: '18/03/2025', status: 'Pending', approveDate: '-' },
  { id: 8, ticketId: 'Ticket 2', loginId: 'Pay99RT4015', name: 'Vikram', service: 'Aadhar Pay', message: 'not working', date: '25/03/2025', status: 'Pending', approveDate: '-' },
  { id: 9, ticketId: 'Ticket 4', loginId: 'Pay99RT4015', name: 'Vikram', service: 'AEPS', message: 'not working', date: '01/04/2025', status: 'Pending', approveDate: '-' },
  { id: 10, ticketId: 'Ticket 13', loginId: 'Pay99RT4049', name: 'Satyendra Kumar Ravi', service: 'Recharge', message: '', date: '19/04/2025', status: 'Pending', approveDate: '-' },
];

const MANAGE_SUPPORT_SAMPLE = [
  {
    id: 1,
    name: 'Support',
    description: `<p><strong>WELCOME TO ${SITE_CONFIG.brandName}</strong></p><p>Support available 10 to 7 PM</p><p>Call no. = ${SITE_CONFIG.phone}</p><p>WhatsApp no. = ${SITE_CONFIG.phone}</p>`,
    status: 'Active',
    addDate: '27/03/2025 15:03',
  },
];

const getFormattedDate = () => {
  const d = new Date();
  const pad = n => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const initialState = {
  complainList: SAMPLE_DATA,
  currentPage: 1,
  rowsPerPage: 10,
  searchQuery: '',
  filterStatus: 'All',

  // Manage Support (Add Support page)
  manageSupportList: MANAGE_SUPPORT_SAMPLE,
  addSupportPage: 1,
  addSupportRows: 10,
  addSupportSearch: '',

  // Chat Popup
  isChatOpen: false,
  activeChatTicket: null,
  chatMessages: {},   // keyed by ticket id: { [id]: [{sender, text, time}] }
  chatInput: '',
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    // Complain List reducers
    setCurrentPage: (state, action) => { state.currentPage = action.payload; },
    setRowsPerPage: (state, action) => { state.rowsPerPage = action.payload; state.currentPage = 1; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; state.currentPage = 1; },
    setFilterStatus: (state, action) => { state.filterStatus = action.payload; state.currentPage = 1; },
    updateTicketStatus: (state, action) => {
      const { id, status } = action.payload;
      const ticket = state.complainList.find(t => t.id === id);
      if (ticket) {
        ticket.status = status;
        if (status === 'Approved' || status === 'Rejected') {
          const today = new Date();
          ticket.approveDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        }
      }
    },

    // Manage Support reducers
    addSupportEntry: (state, action) => {
      const newEntry = {
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description,
        status: 'Active',
        addDate: getFormattedDate(),
      };
      state.manageSupportList.unshift(newEntry);
    },
    updateSupportEntry: (state, action) => {
      const { id, name, description } = action.payload;
      const entry = state.manageSupportList.find(e => e.id === id);
      if (entry) {
        entry.name = name;
        entry.description = description;
      }
    },
    deleteSupportEntry: (state, action) => {
      state.manageSupportList = state.manageSupportList.filter(e => e.id !== action.payload);
    },
    toggleSupportStatus: (state, action) => {
      const entry = state.manageSupportList.find(e => e.id === action.payload);
      if (entry) {
        entry.status = entry.status === 'Active' ? 'InActive' : 'Active';
      }
    },
    setAddSupportPage: (state, action) => { state.addSupportPage = action.payload; },
    setAddSupportRows: (state, action) => { state.addSupportRows = action.payload; state.addSupportPage = 1; },
    setAddSupportSearch: (state, action) => { state.addSupportSearch = action.payload; state.addSupportPage = 1; },

    // Chat reducers
    openChat: (state, action) => {
      const ticket = action.payload;
      state.isChatOpen = true;
      state.activeChatTicket = ticket;
      state.chatInput = '';
      // Seed default messages if none exist for this ticket
      if (!state.chatMessages[ticket.id]) {
        state.chatMessages[ticket.id] = [
          { sender: 'user', text: ticket.message || 'Hello, I need help.', time: '10:30 AM' },
          { sender: 'admin', text: 'Please share your mobile number.', time: '10:32 AM' },
          { sender: 'user', text: '9876543210', time: '10:33 AM' },
        ];
      }
    },
    closeChat: (state) => {
      state.isChatOpen = false;
      state.activeChatTicket = null;
      state.chatInput = '';
    },
    sendChatMessage: (state, action) => {
      const { ticketId, text } = action.payload;
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const time = `${hours % 12 || 12}:${mins} ${ampm}`;
      if (!state.chatMessages[ticketId]) state.chatMessages[ticketId] = [];
      state.chatMessages[ticketId].push({ sender: 'admin', text, time });
      state.chatInput = '';
    },
    setChatInput: (state, action) => { state.chatInput = action.payload; },
  },
});

export const {
  setCurrentPage, setRowsPerPage, setSearchQuery, setFilterStatus, updateTicketStatus,
  addSupportEntry, updateSupportEntry, deleteSupportEntry, toggleSupportStatus,
  setAddSupportPage, setAddSupportRows, setAddSupportSearch,
  openChat, closeChat, sendChatMessage, setChatInput,
} = supportSlice.actions;

export default supportSlice.reducer;
