import React, {useState} from 'react'
import classes from '../../APIKeyList.module.css'
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import Loading from "../../../../../../../../../../../../../../components/Loading/Loading";
import {toast} from "react-hot-toast";
import {deleteAPIKey, disableAPIKey, enableAPIKey} from "js-api-client";
import {images} from "../../../../../../../../../../../../../../assets/images";
import {useGetAPIKeyList} from "../../../../../../../../../../../../../../queries/hooks/useGetAPIKeyList";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import moment from "moment-jalaali";
import i18n from "i18next";
import fa from "moment/locale/fa";
import QRCode from "react-qr-code";

const APIKeyCard = ({data}) => {


    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false)
    const {refetch} = useGetAPIKeyList()


    const enableFunc = (key) => {
        setIsLoading(true)
        enableAPIKey(key)
            .then(() => {
                toast.success(t('APIKey.successEnable'))
                refetch()
            }).catch(() => {
            toast.error(t('APIKey.failedEnable'))
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const disableFunc = (key) => {
        setIsLoading(true)
        disableAPIKey(key)
            .then(() => {
                toast.success(t('APIKey.successDisable'))
                refetch()
            }).catch(() => {
            toast.error(t('APIKey.failedDisable'))
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const deleteFunc = (key) => {
        setIsLoading(true)
        deleteAPIKey(key)
            .then(() => {
                toast.success(t('APIKey.successDelete'))
                refetch()
            }).catch(() => {
            toast.error(t('APIKey.failedDelete'))
        }).finally(() => {
            setIsLoading(false)
        })
    }


    const textHandler = (enable) => {
        if (enable) {
            return <span onClick={() => disableFunc(data.key)}
                         className={`fs-0-9 text-red cursor-pointer`}>{t('APIKey.disableButton')}</span>
        }
        if (!enable) {
            return <span onClick={() => enableFunc(data.key)}
                         className={`fs-0-9 text-green cursor-pointer`}>{t('APIKey.enableButton')}</span>
        }
    }

    const copyToClipboard = (value, e) => {

        console.log("v" , value)
        e.preventDefault();
        navigator.clipboard.writeText(value)
        toast.success(t('APIKey.copied'));
    }


    return (
        <div className={`${classes.container} width-100 column jc-between ai-start card-bg card-border px-2 pt-3 py-2 mb-2`}>
            <div className={`row jc-between ai-center my-1 width-100`}>
                <div className={`row jc-start ai-center width-40`}>
                    <span className={`text-gray ml-025`}>{t('APIKey.label')}:</span>
                    <span className={`mr-025`}>{data?.label}</span>
                </div>
               {/* <div className={`row jc-center ai-center`}>
                    <span className={`text-gray ml-025`}>{t('APIKey.apiKey')}:</span>
                    <span className={`mr-025 ml-025`}>{data?.key}</span>
                    <Icon
                        iconName="icon-copy flex fs-03 font-weight-bold"
                        onClick={(e) => copyToClipboard(data?.key, e)}
                        customClass={`hover-text cursor-pointer mr-025`}
                    />
                </div>*/}
                <div className={`row jc-center ai-center width-30`}>
                    <span className={`text-gray ml-025`}>{t('APIKey.expiration')}:</span>
                    <span className={` mr-025`}>{data?.expirationTime ? moment(data.expirationTime).locale(i18n.language === "fa" ? "fa" : "en", i18n.language === "fa" ? fa : "").fromNow(true) : "---"}  </span>
                </div>

                <div className={`row jc-end ai-center width-40`}>

                    {isLoading ?
                        <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                             alt="linearLoading"/> :
                        <>
                            {textHandler(data.enabled)}
                            <span className={`mx-05`}>|</span>
                            <div className={`row cursor-pointer hover-text ${classes.titleNav}`}
                                 onClick={() => deleteFunc(data.key)}>
                                <span className={`ml-025 fs-0-9 ${classes.title}`}>{t('APIKey.delete')}</span>
                                <Icon
                                    iconName="icon-trash-1 fs-5"

                                />
                            </div>

                        </>
                    }
                </div>
            </div>
            <div className={`row jc-between ai-start my-2 width-100`}>

                <div className={`row jc-center ai-center`}>
                    <span className={`text-gray ml-025`}>{t('APIKey.apiKey')}:</span>

                </div>
                <div className={`row jc-center ai-center`}>
                    <span className={`mr-025 ml-025`}>{data?.key}</span>
                    <Icon
                        iconName="icon-copy flex fs-03 font-weight-bold"
                        onClick={(e) => copyToClipboard(data?.key, e)}
                        customClass={`hover-text cursor-pointer mr-025`}
                    />
                </div>
                <div className={`row jc-center ai-center`}>
                    <QRCode
                        value={data?.key}
                        bgColor="var(--cardBody)"
                        fgColor="var(--textColor)"
                        level='L'
                        size={130}
                    />
                </div>


            </div>
            <div className={`row jc-start ai-start mt-1 width-100 wrap`}>
                <span className={`text-gray ml-1`}>{t('APIKey.allowedIPs')}:</span>


                    {data?.allowedIPs ? data?.allowedIPs?.split(",").map((name , index) =>
                        <span className="ml-05 rounded-8 px-1 py-1 mb-2" key={index}
                              style={{backgroundColor: "var(--cardHeader)"}}
                              title={name}> {name} </span>) : "---"}





            </div>


        </div>
    );
};

export default APIKeyCard;
