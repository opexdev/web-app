import React from "react";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SettingHeader = () => {
    const location = useLocation()
    const {t} = useTranslation()

    return <h2 style={{color: "var(--orange)"}}>
        {t("routes." + location.pathname)}
    </h2>
}
export default SettingHeader;