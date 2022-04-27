import React, {Fragment} from "react";
import classes from "./WalletHeader.module.css";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";


const WalletHeader = (props) => {
    const { id } = useParams()
    const {t} = useTranslation()
    const {wallets} = props


    return (
        <Fragment>
            <div className={`col-25`} style={{backgroundColor: "var(--blue)"}}>
                <h2 style={{color: "var(--orange)"}}>{t("currency." + id)}</h2>
                <span style={{color: "var(--orange)"}}>{id}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.free")}</span>
                <span>{wallets[id].free}{/* <span className={`font-size-sm text-color-gray`}>( --- {t("currency.IRT")} )</span>*/}</span>
            </div>
            <div className={`col-35 column ai-center ${classes.border}`}>
                <span>{t("header.locked")}</span>
                <span>{wallets[id].locked} {/*<span className={`font-size-sm text-color-gray`}>( --- {t("currency.IRT")} )</span>*/}</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span>{t("header.inWithdrawalProcess")}</span>
                <span>{wallets[id].withdraw} {/*<span className={`font-size-sm text-color-gray`}>( --- {t("currency.IRT")} )</span>*/}</span>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        wallets: state.auth.wallets,
    };
};

export default connect(mapStateToProps, null)(WalletHeader);
