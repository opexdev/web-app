import axios from "axios";
import {useQuery} from "react-query";
import {getPanelToken} from "../api/auth";

export const useGetUserOtpStatus = (username) => {
    return useQuery(['userOTP'], () => checkUserOtpConfigs(username));
}

export const checkUserOtpConfigs = async (username) => {
    const {data: {access_token}} = await getPanelToken();
    const params = new URLSearchParams();
    params.append('username', username);

    const {data: {otp}} = await axios.get(`/auth/realms/opex/user-management/user/security/check?${params.toString()}`, {
        data: params,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    })
    return otp
}