// src/models/walletTypeModel.js
export const WalletTypeResponseModel = (res) => {
    if (!res || !res.status) return [];
    const items = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
    return items.map(item => ({
        id: item.id,
        name: item.name || "",
        isActive: item.isActive === true
    }));
};

export const WalletTypeRequestModel = (data) => {
    return {
        id: parseInt(data.id) || 0,
        name: data.name || "",
        isActive: data.isActive === true
    };
};
