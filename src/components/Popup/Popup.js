import React, {useRef} from "react";
import classes from "./Popup.module.css";
import {Trans, useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Button from "../Button/Button";
import {Link, Navigate} from "react-router-dom";
import * as Routes from "../../main/Browser/Routes/routes";
import {Login} from "../../main/Browser/Routes/routes";
import QRCode from "react-qr-code";
import Icon from "../Icon/Icon";
import TextInput from "../TextInput/TextInput";
import {toast} from "react-hot-toast";
import {useGetDepositAddress} from "../../queries";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const Popup = ({currency, closePopup}) => {

    const {t} = useTranslation();
    const addressRef = useRef(null);
    const {data: address , isLoading , error} = useGetDepositAddress(currency)
    const isLogin = useSelector((state) => state.auth.isLogin)

    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans i18nKey="DepositWithdraw.success"/>);
    };

    const content = () => {
        if(!isLogin) return <div className={`container flex jc-center ai-center height-100`}>
            <Link to={Login} className="hover-text">
                {t("pleaseLogin")}
            </Link>
        </div>

        if(isLoading) return <Loading/>
        if (error) return <Error/>
        if (currency === "IRT") return <Navigate to={Routes.Wallet + "/IRT"} replace />

        return <>
            <QRCode
                value={address.address}
                bgColor="var(--cardBody)"
                fgColor="var(--textColor)"
                level='L'
                size={90}
            />
            <TextInput
                after={
                    <Icon
                        iconName="icon-copy font-size-md-01"
                        onClick={() => copyToClipboard()}
                        customClass={`hover-text cursor-pointer`}
                    />
                }
                customClass={`${classes.thisInput} mt-2`}
                readOnly={true}
                type="text"
                customRef={addressRef}
                value={address.address}
            />
        </>
    }

    return (
        <div className={`container column jc-center ai-center px-1 py-1 appear-animation card-border ${classes.container}`}>
            <div className={`${classes.header} container`}>
                <h3>{t("deposit")} <span>{t("currency." + currency)}</span></h3>
            </div>
            <div className={`${classes.content} container column jc-center ai-center`}>
                {content()}
            </div>
            <div className={`${classes.footer} container flex jc-end ai-center`}>
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