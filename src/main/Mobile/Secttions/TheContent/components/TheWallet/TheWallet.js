import React from "react";
import {useTranslation} from "react-i18next";
/*import classes from "./TheWallet.module.css";*/


const TheWallet = () => {

    const {t} = useTranslation();

    return (
        <div className={`container flex ai-center jc-center`} style={{height:"100%"}}>
            <span>{t("comingSoon")}</span>
        </div>
    );
};

export default TheWallet;
