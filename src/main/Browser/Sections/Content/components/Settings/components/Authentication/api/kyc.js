import axios from "axios";

export const getAttributes = async () => {
    return await axios.get(`/auth/realms/opex/user-profile`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}


export const addAttributes = async (profile) => {
    return await axios.post('/auth/realms/opex/user-profile', profile).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const sendUserFile = async (user, file) => {
    //axios.defaults.headers.common['Content-Type'] = 'application/json';
    const data = new FormData();
    data.append('file', file);

    return await axios.post(`/storage/${user}`, data
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}


export const KYCImagePaths = async (Path) => {
    return await axios.post('/auth/realms/opex/user-profile/kyc', Path).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}


export const KYCStatus = async () => {
    return await axios.get(`/auth/realms/opex/user-profile/kyc/status`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

