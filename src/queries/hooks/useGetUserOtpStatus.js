import {useQuery} from "@tanstack/react-query";
import {checkUserOtpConfigs} from "js-api-client";


const clientSecret = window.env.REACT_APP_CLIENT_SECRET
const clientId = window.env.REACT_APP_CLIENT_ID


export const useGetUserOtpStatus = (username) => {
    return useQuery(['userOTP'],
        () => checkUserOtpConfigsFunc(username),
        {
            retry: 1
        }
    );
}

export const checkUserOtpConfigsFunc = async (username) => {
    const {data: {otp}} = await checkUserOtpConfigs(username, clientId, clientSecret)
    return otp
}