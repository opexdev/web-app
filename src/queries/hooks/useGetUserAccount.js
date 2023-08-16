import {useQuery} from "@tanstack/react-query";
import {getUserAccount, parseWalletsResponse} from "js-api-client";
import {useSelector} from "react-redux";

export const useGetUserAccount = () => {
    const isLogin = useSelector((state) => state.auth.isLogin)
    return useQuery(['userAccount'], () => getUserAccountFunc(isLogin),
        {
            retry: 1,
            refetchInterval: 10000
        }
    );
}

export const getUserAccountFunc = async (isLogin) => {
    if (!isLogin) return  null
    const params = new URLSearchParams();
    params.append('timestamp', Date.now().toString());
    const {data} = await getUserAccount()
    return parseWalletsResponse(data);
}