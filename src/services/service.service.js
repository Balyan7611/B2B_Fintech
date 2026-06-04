import { apiService } from '../api/httpClient';
import { ServiceRequestModel, ServiceResponseModel } from '../models/serviceModel';

export const ServiceManagementService = {
    getAll: async (isActive = null) => {
        let url = '/Service/get-all-services';
        if (isActive !== null) {
            url += `?isActive=${isActive}`;
        }
        const res = await apiService.post(url, {});
        return ServiceResponseModel(res);
    },
    
    getById: async (id) => {
        const res = await apiService.get(`/Service/get-service-by-id/${id}`);
        return ServiceResponseModel(res);
    }
};
