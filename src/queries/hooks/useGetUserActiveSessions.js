import axios from "axios";
import {useQuery} from "react-query";

export const useGetUserActiveSessions = () => {
    return useQuery(
        ['userActiveSessions'], () => getActiveSessions(),{
            select: (data) => data.sort((a, b) => b.lastAccess - a.lastAccess)
        });
}

export const getActiveSessions = async () => {
    const {data} = await axios.get(`/auth/realms/opex/user-management/user/sessions`);
    return data;
}