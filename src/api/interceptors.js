// JWT/refresh + Encryption
export const requestInterceptor = async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const ipRes = await fetch('https://api.ipify.org?format=json').catch(() => ({ ip: '0.0.0.0' }));
    const { ip } = await ipRes.json();
    
    config.headers['X-Device-Info'] = navigator.userAgent;
    config.headers['X-IP'] = ip;
    
    return config;
};

export const responseInterceptor = (response) => response;