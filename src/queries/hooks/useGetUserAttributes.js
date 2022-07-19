import axios from "axios";
import {useQuery} from "react-query";

export const useGetUserAttributes = (select) => {
    return useQuery(
        ['userAttributes'], () => getUserAttributes(), {
            select
        });
}

export const getUserAttributes = async () => {
    const {data} = await axios.get(`/auth/realms/opex/user-profile`);
    return data;
}