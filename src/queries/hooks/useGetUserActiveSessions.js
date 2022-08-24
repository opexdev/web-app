import {useQuery} from "@tanstack/react-query";
import {getActiveSessions} from "js-api-client";

export const useGetUserActiveSessions = () => {
    return useQuery(
        ['userActiveSessions'], () => getActiveSessionsFunc(),{
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data.sort((a, b) => b.lastAccess - a.lastAccess)
        });
}

export const getActiveSessionsFunc = async () => {
    const {data} = await getActiveSessions();
    return data;
}