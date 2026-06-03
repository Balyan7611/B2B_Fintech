// Route Protection
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../utils/authUtils';

export const checkAuth = (token, requiredRole) => {
    if (!token) return { isAuth: false, redirect: '/member/login' };

    const decoded = decodeToken(token);
    if (!decoded) return { isAuth: false, redirect: '/member/login' };

    // Role check: Admin (1) ya Member (2)
    if (decoded.role !== requiredRole) {
        return { isAuth: false, redirect: decoded.role === '1' ? '/admin/dashboard' : '/member/dashboard' };
    }

    return { isAuth: true };
};

export const AuthGuard = ({ children, role }) => {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('access_token');
    const status = checkAuth(token, role);

    if (!status.isAuth) {
        return <Navigate to={status.redirect} replace />;
    }
    return children;
};