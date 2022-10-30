import React, {useState} from 'react';
import classes from "./CreateAPIKey.module.css";
import {Trans, useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import {images} from "../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {createAPIKey} from "js-api-client";
import {toast} from "react-hot-toast";
import ResultPage from "./components/ResultPage/ResultPage";
import {useGetAPIKeyList} from "../../../../../../../../../../../../queries/hooks/useGetAPIKeyList";

const CreateAPIKey = () => {

    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false)
    const [apiKeyResult, setApikeyResult] = useState(null)

    const {refetch} = useGetAPIKeyList()

    const [apiKey, setApiKey] = useState({
        label: {value: null, error: []},
        allowedIPs: {value: null, error: []},
        expiration: {value: null, error: []},
    });

    console.log("setApikeyResult", apiKeyResult)

    const dates = [
        {value: "ONE_MONTH", label: t('APIKey.ONE_MONTH')},
        {value: "THREE_MONTHS", label: t('APIKey.THREE_MONTHS')},
        {value: "SIX_MONTHS", label: t('APIKey.SIX_MONTHS')},
        {value: "ONE_YEAR", label: t('APIKey.ONE_YEAR')},
    ]

    const sendWithdrawHandler = async (e) => {
        e.preventDefault()
        if (isLoading) return
        setIsLoading(true)
        const apiKeyData = {
            label: apiKey.label.value,
            expiration: apiKey.expiration.value,
            allowedIPs: apiKey.allowedIPs.value
        }
        createAPIKey(apiKeyData).then((res) => {
            setApikeyResult(res.data)
            refetch()
            setApiKey({
                label: {value: "", error: []},
                allowedIPs: {value: "", error: []},
                expiration: {value: "", error: []},
            })
        }).catch(() => {
                toast.error(t('error'));
        }).finally(() => setIsLoading(false))
    }

    const submitButtonTextHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                   alt="linearLoading"/>
        return t('submit')
    }


    return (
        <>
            <div className="width-100 pb-2">
                <div className={`width-100 card-bg card-border column ${classes.container}`}>
                    <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                        <div className="row jc-start ">
                            <h3>{t("APIKey.title")}</h3>
                        </div>
                    </div>
                    <form onSubmit={(e) => sendWithdrawHandler(e)}
                          className={`width-100 ${classes.content} px-1 py-2 column jc-between`}>
                        <div>{t("APIKey.content")}</div>
                        <div className={`row jc-between`}>
                            <TextInput
                                lead={t('APIKey.label')}
                                value={apiKey.label.value}
                                type="text"
                                onchange={(e) => setApiKey({...apiKey, label: {value: e.target.value, error: []}})}
                                placeholder={t('APIKey.label')}
                                customClass={`width-48`}
                                alerts={apiKey.label.error}

                            />
                            <TextInput
                                select={true}
                                placeholder={t('APIKey.selectExpiration')}
                                customClass={`width-48`}
                                lead={t('APIKey.expiration')}
                                type="select"
                                options={dates}
                                onchange={(e) => setApiKey({...apiKey, expiration: {value: e.value, error: []}})}
                                alerts={apiKey.expiration.error}
                                //value={apiKey.expiration.value}
                            />
                        </div>
                        <div className={`row jc-between`}>
                            <TextInput
                                placeholder={t('APIKey.allowedIPsExample')}
                                customClass={`width-100 ${classes.allowedIPsInput}`}
                                value={apiKey.allowedIPs.value}
                                ltr={true}
                                lead={t('APIKey.allowedIPs')}
                                type="text"
                                onchange={(e) => setApiKey({...apiKey, allowedIPs: {value: e.target.value, error: []}})}
                                alerts={apiKey.allowedIPs.error}

                            />
                        </div>
                        <div className={`row jc-end`}>
                            <Button
                                buttonClass={`${classes.thisButton} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                buttonTitle={submitButtonTextHandler()}
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
            {apiKeyResult !== null && <ResultPage data={apiKeyResult} returnFunc={() => setApikeyResult(null)}/>}
        </>
    );
};

export default CreateAPIKey;
