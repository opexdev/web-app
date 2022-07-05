import React, {useEffect, useState} from 'react'
import classes from '../../User.module.css'
import {Trans, useTranslation} from "react-i18next";
import Button from "../../../../../../components/Button/Button";
import Icon from "../../../../../../components/Icon/Icon";
import TextInput from "../../../../../../components/TextInput/TextInput";
import LoginFormLoading from "../../../Login/components/LoginLoading/LoginFormLoading";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ForgetPassword = () => {

    const {t} = useTranslation();
    let navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin)
    const [loading, setLoading] = useState(false);

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
        if (loading) {
            return <LoginFormLoading/>
        }
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

        </>
    }


    const buttonClickHandler = async (e) => {
        e.preventDefault();

        console.log("in")

        if ( !isFormValid() ){
            return false
        }

        /*if (changePassword.newPassword.value !== changePassword.confirmation.value) {
            setChangePassword({...changePassword , confirmation: {...changePassword.confirmation, error: [t("ChangePassword.confirmationError")] } })
            return false
        }*/

        setLoading(true)
        /*
                const data = {
                    newPassword: changePassword.newPassword.value,
                    confirmation: changePassword.confirmation.value,
                }

                const ActivateOTPReq = await sendChangePassword(data);

                if (ActivateOTPReq && ActivateOTPReq.status === 204) {
                    setLoading(false)
                    setChangePassword({
                        newPassword: {value: "", error: []},
                        confirmation: {value: "", error: []},
                        currentPassword: {value: "", error: []},
                    })
                    toast.success(<Trans
                        i18nKey="ChangePassword.success"
                    />);

                } else if (ActivateOTPReq && ActivateOTPReq.status === 403) {
                    setLoading(false)
                    setChangePassword({
                        newPassword: {...changePassword.newPassword, error: []},
                        confirmation: {...changePassword.confirmation, error: []},
                        currentPassword: {...changePassword.currentPassword, error: [t("ChangePassword.currentPasswordError")]},
                    })
                    toast.error(<Trans
                        i18nKey="ChangePassword.error"
                    />);

                } else {
                    setError(true)
                    setLoading(false)
                }*/
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
                    buttonTitle={t("submit")}
                    type="submit"
                />
            </div>
        </form>
    );
};

export default ForgetPassword;