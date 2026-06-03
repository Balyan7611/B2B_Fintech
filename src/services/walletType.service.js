import { apiService } from '../api/httpClient';

export const WalletTypeService = {
    getAll: async () => {
        return await apiService.get('/WalletType');
    },
    
    getById: async (id) => {
        return await apiService.get(`/WalletType/${id}`);
    },
    
    create: async (data) => {
        return await apiService.post('/WalletType', data);
    },
    
    update: async (data) => {
        return await apiService.put('/WalletType', data);
    }
};
