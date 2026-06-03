import { apiService } from '../api/httpClient';

export const GenderService = {
    getAll: async () => {
        return await apiService.get('/Gender');
    },
    
    getById: async (id) => {
        return await apiService.get(`/Gender/${id}`);
    }
};
