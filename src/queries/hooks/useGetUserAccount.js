import {useQuery} from "@tanstack/react-query";
import {getUserAccount, parseWalletsResponse} from "js-api-client";
import {useSelector} from "react-redux";

export const useGetUserAccount = () => {
    const userId = useSelector((state) => state.auth.id)
    return useQuery(['userAccount', userId], () => getUserAccountFunc(userId),
        {
            retry: 1,
            refetchInterval: 10000
        }
    );
}

export const getUserAccountFunc = async (userId) => {
    if (!userId) return null
    const params = new URLSearchParams();
    params.append('timestamp', Date.now().toString());
    const {data} = await getUserAccount()
    return parseWalletsResponse(data);
}