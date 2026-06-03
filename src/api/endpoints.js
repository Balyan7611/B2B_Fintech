// src/api/endpoints.js
import { LoginRequestModel, LoginResponseModel } from '../models/authModel';
import { RoleRequestModel, RoleResponseModel } from '../models/roleModel';
import { apiService } from './httpClient';

export const API = {
    login: async (data) => {
        const res = await apiService.postWithSecurity('/UserAuth/LoginUser', data, LoginRequestModel);
        return LoginResponseModel(res);
    },
    
    getRoles: async () => {
        const res = await apiService.get('/Role');
        return RoleResponseModel(res);
    },
    
    getCompanyDetails: async (url) => {
        const response = await apiService.get(`/Company/get-by-url?url=${encodeURIComponent(url)}`);
        return response;
    },
    
    saveRole: async (data) => {
        const method = (data.id && data.id > 0) ? 'put' : 'post';
        const url = (method === 'put') ? '/Role/UpdateRole' : '/Role';
        const payload = RoleRequestModel(data, null);
        return await apiService[method](url, payload);
    },
    
    deleteRole: async (id) => {
        return await apiService.post(`/Role/DeleteRole/${id}`, {});
    }
};

export const fetchCompanyData = async (url) => {
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
};