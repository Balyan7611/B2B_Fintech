import { apiService } from '../api/httpClient';

export const ServiceManagementService = {
    // Returns raw API response so component can access res.status and res.data directly
    getAll: async (isActive = null) => {
        let url = '/Service/get-all-services';
        if (isActive !== null) {
            url += `?isActive=${isActive}`;
        }
        return await apiService.post(url, {});
    },

    getById: async (id) => {
        return await apiService.get(`/Service/get-service-by-id/${id}`);
    },

    create: async (payload) => {
        return await apiService.post('/Service/create-service', payload);
    },

    update: async (id, payload) => {
        return await apiService.put(`/Service/update-service/${id}`, payload);
    }
};
