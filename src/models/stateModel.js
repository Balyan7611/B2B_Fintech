// src/models/stateModel.js
export const StateResponseModel = (res) => {
    if (!res || !res.status) return [];
    const items = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
    return items.map(item => ({
        id: item.id,
        name: (item.name || "").trim(),
        stateCode: item.stateCode || "",
        countryId: item.countryId,
        countryName: item.countryName || "",
        isActive: item.isActive
    }));
};
