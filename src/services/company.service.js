import { apiService } from '../api/httpClient';

export const CompanyService = {
    getCompanyDetails: async (url) => {
        const response = await apiService.get(`/Company/get-by-url?url=${encodeURIComponent(url)}`);
        return response;
    },

    fetchCompanyData: async (url) => {
        try {
            const res = await apiService.get(`/Company/get-by-url?url=${encodeURIComponent(url)}`);
            if (!res.status) throw new Error("Branding fetch failed");
            return {
                ...res.data,
                primaryColor: res.data?.headerColor,
                socialLinks: {
                    fb: res.data?.faceBook,
                    wa: res.data?.whastApp
                }
            };
        } catch (err) {
            console.error("Company fetch error:", err);
            return null;
        }
    },

    // Standard CRUD placeholders for future scaling
    getAll: async () => {
        return await apiService.get('/Company/get-all');
    },
    getById: async (id) => {
        return await apiService.get(`/Company/get-by-id/${id}`);
    },
    create: async (data) => {
        // Not in OpenAPI collection but keeping signature
        return data;
    },
    update: async (id, data) => {
        // Not in OpenAPI collection but keeping signature
        return data;
    },
    delete: async (id) => {
        return await apiService.delete(`/Company/delete/${id}`);
    },
    toggleStatus: async (id) => {
        return await apiService.patch(`/Company/toggle-status/${id}`, {});
    }
};