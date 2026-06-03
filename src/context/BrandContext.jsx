// src/context/BrandContext.js
import { createContext, useEffect, useState } from 'react';
import { fetchCompanyData } from '../api/endpoints';
import { SITE_CONFIG, updateSiteConfig } from '../config/siteConfig';

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
    const [brand, setBrand] = useState(SITE_CONFIG);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initBranding = async () => {
            try {
                const res = await fetchCompanyData(window.location.origin);
                if (res) {
                    updateSiteConfig(res);
                    setBrand({ ...SITE_CONFIG });
                }
            } catch (err) {
                console.error("Branding update failed", err);
            } finally {
                setLoading(false);
            }
        };
        initBranding();
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Company Details...</div>;
    }

    return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
};