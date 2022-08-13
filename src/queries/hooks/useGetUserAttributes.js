import {useQuery} from "@tanstack/react-query";
import {getUserAttributes} from "js-api-client";

export const useGetUserAttributes = (select) => {
    return useQuery(
        ['userAttributes'], () => getUserAttributesFunc(), {
            select,
            retry: 1,
        });
}

export const getUserAttributesFunc = async () => {
    const {data} = await getUserAttributes();
    return data;
}