import {useQuery} from "@tanstack/react-query";
import {getQuoteCurrencies} from "js-api-client";

export const useGetQuoteCurrencies = () => {
    return useQuery(
        ['quoteCurrencie'],
        () => getQuoteCurrenciesFunc());
}

const getQuoteCurrenciesFunc = async () => {
    const {data} = await getQuoteCurrencies()
    return data;
}
