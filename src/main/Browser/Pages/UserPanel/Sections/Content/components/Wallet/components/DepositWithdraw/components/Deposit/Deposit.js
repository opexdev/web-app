import React, {useEffect, useMemo, useRef, useState} from "react";
import classes from "../../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import {useGetCurrencyInfo, useGetGatewaysByCurrency} from "../../../../../../../../../../../../queries";
import IRTDeposit from "./components/IRT/IRTDeposit";
import Address from "./components/Address/Address";
import OnChainDeposit from "./Module/OnChainDeposit/OnChainDeposit";

const Deposit = () => {

    const {id} = useParams();
    const {t} = useTranslation();


    const { data, isLoading, error } = useGetGatewaysByCurrency(id, {
        includeManualGateways: false,
        includeOffChainGateways: true,
        includeOnChainGateways: true
    });

    console.log("data", data)


    /*const [networkName, setNetworkName] = useState({value: 0, error: []});*/

    const selectRef = useRef()
    /*const {data: currencyInfo, isLoading: CILoading, error: CIError, refetch: refetchCI} = useGetCurrencyInfo(id)*/

    /*useEffect(() => {
        setNetworkName({value: 0, error: []})

    }, [id]);

    useEffect(() => {
        if (id !== "IRT") {
            refetchCI()
        }
    }, [id]);*/


/*    if (id === "IRT") return <IRTDeposit/>
    if (CILoading) return <Loading/>
    if (CIError) return <Error/>*/

    const { hasOnChain, hasOffChain } = useMemo(() => ({
        hasOnChain: data?.some(gateway => gateway.type === "OnChain"),
        hasOffChain: data?.some(gateway => gateway.type === "OffChain")
    }), [data]);


    if (isLoading) return <Loading/>
    if (error) return <Error/>
    if (data.length <= 0 ) return <div className={`flex jc-center ai-center height-100`}>
        <span>{t("noData")}</span>
    </div>

    switch (true) {
        case hasOnChain && hasOffChain:
            return <div className="flex jc-center ai-center height-100">
                <span>{t("comingSoon")}</span>
            </div>;
        case hasOnChain:
            return <OnChainDeposit gateways={data}/>;
        case hasOffChain:
            return <div className="flex jc-center ai-center height-100">
                <span>{t("comingSoon")}</span>
            </div>;
        default:
            return (
                <div className="flex jc-center ai-center height-100">
                    <span>{t("noData")}</span>
                </div>
            );
    }


    return (
        <div className={`px-1 py-3 column ${classes.content}`}>
           {/* <TextInput
                select={true}
                placeholder={t('DepositWithdraw.selectNetwork')}
                options={currencyInfo?.chains.map((chain, index) => {
                    return {value: index, label: `${chain.network} - ${chain.currency}`}
                })}
                lead={t('DepositWithdraw.network')}
                type="select"
                value={currencyInfo?.chains[networkName.value] && {
                    value: networkName.value,
                    label: `${currencyInfo?.chains[networkName.value].network} - ${currencyInfo?.chains[networkName.value].currency}`
                }}
                onchange={(e) => setNetworkName({value: e?.value || 0, error: []})}
                customRef={selectRef}
                alerts={networkName.error}
                customClass={`width-64 ${classes.thisInput}`}
            />

            { currencyInfo && <Address network={currencyInfo?.chains[networkName?.value]?.network}/>}*/}

        </div>
    )
}
export default Deposit;
