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
                <h2 className={`text-orange mb-05`}>{t("currency." + id)}</h2>
                <span className={`text-orange mt-05`}>{id}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span className={`mb-05`}>{t("header.free")}</span>
                <span className={`mt-05`}>{new BN(userAccount?.wallets[id]?.free || 0).toFormat()}
                    <span className={`fs-0-7 text-gray`}> ( {new BN(allEstimateValue?.free || 0).toFormat()} {t("currency.IRT")} )</span>
                </span>
            </div>
            <div className={`col-35 column ai-center ${classes.border}`}>
                <span className={`mb-05`}>{t("header.locked")}</span>
                <span className={`mt-05`}>{new BN(userAccount?.wallets[id]?.locked || 0).toFormat()}
                    <span className={`fs-0-7 text-gray`}> ( {new BN(allEstimateValue?.locked || 0).toFormat()} {t("currency.IRT")} )</span>
                </span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span className={`mb-05`}>{t("header.inWithdrawalProcess")}</span>
                <span className={`mt-05`}>{new BN(userAccount?.wallets[id]?.withdraw || 0).toFormat()}
                    <span className={`fs-0-7 text-gray`}> ( {new BN(allEstimateValue?.withdrawing || 0).toFormat()} {t("currency.IRT")} )</span>
                </span>
            </div>
        </>
    );
};

export default WalletHeader;