import React from "react";
import DepositWithdraw from "./components/DepositWithdraw/DepositWithdraw";
import DepositWithdrawTx from "./components/DepositWithdrawTx/DepositWithdrawTx";
import classes from "./components/DepositWithdrawTx/DepositWithdrawTx.module.css";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import IRTTx from "./components/DepositWithdrawTx/components/IRTTx/IRTTx";


const Wallet = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    return (
        <>
            <div className="px-1 py-1">
                <div className="row">
                    <DepositWithdraw/>
                </div>
                <div className="row">
                    <div className={`container card-background card-border column ${classes.container} my-2`}>
                        <div className="flex jc-between card-header-bg py-2 px-1">
                            <h3>{t("DepositWithdrawTx.title")}</h3>
                        </div>
                        {id === "IRT" ? <IRTTx/> : <DepositWithdrawTx/>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wallet;
