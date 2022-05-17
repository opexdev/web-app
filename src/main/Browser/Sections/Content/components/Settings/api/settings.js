import axios from "axios";

const Settings = axios.create({
    baseURL: window.env.REACT_APP_API_BASE_URL,
    timeout: 15000,
});

export const CheckUserSecurityConfigs = async (panelToken, username) => {

    const params = new URLSearchParams();
    params.append('username', username);

    return await Settings.get(`/auth/realms/opex/user-management/user/security/check?${params.toString()}`, {
        data:params,
        headers : {
            'Authorization': `Bearer ${panelToken}`,
        },
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const getSessions = async () => {
    return await axios.get(`/auth/realms/opex/user-management/user/sessions`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const requestActivateOTP  = async () => {
    return await axios.get(`/auth/realms/opex/user-management/user/security/otp`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const sendActivateOTP = async (secret, initialCode) => {
    const payload = {
        "secret": secret,
        "initialCode": initialCode
    }
    return await axios.post(`/auth/realms/opex/user-management/user/security/otp`, payload
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const sendDisableOTP  = async () => {
    return await axios.delete(`/auth/realms/opex/user-management/user/security/otp`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const sendChangePassword = async (payload) => {
    return await axios.put(`/auth/realms/opex/user-management/user/security/password`, payload
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const LogoutUsingSessionId  = async (id) => {
    return await axios.post(`/auth/realms/opex/user-management/user/sessions/${id}/logout`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const LogoutAllSessionsExceptCurrent  = async () => {
    return await axios.post(`/auth/realms/opex/user-management/user/sessions/logout`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}