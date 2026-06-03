import { apiService } from '../api/httpClient';

export const BankService = {
    getAll: async (params = {}) => {
        const payload = {
            pageNumber: params.pageNumber || 1,
            pageSize: params.pageSize || 100,
            fromDate: params.fromDate || null,
            toDate: params.toDate || null,
            status: params.status || null,
            memberID: params.memberID || 0
        };
        return await apiService.post('/BankMaster/AllBankMaster', payload);
    },
    
    getById: async (id) => {
        return await apiService.get(`/BankMaster/${id}`);
    },
    
    create: async (data) => {
        return await apiService.post('/BankMaster', data);
    },
    
    update: async (data) => {
        return await apiService.put('/BankMaster', data);
    }
};
