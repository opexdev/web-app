import React from "react";
import classes from "./WalletHeader.module.css";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {BN} from "../../../../../../../../utils/utils";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";

const WalletHeader = () => {
    const {id} = useParams()
    const {t} = useTranslation()

    const {data: userAccount} = useGetUserAccount()

    return (
        <>
            <div className={`col-25`} style={{backgroundColor: "var(--blue)"}}>
                <h2 style={{color: "var(--orange)"}}>{t("currency." + id)}</h2>
                <span style={{color: "var(--orange)"}}>{id}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.free")}</span>
                <span>{new BN(userAccount?.wallets[id]?.free || 0).toFormat()}</span>
            </div>
            <div className={`col-35 column ai-center ${classes.border}`}>
                <span>{t("header.locked")}</span>
                <span>{new BN(userAccount?.wallets[id]?.locked || 0).toFormat()}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.inWithdrawalProcess")}</span>
                <span>{new BN(userAccount?.wallets[id]?.withdraw || 0).toFormat()}</span>
            </div>
        </>
    );
};

export default WalletHeader;