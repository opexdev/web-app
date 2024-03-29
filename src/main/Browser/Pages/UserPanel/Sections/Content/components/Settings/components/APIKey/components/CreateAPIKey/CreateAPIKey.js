import React, {useState} from 'react';
import classes from "./CreateAPIKey.module.css";
import {useTranslation} from "react-i18next";
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
        label: {value: "", error: []},
        allowedIPs: {value: "", error: []},
        expiration: {value: "", error: []},
    });

    const dates = [
        {value: "ONE_MONTH", label: t('APIKey.ONE_MONTH')},
        {value: "THREE_MONTHS", label: t('APIKey.THREE_MONTHS')},
        {value: "SIX_MONTHS", label: t('APIKey.SIX_MONTHS')},
        {value: "ONE_YEAR", label: t('APIKey.ONE_YEAR')},
    ]

    const createAPIKeyHandler = async (e) => {
        e.preventDefault()
        if (isLoading) return

        if (apiKey.label.value === "") {
            return setApiKey({...apiKey, label: {...apiKey.label, error: [t('APIKey.emptyLabel')]}})
        }

        setIsLoading(true)
        const apiKeyData = {
            label: apiKey.label.value.length <= 0 ? null : apiKey.label.value,
            expiration: apiKey.expiration.value.length <= 0 ? null : apiKey.expiration.value,
            allowedIPs: apiKey.allowedIPs.value.length <= 0 ? null : apiKey.allowedIPs.value
        }
        createAPIKey(apiKeyData).then((res) => {
            setApikeyResult(res.data)
            refetch()
            setApiKey({
                label: {value: "", error: []},
                allowedIPs: {value: "", error: []},
                expiration: {value: "", error: []},
            })
        }).catch((error) => {
            if (error.response.data.code === 7007) {
                return toast.error(t('APIKey.reachedLimit'));
            }
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
                    <form onSubmit={(e) => createAPIKeyHandler(e)}
                          className={`width-100 ${classes.content} px-1 py-2 column jc-between`}>
                        <div>{t("APIKey.content")}</div>
                        <div className={`column width-100`}>
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
                                    value={apiKey.expiration.value && {
                                        value: apiKey.expiration.value,
                                        label: t('APIKey.' + apiKey.expiration.value)
                                    }}
                                />
                            </div>
                            <div className={`row jc-between my-1`}>
                                <TextInput
                                    placeholder={t('APIKey.allowedIPsExample')}
                                    customClass={`width-100 ${classes.allowedIPsInput}`}
                                    value={apiKey.allowedIPs.value}
                                    ltr={true}
                                    lead={t('APIKey.allowedIPs')}
                                    type="text"
                                    onchange={(e) => setApiKey({
                                        ...apiKey,
                                        allowedIPs: {value: e.target.value, error: []}
                                    })}
                                    alerts={apiKey.allowedIPs.error}

                                />
                            </div>
                        </div>
                        <div className={`row jc-end mt-1`}>
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
