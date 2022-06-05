import React, {Fragment, useEffect, useRef, useState} from "react";
import classes from "./Popup.module.css";
import {Trans, useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {setUserAccountInfo} from "../../store/actions";
import Button from "../Button/Button";
import {Link} from "react-router-dom";
import * as Routes from "../../routes/routes";
import {getDepositAddress} from "../../main/Browser/Sections/Content/components/Wallet/api/wallet";
import QRCode from "react-qr-code";
import Icon from "../Icon/Icon";
import TextInput from "../TextInput/TextInput";
import {toast} from "react-hot-toast";
import {Login} from "../../routes/routes";


const Popup = (props) => {
    const {t} = useTranslation();
    const {currency, isLogin, closePopup,} = props
    const [address , setAddress] = useState("")
    const addressRef = useRef(null);

    useEffect(() => {
        getDepositAddress(currency).then((res)=>{
            if (res && res.status === 200 ){
                setAddress(res.data.address)
            }else {
                setAddress("0x00000000000000000000000")
            }
        })
    }, [currency]);

    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans
            i18nKey="DepositWithdraw.success"
        />);
    };


    const LoginText = <div className={`container flex jc-center ai-center height-100`}>
        <Link to={Login} className="hover-text">
            {t("pleaseLogin")}
        </Link>
    </div>


    return (
        <div className={`container column jc-center ai-center px-1 py-1 appear-animation card-border ${classes.container}`}>
            <div className={`${classes.header} container`}>
                    <h3>{t("deposit")} <span>{t("currency." + currency)}</span></h3>
                </div>
            <div className={`${classes.content} container column jc-center ai-center`}>
                {isLogin ?
                <Fragment>
                    <QRCode
                        value={address}
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
                        value={address}
                    />
                </Fragment>: LoginText
                }
            </div>
            <div className={`${classes.footer} container flex jc-end ai-center`}>
                {isLogin ? <Link
                    to={Routes.Wallet + '/' + currency}
                    className={`${classes.thisButton} ${classes.walletButton} button flex jc-center ai-center`}
                >
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


const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        accessToken: state.auth.accessToken,
        activePair: state.exchange.activePair
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUserAccountInfo: (info) => dispatch(setUserAccountInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
