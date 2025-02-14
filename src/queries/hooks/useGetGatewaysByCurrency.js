import {useQuery} from "@tanstack/react-query";
import {getGatewaysByCurrency} from "js-api-client";

export const useGetGatewaysByCurrency = (currency = "", config = {}) => {
    return useQuery({
        queryKey: ['gateways', currency, config],
        queryFn: async () => {
            const { data } = await getGatewaysByCurrency(currency, config);
            return data[0];
        },
        enabled: !!currency,
    });
};
