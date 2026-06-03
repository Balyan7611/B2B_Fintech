// src/api/httpClient.js
import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://api.sahayatamoney.in/api',
    headers: { 'Content-Type': 'application/json' }
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const getSecurityData = async () => {
    const ipRes = await fetch('https://api.ipify.org?format=json').catch(() => ({ ip: '0.0.0.0' }));
    const ipData = await ipRes.json();
    
    const getLocation = () => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({ 
                    latitude: 0, 
                    longitude: 0, 
                    accuracy: 0, 
                    allowed: false, 
                    error: 'Browser does not support geolocation' 
                });
            } else {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                        allowed: true
                    }),
                    (error) => {
                        let errorMsg = '';
                        switch(error.code) {
                            case 1:
                                errorMsg = 'Location access denied. Please enable location to login.';
                                break;
                            case 2:
                                errorMsg = 'Location unavailable. Please check your device settings.';
                                break;
                            case 3:
                                errorMsg = 'Location request timeout. Please try again.';
                                break;
                            default:
                                errorMsg = error.message;
                        }
                        resolve({ 
                            latitude: 0, 
                            longitude: 0, 
                            accuracy: 0, 
                            allowed: false,
                            error: errorMsg
                        });
                    },
                    { timeout: 10000, enableHighAccuracy: true }
                );
            }
        });
    };

    const loc = await getLocation();

    return {
        ip: ipData.ip || '0.0.0.0',
        deviceInfo: {
            browser: navigator.userAgent,
            os: navigator.platform,
            device: 'Web',
            userAgent: navigator.userAgent
        },
        location: loc
    };
};


export const apiService = {
    post: async (url, data) => {
        const response = await httpClient.post(url, data);
        return response.data;
    },
    
    postWithSecurity: async (url, data, Mapper) => {
        const securityData = await getSecurityData();
        const payload = Mapper ? Mapper(data, securityData) : { ...data, ...securityData };
        const response = await httpClient.post(url, payload);
        return response.data;
    },
    
    put: async (url, data) => {
        const response = await httpClient.put(url, data);
        return response.data;
    },
    
    get: async (url) => {
        const response = await httpClient.get(url);
        return response.data;
    }
};

export default httpClient;