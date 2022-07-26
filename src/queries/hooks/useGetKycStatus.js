import axios from "axios";
import {useQuery} from "react-query";

export const useGetKycStatus = () => {
    return useQuery(
        ['KycStatus'], getKycStatus, {
            enabled: false,
            cacheTime: 10 * 60 * 1000,
        });
}

export const getKycStatus = async () => {
    const {data} = await axios.get('/auth/realms/opex/user-profile/kyc/status')
    return data;
}