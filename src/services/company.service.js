import httpClient from '../api/httpClient';

export const fetchCompanyData = async (url) => {
    try {
        //const res = await httpClient.get(`/Company/get-by-url?url=${encodeURIComponent(url)}`);
        const res = await httpClient.get(`/Company/get-by-url?url=http://localhost:3000/`);
        if (!res.data.status) throw new Error("Branding fetch failed");
        
        return {
            ...res.data.data,
            primaryColor: res.data.data.headerColor,
            socialLinks: {
                fb: res.data.data.faceBook,
                wa: res.data.data.whastApp
            }
        };
    } catch (err) {
        return null;
    }
};