import React from "react";
import {useTranslation} from "react-i18next";



const Error = () => {
    const {t} = useTranslation();
    return (
        <div className={`container column  jc-center  ai-center`} style={{height: "100%"}}>
            <span>{t('error')}</span>
        </div>
    );
};

export default Error;