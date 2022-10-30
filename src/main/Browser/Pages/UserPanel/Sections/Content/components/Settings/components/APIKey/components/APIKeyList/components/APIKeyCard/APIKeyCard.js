import React, {useState} from 'react'
import classes from '../../APIKeyList.module.css'
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import Loading from "../../../../../../../../../../../../../../components/Loading/Loading";
import {toast} from "react-hot-toast";
import {deleteAPIKey, disableAPIKey, enableAPIKey} from "js-api-client";
import {images} from "../../../../../../../../../../../../../../assets/images";
import {useGetAPIKeyList} from "../../../../../../../../../../../../../../queries/hooks/useGetAPIKeyList";

const APIKeyCard = ({data}) => {


    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false)
    const {refetch} = useGetAPIKeyList()


    const enable = (key) => {
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

    const disable = (key) => {
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
                toast.success(t('APIKey.successDisable'))
                refetch()
            }).catch(() => {
            toast.error(t('APIKey.failedDisable'))
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={`${classes.container} width-100 row jc-between ai-center card-bg card-border px-2 py-2 mb-2`}>

            <span>{data.label}</span>
            <span>{data.allowedIPs}</span>
            <span>{data.expirationTime}</span>
            <span>{data.key}</span>
            <span>{data.enabled}</span>

            <div className={`width-10 column jc-center ai-center rounded-8 ${data?.enabled ? "text-green" : "text-red"}`}>
                {data.enabled ?
                    isLoading ? <div className={`flex jc-center ai-center px-2`}>
                            <Loading type="linear"/>
                        </div> :
                        <div className={`row jc-center ai-center`}>
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.disable} cursor-pointer`}
                                type="submit"
                                buttonTitle={t('APIKey.disableButton')}
                                onClick={() => disable(data.key)}
                            />
                        </div>
                    : isLoading ? <div className={`flex jc-center ai-center px-2`}>
                            <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
                        </div> :
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.enable} cursor-pointer`}
                            type="submit"
                            buttonTitle={t('APIKey.enableButton')}
                            onClick={() => enable(data.key)}
                        />
                }
            </div>


            <Button
                buttonClass={`${classes.thisButton} ${classes.disable} cursor-pointer`}
                type="submit"
                buttonTitle={t('APIKey.deleteButton')}
                onClick={() => deleteFunc(data.key)}
            />


        </div>
    );
};

export default APIKeyCard;
