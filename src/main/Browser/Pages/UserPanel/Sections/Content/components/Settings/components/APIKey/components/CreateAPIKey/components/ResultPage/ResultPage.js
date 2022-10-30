import React from 'react';
import classes from './ResultPage.module.css'
import {images} from "../../../../../../../../../../../../../../assets/images";
import {useNavigate} from "react-router-dom";
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import TextInput from "../../../../../../../../../../../../../../components/TextInput/TextInput";

const ResultPage = ({data, returnFunc}) => {

    let navigate = useNavigate();
    const {t} = useTranslation();


    const copyToClipboard = (value, e) => {
        e.preventDefault();
        navigator.clipboard.writeText(value)
        toast.success(t('APIKey.copied'));
    }

    return (
        <>
            <div className={`${classes.container} flex jc-center ai-center`}/>
            <div className={`${classes.content} card-border column jc-around ai-center px-2 py-2`}>
                <img src={images.approve}/>
                <span className={`text-green`}>{t("APIKey.success")}</span>
                <span className={`text-red text-center fs-0-9`}>{t("APIKey.warning")}</span>

                <div className={`column jc-center ai-center width-100`}>
                    <TextInput
                        lead={t('APIKey.secret')}
                        after={
                            <Icon
                                iconName="icon-copy flex fs-02 font-weight-bold"
                                onClick={(e) => copyToClipboard(data.secret, e)}
                                customClass={`hover-text cursor-pointer mr-025`}
                            />
                        }
                        value={data.secret}
                        type="readOnly"
                        customClass={`width-95 ${classes.thisInput} mb-1`}
                    />
                    <TextInput
                        lead={t('APIKey.apiKey')}
                        after={
                            <Icon
                                iconName="icon-copy flex fs-02 font-weight-bold"
                                onClick={(e) => copyToClipboard(data.apiKey, e)}
                                customClass={`hover-text cursor-pointer mr-025`}
                            />
                        }
                        value={data.apiKey}
                        type="readOnly"
                        customClass={`width-95 ${classes.thisInput} mt-1`}
                    />
                </div>



                <Button
                    buttonClass={`${classes.thisButton} font-weight-bold px-3 mt-2`}
                    buttonTitle={t("APIKey.understand")}
                    onClick={returnFunc}
                />

            </div>
        </>
    );
};

export default ResultPage;
