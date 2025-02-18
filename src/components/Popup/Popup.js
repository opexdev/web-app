import React from "react";
import classes from "./Popup.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Button from "../Button/Button";
import {Link} from "react-router-dom";
import * as Routes from "../../main/Browser/Routes/routes";
import i18n from "i18next";
import {getCurrencyNameOrAlias} from "../../utils/utils";
import Deposit
    from "../../main/Browser/Pages/UserPanel/Sections/Content/components/Wallet/components/DepositWithdraw/components/Deposit/Deposit";
import {Login} from "../../main/Browser/Routes/routes";

const Popup = ({currency, closePopup}) => {

    const {t} = useTranslation();

    const isLogin = useSelector((state) => state.auth.isLogin)

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)


    const content = () => {

        if(!isLogin) return <div className={`width-100 flex jc-center ai-center height-100`}>
            <Link to={Login} className="hover-text">
                {t("pleaseLogin")}
            </Link>
        </div>
        return <div className={`width-100`}>
            <Deposit currency={currency}/>
        </div>

    }

    return (
        <div className={`width-100 column jc-between ai-center px-1 py-1 appear-animation card-border ${classes.container}`}>
            <div className={`${classes.header} width-100`}>
                <h3>{t("deposit")} <span>{getCurrencyNameOrAlias(currencies[currency], language)}</span></h3>
            </div>
            <div className={`${classes.content} width-100 column jc-center ai-center`}>
                {content()}


            </div>
            <div className={`${classes.footer} width-100 flex jc-end ai-center`}>
                {isLogin ? <Link to={Routes.Wallet + '/' + currency} className={`${classes.thisButton} ${classes.walletButton} button flex jc-center ai-center`}>
                    <span>{t("wallet.title")}</span>
                </Link> : ""}
                <Button
                    buttonClass={`${classes.thisButton} ${classes.closeButton} mr-05`}
                    onClick={closePopup}
                    buttonTitle={t("close")}
                />
            </div>
        </div>
    );
};

export default Popup;