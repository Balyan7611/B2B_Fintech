// src/models/memberSearchModel.js

export const MemberSearchResponseModel = (res) => {
    console.log("MemberSearchResponseModel raw response:", res);
    if (!res) {
        console.warn("MemberSearchResponseModel: response is falsy");
        return [];
    }
    if (!res.status) {
        console.warn("MemberSearchResponseModel: res.status is falsy", res.status);
        // Fallback: if data is an array, we can still parse it
        if (!Array.isArray(res.data)) return [];
    }
    if (!Array.isArray(res.data)) {
        console.warn("MemberSearchResponseModel: res.data is not an array", res.data);
        return [];
    }

    console.log("MemberSearchResponseModel: parsing data array of length", res.data.length);
    return res.data.map(item => ({
        id: item.uniqueID || '',
        name: item.name || '',
        mobile: item.mobile || '',
        email: item.email || '',
        memberId: item.loginID || '',
        shopName: item.shopName || '',
        cityName: item.cityName || '',
        pan: item.pan || '',
        aadhar: item.aadhar || '',
        mainWallet: parseFloat(item.mainWallet) || 0,
        aepsWallet: parseFloat(item.aepsWallet) || 0,
        holdAmount: parseFloat(item.holdAmount) || 0,
        isKycApproved: item.isKycApproved === true,
        isEmailVerify: item.isEmailVerify === true,
        isMobileVerify: item.isMobileVerify === true,
        isActive: item.isActive === true,
        isOnHold: item.isOnHold === true,
        parentDetails: item.parentDetails ? {
            id: item.parentDetails.uniqueID || '',
            name: item.parentDetails.name || '',
            mobile: item.parentDetails.mobile || '',
            email: item.parentDetails.email || '',
            memberId: item.parentDetails.loginID || ''
        } : null
    }));
};
