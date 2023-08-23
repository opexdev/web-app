import React, {useState} from "react";
import classes from "./ChangePassword.module.css";
import {Trans, useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {toast} from "react-hot-toast";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import {requestForChangePassword} from "js-api-client";

const ChangePassword = () => {
    const {t} = useTranslation();
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [userInputs, setInputs] = useState({
        newPassword: {value: "", error: []},
        confirmation: {value: "", error: []},
        currentPassword: {value: "", error: []},
    });

    const [isInputVisible, setIsInputVisible] = useState({
        newPassword: false,
        confirmation: false,
        currentPassword: false,
    });

    const inputHandler = (e) => {
        let errorMessage = []
        if (typeof e.target.dataset.min !== undefined && e.target.value.length < e.target.dataset.min) {
            errorMessage.push(<Trans
                i18nKey="ChangePassword.minInput"
                values={{
                    name: t("ChangePassword." + e.target.dataset.name),
                    min: e.target.dataset.min
                }}
            />)
        }

        setInputs({
            ...userInputs,
            [e.target.dataset.name]: {value: e.target.value, error: errorMessage}
        })
    }

    const isFormValid = () => {
        let inputs = {...userInputs}
        const hasError = Object.values(inputs).find(input => input.error.length > 0)
        if (hasError) return false
        let isEmpty = false
        for (const key in inputs) {
            if (inputs[key].value.length === 0) {
                isEmpty = true
                inputs = {
                    ...inputs,
                    [key]: {
                        ...inputs[key],
                        error: [<Trans
                            i18nKey="ChangePassword.emptyInput"
                            values={{
                                name: t("ChangePassword." + key),
                            }}
                        />]
                    }
                }
            }
        }
        setInputs(inputs);
        return !isEmpty;
    }

    const changePassword = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return

        if (userInputs.newPassword.value !== userInputs.confirmation.value) {
            setInputs({
                ...userInputs,
                confirmation: {...userInputs.confirmation, error: [t("ChangePassword.confirmationError")]}
            })
            return
        }
        setLoading(true)
        const data = {
            password: userInputs.currentPassword.value,
            newPassword: userInputs.newPassword.value,
            confirmation: userInputs.confirmation.value,
        }
        requestForChangePassword(data)
            .then(() => {
                setInputs({
                    newPassword: {value: "", error: []},
                    confirmation: {value: "", error: []},
                    currentPassword: {value: "", error: []},
                })
                toast.success(t("ChangePassword.success"));
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    setInputs({
                        newPassword: {...userInputs.newPassword, error: []},
                        confirmation: {...userInputs.confirmation, error: []},
                        currentPassword: {
                            ...userInputs.currentPassword,
                            error: [t("ChangePassword.currentPasswordError")]
                        },
                    })
                    toast.error(t("ChangePassword.error"));
                } else {
                    setError(true)
                }
            })
            .finally(() => {
                setLoading(false)
            });
    }

    return (
        <div className={`width-100 card-bg card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("ChangePassword.title")}</h3>
                </div>
            </div>
            {
                isLoading ? <Loading/> :
                    error ? <Error retryFunc={() => setError(false)}/> :
                        <form onSubmit={changePassword}
                              className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
                            <div className={`col-80 width-90 column jc-center`}>
                                <TextInput customClass={`${classes.passwordInput}`}
                                           lead={t("ChangePassword.currentPassword")}
                                           after={
                                               <Icon
                                                   iconName={`${isInputVisible.currentPassword ? ' icon-eye-2' : 'icon-eye-off'} fs-02 flex`}
                                                   onClick={() => setIsInputVisible({
                                                       ...isInputVisible,
                                                       currentPassword: !isInputVisible.currentPassword
                                                   })}
                                               />
                                           }
                                           autoComplete="off"
                                           type={isInputVisible.currentPassword ? "text" : "password"}
                                           value={userInputs.currentPassword.value}
                                           data-name="currentPassword"
                                           data-type="input"
                                           data-min={8}
                                           onchange={(e) => inputHandler(e)}
                                           alerts={userInputs.currentPassword.error}
                                />
                                <div className={`my-1`}>
                                    <TextInput
                                        customClass={`${classes.passwordInput}`}
                                        lead={t("ChangePassword.newPassword")}
                                        after={
                                            <Icon
                                                iconName={`${isInputVisible.newPassword ? ' icon-eye-2' : 'icon-eye-off'} fs-02 flex`}
                                                onClick={() => setIsInputVisible({
                                                    ...isInputVisible,
                                                    newPassword: !isInputVisible.newPassword
                                                })}
                                            />
                                        }
                                        type={isInputVisible.newPassword ? "text" : "password"}
                                        value={userInputs.newPassword.value}
                                        data-name="newPassword"
                                        data-type="input"
                                        data-min={8}
                                        autocomplete="new-password"
                                        onchange={(e) => inputHandler(e)}
                                        alerts={userInputs.newPassword.error}
                                    />
                                </div>
                                <TextInput
                                    customClass={`${classes.passwordInput}`}
                                    lead={t("ChangePassword.confirmation")}
                                    after={
                                        <Icon
                                            iconName={`${isInputVisible.confirmation ? ' icon-eye-2' : 'icon-eye-off'} fs-02 flex`}
                                            onClick={() => setIsInputVisible({
                                                ...isInputVisible,
                                                confirmation: !isInputVisible.confirmation
                                            })}
                                        />
                                    }
                                    type={isInputVisible.confirmation ? "text" : "password"}
                                    value={userInputs.confirmation.value}
                                    data-name="confirmation"
                                    data-type="input"
                                    data-min={8}
                                    autocomplete="new-password"
                                    onchange={(e) => inputHandler(e)}
                                    alerts={userInputs.confirmation.error}
                                />
                            </div>
                            <div className={`col-20 width-100 flex jc-center ai-center`}>
                                <Button
                                    buttonClass={`${classes.thisButton}`}
                                    buttonTitle={t("submit")}
                                />
                            </div>
                        </form>
            }
        </div>
    );
};

export default ChangePassword;