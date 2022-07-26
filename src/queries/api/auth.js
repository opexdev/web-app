import axios from "axios";

const clientSecret = window.env.REACT_APP_CLIENT_SECRET
const clientId = window.env.REACT_APP_CLIENT_ID

export const userRegister =  (user , panelToken) => {
    return axios.post('/auth/realms/opex/user-management/user', user ,{
        headers : {
            "Authorization" : "Bearer "+ panelToken
        }
    })
}

export const login = async (credential, agent) => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('username', credential.username);
    params.append('password', credential.password);
    params.append('otp', credential.otp);
    params.append('agent', agent);
    params.append('grant_type', 'password');
    params.append('client_secret', clientSecret);
    return axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
};

export const logout = () => {
    return axios.post(`/auth/realms/opex/user-management/user/logout`)
}

export const getPanelToken = async () => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');
    return axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
}

export const getCaptchaImage = () => {
    return axios.post(`/captcha/session`, null, {
        headers: {
            'Accept': 'image/jpeg'
        },
        responseType: "arraybuffer"
    })
};

export const requestForForgetPasswordEmail = async (panelToken, email, captchaAnswer) => {
    return await axios.post(`/auth/realms/opex/user-management/user/forgot?email=${email}&captcha-answer=${captchaAnswer}`, null, {
        headers: {
            "Authorization": "Bearer " + panelToken
        }
    })
}

export const requestForActivateOTP = () => {
    return axios.get(`/auth/realms/opex/user-management/user/security/otp`)
}


export const sendInitialCodeToActivateOTP = (secret, initialCode) => {
    const payload = {
        "secret": secret,
        "initialCode": initialCode
    }
    return axios.post(`/auth/realms/opex/user-management/user/security/otp`, payload)
}

export const requestForDeActiveOTP = () => {
    return axios.delete(`/auth/realms/opex/user-management/user/security/otp`)
}

export const requestForChangePassword = (payload) => {
    return axios.put(`/auth/realms/opex/user-management/user/security/password`, payload)
}

export const setUserProfileAttributes = (profile) => {
    return axios.post('/auth/realms/opex/user-profile', profile)
}

export const sendFileToUserStorage = (userId, file) => {
    const data = new FormData();
    data.append('file', file);
    return axios.post(`/storage/${userId}`, data)
}
export const setKycFileToUserAttributes = (Path) => {
    return axios.post('/auth/realms/opex/user-profile/kyc', Path)
}

export const parseToken = ( data ) => {
    return {
        accessToken: data.access_token,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
        refreshToken: data.refresh_token,
        refreshTokenExpires: Date.now() + data.refresh_expires_in * 1000,
    }
}
