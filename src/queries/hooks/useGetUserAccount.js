import {useQuery} from "@tanstack/react-query";
import {getUserAccount, parseWalletsResponse} from "js-api-client";

export const useGetUserAccount = () => {
    return useQuery(['userAccount'], getUserAccountFunc,
        {
            retry: 1,
            refetchInterval: 10000
        }
    );
}

export const getUserAccountFunc = async () => {
    const params = new URLSearchParams();
    params.append('timestamp', Date.now().toString());
    const {data} = await getUserAccount()
    return parseWalletsResponse(data);
}