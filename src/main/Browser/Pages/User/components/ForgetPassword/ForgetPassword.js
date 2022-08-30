import React, {useEffect, useState} from 'react'
import classes from '../../User.module.css'
import {Trans, useTranslation} from "react-i18next";
import Button from "../../../../../../components/Button/Button";
import Icon from "../../../../../../components/Icon/Icon";
import TextInput from "../../../../../../components/TextInput/TextInput";
import LoginFormLoading from "../../../Login/components/LoginLoading/LoginFormLoading";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {forgotPassword} from "js-api-client";
import {images} from "../../../../../../assets/images";
import {Login} from "../../../../Routes/routes";

const ForgetPassword = () => {

    const {t} = useTranslation();
    let navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");

    const [changePassword, setChangePassword] = useState({
        newPassword: {value: "", error: []},
        confirmation: {value: "", error: []}
    });

    const [isInputVisible, setIsInputVisible] = useState({
        newPassword: false,
        confirmation: false
    });

    useEffect(() =>{
        if (isLogin) navigate("/", {replace: true});
    })

    const key = new URLSearchParams(useLocation().search).get("key");

    const inputHandler = (e) => {
        let errorMessage = []
        if( typeof e.target.dataset.min !== undefined  && e.target.value.length < e.target.dataset.min ) {
            errorMessage.push( <Trans
                i18nKey="ChangePassword.minInput"
                values={{
                    name: t("ChangePassword."+e.target.dataset.name),
                    min : e.target.dataset.min
                }}
            />)
        }

        if (e.target.dataset?.name === "confirmation" && e.target.value !== changePassword.newPassword.value) {
            errorMessage.push([t('login.wrongPasswordConfirmation')])
        }

        let prevState = {
            ...changePassword,
            [e.target.dataset.name]: {value: e.target.value, error: errorMessage}
        }
        if (e.target.dataset?.name === "newPassword") {
            prevState.confirmation.error = (e.target.value === changePassword.confirmation.value || changePassword.confirmation.value.length === 0) ? [] : [t('login.wrongPasswordConfirmation')]
        }
        setChangePassword(prevState)

    }

    const isFormValid = () => {
        let inputs = {...changePassword}

        const hasError = Object.values(changePassword).find( input => input.error.length > 0 )
        if( hasError ) return false
        let isEmpty = false

        for (const key in inputs) {
            if (inputs[key].value.length === 0 ){
                isEmpty = true
                inputs = {
                    ...inputs,
                    [key] : {
                        ...inputs[key],
                        error : [<Trans
                            i18nKey="ChangePassword.emptyInput"
                            values={{
                                name: t("ChangePassword."+key),
                            }}
                        />]
                    }
                }
            }
        }
        setChangePassword(inputs);
        return !isEmpty;
    }

    const content = () => {
        if (loading) return <LoginFormLoading/>
        if (response === "done") return <div className={`column jc-center ai-center`}>
            <img className={`mb-2 floating`} src={images.approve} alt="kyc-accepted"/>
            <span className={`text-green mt-2`}>{t("ChangePassword.success")}</span>
        </div>

        return <>
            <TextInput
                customClass={`${classes.passwordInput}`}
                lead={t("ChangePassword.newPassword")}
                after={
                    <Icon
                        iconName={`${isInputVisible.newPassword ? ' icon-eye-2'  : 'icon-eye-off' } font-size-md-01 flex`}
                        onClick={() => setIsInputVisible({ ...isInputVisible, newPassword: !isInputVisible.newPassword })}
                    />
                }
                autoComplete="off"
                type={isInputVisible.newPassword ? "text" : "password"}
                value={changePassword.newPassword.value}
                data-name="newPassword"
                data-type="input"
                data-min={8}
                onchange={(e) => inputHandler(e)}
                alerts={changePassword.newPassword.error}
            />
            <TextInput
                customClass={`${classes.passwordInput}`}
                lead={t("ChangePassword.confirmation")}
                after={
                    <Icon
                        iconName={`${isInputVisible.confirmation ? ' icon-eye-2'  : 'icon-eye-off' } font-size-md-01 flex`}
                        onClick={() => setIsInputVisible({ ...isInputVisible, confirmation: !isInputVisible.confirmation })}
                    />
                }
                autoComplete="off"
                type={isInputVisible.confirmation ? "text" : "password"}
                value={changePassword.confirmation.value}
                data-name="confirmation"
                data-type="input"
                //data-min={8}
                onchange={(e) => inputHandler(e)}
                alerts={changePassword.confirmation.error}
            />
            {error && <span className={`my-1 text-red font-size-sm`}>{t("userPage.serverError")}</span>}

        </>
    }

    const buttonClickHandler = async (e) => {
        e.preventDefault();
        if (response === "done") navigate(Login)
        if ( !isFormValid() ){
            return false
        }
        setLoading(true)
        forgotPassword(key, changePassword.newPassword.value, changePassword.confirmation.value)
            .then(() => {
                setResponse("done")
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form onSubmit={buttonClickHandler} className={`${classes.content} card-border column`}>
            <div className={`${classes.forgetPassWordHeader} card-header-bg text-orange flex jc-center ai-center`}>
                <h3>{t("ChangePassword.title")}</h3>
            </div>
            <div className={`${classes.forgetPassWordContent} column jc-center ai-center  m-auto`}>
                {content()}
            </div>
            <div className={`${classes.forgetPassWordFooter} width-35 m-auto`}>
                <Button
                    buttonClass={`${classes.thisButton}`}
                    buttonTitle={response === "done" ? t("signIn") : t("submit")}
                    type="submit"
                />
            </div>
        </form>
    );
};

export default ForgetPassword;