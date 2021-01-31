import * as actionTypes from "./actionTypes";

export const storeUserData = () => {
    return {
        type: actionTypes.STORE_USER_DATA,
    };
};

export const login = (auth) => {
    return {
        type: actionTypes.LOGIN,
        auth: auth,
    };
};

export const setLoginInitiate = (auth) => {
    return {
        type: actionTypes.LOGIN_INITIATE,
        auth: auth,
    };
};