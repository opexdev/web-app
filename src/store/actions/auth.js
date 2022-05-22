import * as actionTypes from "./actionTypes";


export const setUserTokens = (token) => {
    return {
        type: actionTypes.SET_USER_TOKENS,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    };
};

export const setUserAccountInfo = (info) => {
    return {
        type: actionTypes.SET_USER_ACCOUNT_INFO,
        info: info,
    };
};
export const setUserAccountInfoInitiate = () => {
    return {
        type: actionTypes.SET_USER_ACCOUNT_INFO_INITIATE,
    };
};

export const setUserTokensInitiate = (token) => {
    return {
        type: actionTypes.SET_USER_TOKENS_INITIATE,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    };
};

export const setUserInfo = (info) => {
    return {
        type: actionTypes.SET_USER_INFO,
        id: info.sub,
        username: info.preferred_username,
        emailVerified: info.emailVerified,
        firstName: info.given_name,
        lastName: info.family_name,
        email: info.email,
    };
};

export const changeUserInfo = (firstName , lastName) => {
    return {
        type: actionTypes.SET_CHANGE_USER_INFO,
        firstName,
        lastName,
    };
};

export const setKYCStatus = (data) => {
    return {
        type: actionTypes.SET_KYC_STATUS,
        status: data.status,
        reason: data.rejectReason
    };
};
export const setKYCStatusInitiate = () => {
    return {
        type: actionTypes.SET_KYC_STATUS_INITIATE,
    };
};

export const setLastTransaction = (time) => {
    return {
        type: actionTypes.SET_LAST_TRANSACTION,
        time: time
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};
export const setLogoutInitiate = () => {
    return {
        type: actionTypes.LOGOUT_INITIATE,
    };
};
