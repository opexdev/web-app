import React from 'react';
import classes from './ResultPage.module.css'
import {useNavigate} from "react-router-dom";
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import TextInput from "../../../../../../../../../../../../../../components/TextInput/TextInput";
import QRCode from "react-qr-code";

const ResultPage = ({data, returnFunc}) => {

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
                <div className={`column jc-center ai-center`}>
                    {/*<img src={images.approve} className={`mb-1`}/>*/}
                    <span className={`text-green `}>{t("APIKey.success")}</span>
                    <span className={`text-red text-center fs-0-8 mt-025`}>{t("APIKey.warning")}</span>
                </div>

                <div className={`column jc-center ai-center width-100`}>

                    <div className={`column jc-between ai-center width-95 mb-1`}>
                        <QRCode
                            value={data.secret}
                            bgColor="var(--cardBody)"
                            fgColor="var(--textColor)"
                            level='L'
                            size={130}
                        />
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
                            customClass={`${classes.thisInput} width-100 mt-2`}
                        />

                    </div>



                    <div className={`column jc-between ai-center width-95 mt-1`}>
                        <QRCode
                            value={data.apiKey}
                            bgColor="var(--cardBody)"
                            fgColor="var(--textColor)"
                            level='L'
                            size={130}
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
                            customClass={`width-100 ${classes.thisInput} mt-2`}
                        />

                    </div>




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
