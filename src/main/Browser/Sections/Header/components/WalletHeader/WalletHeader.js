import React, {Fragment} from "react";
import classes from "./WalletHeader.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";


const WalletHeader = () => {
    const { id } = useParams()
    const {t} = useTranslation()

    const free = useSelector((state) => state.auth.wallets[id].free)
    const locked = useSelector((state) => state.auth.wallets[id].locked)
    const withdraw = useSelector((state) => state.auth.wallets[id].withdraw)

    return (
        <Fragment>
            <div className={`col-25`} style={{backgroundColor: "var(--blue)"}}>
                <h2 style={{color: "var(--orange)"}}>{t("currency." + id)}</h2>
                <span style={{color: "var(--orange)"}}>{id}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.free")}</span>
                <span>{free.toLocaleString()}{/* <span className={`font-size-sm text-color-gray`}>( --- {t("currency.IRT")} )</span>*/}</span>
            </div>
            <div className={`col-35 column ai-center ${classes.border}`}>
                <span>{t("header.locked")}</span>
                <span>{locked.toLocaleString()} {/*<span className={`font-size-sm text-color-gray`}>( --- {t("currency.IRT")} )</span>*/}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.inWithdrawalProcess")}</span>
                <span>{withdraw.toLocaleString()} {/*<span className={`font-size-sm text-color-gray`}>( --- {t("currency.IRT")} )</span>*/}</span>
            </div>
        </Fragment>
    );
};

export default WalletHeader;