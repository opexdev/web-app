import React from "react";
import {useTranslation} from "react-i18next";
import Button from "../Button/Button";

const Error = ({errorMsg, retryFunc}) => {
    const {t} = useTranslation();
    return (
        <div className={`container column  jc-center  ai-center`} style={{height: "100%"}}>
            <span>{errorMsg ?? t('error')}</span>
            {
                retryFunc ? <Button
                    buttonStyle={{
                        background: 'var(--darkGreen)',
                        color: '#000'
                    }}
                    buttonClass="mt-2 px-2"
                    buttonTitle={t("errorPage.reload")}
                    onClick={retryFunc}
                /> : ""
            }
        </div>
    );
};

export default Error;