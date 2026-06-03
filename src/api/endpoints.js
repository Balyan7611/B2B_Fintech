// src/api/endpoints.js
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/RoleService';
import { CompanyService } from '../services/company.service';

// Re-exporting everything exactly as before to maintain backward compatibility
export const API = {
    login: AuthService.login,
    getRoles: RoleService.getRoles,
    getMasterRoles: RoleService.getMasterRoles,
    getCompanyDetails: CompanyService.getCompanyDetails,
    saveRole: RoleService.saveRole,
    deleteRole: RoleService.deleteRole
};

export const fetchCompanyData = CompanyService.fetchCompanyData;