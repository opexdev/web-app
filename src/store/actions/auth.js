import * as actionTypes from "./actionTypes";

export const login = (token) => {
    return {
        type: actionTypes.LOGIN,
        token: "mytoken",
    };
};

export const setLoginInitiate = (token) => {
    return {
        type: actionTypes.LOGIN_INITIATE,
        token: "mytoken",
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