import { apiService } from '../api/httpClient';

export const ServiceManagementService = {
    getAll: async (isActive = null) => {
        let url = '/Service/get-all-services';
        if (isActive !== null) {
            url += `?isActive=${isActive}`;
        }
        return await apiService.post(url, {});
    },
    
    getById: async (id) => {
        return await apiService.get(`/Service/get-service-by-id/${id}`);
    }
};
