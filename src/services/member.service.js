import { apiService } from '../api/httpClient';
import { MemberRequestModel } from '../models/memberModel';
import { MemberSearchResponseModel } from '../models/memberSearchModel';

export const MemberService = {
    createMember: async (data) => {
        const payload = MemberRequestModel(data);
        return await apiService.post('/Member/create-member', payload);
    },

    searchMember: async (searchQuery, isActive = '') => {
        const res = await apiService.get(`/Member/MemberSearch?isActive=${isActive}&Search=${searchQuery}`);
        return MemberSearchResponseModel(res);
    },

    search: async (searchQuery, isActive = '') => {
        return await MemberService.searchMember(searchQuery, isActive);
    },

    // Paginated get-all with filters
    getAll: async ({ pageNumber = 1, pageSize = 10, search = '', roleId = 0, isActive = null, isKycApproved = null, fromDate = '', toDate = '' } = {}) => {
        const payload = {
            pageNumber,
            pageSize,
            roleId: roleId ? parseInt(roleId) : 0,
            search: search || '',
        };
        if (isActive !== null) payload.isActive = isActive;
        if (isKycApproved !== null) payload.isKycApproved = isKycApproved;
        if (fromDate) payload.fromDate = fromDate;
        if (toDate) payload.toDate = toDate;
        return await apiService.post('/Member/get-all-members', payload);
    },

    updateMember: async (id, data) => {
        return await apiService.put(`/Member/update-member/${id}`, data);
    }
};
