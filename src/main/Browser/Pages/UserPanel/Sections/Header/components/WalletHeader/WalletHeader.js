import React from "react";
import classes from "./WalletHeader.module.css";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {BN} from "../../../../../../../../utils/utils";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import {useGetUserAssets} from "../../../../../../../../queries";

const WalletHeader = () => {
    const {id} = useParams()
    const {t} = useTranslation()

    const {data: userAccount} = useGetUserAccount()

    const {data: estimateValue , isLoading, error} = useGetUserAssets("IRT")
    const allEstimateValue = (isLoading || error) ?  0 : (estimateValue?.find( q => q.asset === id ))

    return (
        <>
            <div className={`col-25`}>
                <h2 className={`text-orange`}>{t("currency." + id)}</h2>
                <span className={`text-orange`}>{id}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.free")}</span>
                <span>{new BN(userAccount?.wallets[id]?.free || 0).toFormat()}
                    <span className={`fs-0-7 text-gray`}> ( {new BN(allEstimateValue?.free || 0).toFormat()} {t("currency.IRT")} )</span>
                </span>
            </div>
            <div className={`col-35 column ai-center ${classes.border}`}>
                <span>{t("header.locked")}</span>
                <span>{new BN(userAccount?.wallets[id]?.locked || 0).toFormat()}
                    <span className={`fs-0-7 text-gray`}> ( {new BN(allEstimateValue?.locked || 0).toFormat()} {t("currency.IRT")} )</span>
                </span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.inWithdrawalProcess")}</span>
                <span>{new BN(userAccount?.wallets[id]?.withdraw || 0).toFormat()}
                    <span className={`fs-0-7 text-gray`}> ( {new BN(allEstimateValue?.withdrawing || 0).toFormat()} {t("currency.IRT")} )</span>
                </span>
            </div>
        </>
    );
};

export default WalletHeader;