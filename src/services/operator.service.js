import { apiService } from '../api/httpClient';

export const OperatorService = {
    getAll: async (params = {}) => {
        const payload = {
            pageNumber: params.pageNumber || 1,
            pageSize: params.pageSize || 100,
            fromDate: params.fromDate || null,
            toDate: params.toDate || null,
            status: params.status || null,
            memberID: params.memberID || 0
        };
        return await apiService.post('/Operator/Alloperator', payload);
    },
    
    getById: async (id) => {
        return await apiService.get(`/Operator/${id}`);
    },
    
    create: async (formData) => {
        return await apiService.postForm('/Operator/create', formData);
    },
    
    update: async (formData) => {
        return await apiService.putForm('/Operator/update', formData);
    }
};
