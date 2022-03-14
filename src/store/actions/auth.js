import * as actionTypes from "./actionTypes";


export const setUserTokens = (token) => {
    return {
        type: actionTypes.SET_USER_TOKENS,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        refreshToken: token.refreshToken,
        refreshTokenExpires: token.refreshTokenExpires,
    };
};

export const setImpersonateTokens = (token) => {
    return {
        type: actionTypes.SET_IMPERSONATE_TOKENS,
        accessToken: token,
    };
};

export const setUserAccountInfo = (info) => {
    return {
        type: actionTypes.SET_USER_ACCOUNT_INFO,
        info: info,
    };
};

export const setUserTokensInitiate = (token) => {
    return {
        type: actionTypes.SET_USER_TOKENS_INITIATE,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        refreshToken: token.refreshToken,
        refreshTokenExpires: token.refreshTokenExpires,
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