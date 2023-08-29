import classes from "../../Login.module.css";
import React, {useEffect, useState} from "react";
import TextInput from "../../../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {Trans, useTranslation} from "react-i18next";
import {validateEmail} from "../../../../../../utils/utils";
import Button from "../../../../../../components/Button/Button";
import Icon from "../../../../../../components/Icon/Icon";
import {images} from "../../../../../../assets/images";
import {getCaptchaImage, getPanelToken, userRegister} from "js-api-client";
import EmailVerification from "../EmailVerification/EmailVerification";
import {setVerifyEmailLockInitiate} from "../../../../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Buffer} from 'buffer';

const RegisterForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const verifyEmailLock = useSelector((state) => state.exchange.verifyEmailLock)

    const [registerStatus, setRegisterStatus] = useState("")
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [disable, setDisable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [captcha, setCaptcha] = useState({
        image: {value: "", error: []},
        SessionKey: {value: "", error: []},
        expireTime: {value: "", error: []},
    });
    const [userData, setUserData] = useState({
        firstName: {value: "", error: []},
        lastName: {value: "", error: []},
        email: {value: "", error: []},
        captchaAnswer: {value: "", error: []},
        password: {value: "", error: []},
        confirmPassword: {value: "", error: []},
    });
    const [isInputVisible, setIsInputVisible] = useState({
        password: false,
        confirmPassword: false,
    });

    const clientSecret = window.env.REACT_APP_CLIENT_SECRET
    const clientId = window.env.REACT_APP_CLIENT_ID

    const captchaReq = async () => {
        setIsLoading(true)
        await getCaptchaImage()
            .then((res) => {
                setCaptcha({
                    image: {
                        value: `data:${res.headers['content-type']};base64,${Buffer.from(res.data).toString('base64')}`,
                        error: []
                    },
                    SessionKey: {value: res.headers['captcha-session-key'], error: []},
                    expireTime: {value: res.headers['captcha-expire-timestamp'], error: []},
                })
            })
            .catch(() => {
                setUserData({...userData, captchaAnswer: {value: "", error: [t("login.captchaServerError")]}})
                setCaptcha({...captcha, image: {value: undefined, error: []}})
            })
            .finally(() => {
                setIsLoading(false)
            });
    }
    useEffect(() => {
        captchaReq()
    }, [])

    useEffect(() => {
        if (verifyEmailLock && new Date().getTime() < verifyEmailLock) setDisable(true)
    }, [verifyEmailLock]);

    if (registerStatus === "loading") return <LoginFormLoading/>

    if (verifyEmail) return <EmailVerification returnFunc={() => setVerifyEmail(false)} email={userData?.email?.value} disable={disable} returnFuncDisableFalse={() => setDisable(false)} returnFuncDisableTrue={() => setDisable(true)}/>

    if (registerStatus === "finish") {
        return <div className={`column jc-center ai-center text-center px-4`} style={{height: "35vh"}}>
            <span className={`text-green mb-2`}>{t('login.registerFinished')}</span>
            <span className={`mt-2`}>
                <Trans
                    i18nKey="login.registerFinishedGoToMail"
                    values={{
                        email: userData?.email?.value,
                    }}
                />
            </span>
            <span className={`fs-0-8 border-top-dotted pt-1 mt-1`}><Trans
                i18nKey="login.registerFinishedSpamMail"
                values={{email: window.env.REACT_APP_SYSTEM_EMAIL_ADDRESS,}}
            /></span>

            <div className={`column mt-3 hover-text text-orange`}>
                <span className="cursor-pointer flex ai-center fs-0-8" onClick={() => setVerifyEmail(true)}>{t('login.verificationEmail')}</span>
            </div>
        </div>
    }


    if (registerStatus === "finishedWithError") {
        return <div className={`column jc-center ai-center text-red`} style={{height: "30vh"}}>
            <span>{t('login.finishedWithError')}</span>
        </div>
    }

    const submit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) return

        setRegisterStatus("loading");
        const {data: {access_token: panelToken}} = await getPanelToken(clientId, clientSecret);

        const user = {
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            password: userData.password.value,
            passwordConfirmation: userData.confirmPassword.value,
            email: userData.email.value.toLowerCase(),
            captchaAnswer: `${captcha.SessionKey.value}-${userData.captchaAnswer.value}`,
        }

        userRegister(user, panelToken)
            .then(() => {
                setRegisterStatus("finish");
                setDisable(true)
                dispatch(setVerifyEmailLockInitiate(new Date().getTime() + 2 * 60 * 1000))
            }).catch((e) => {
            if (e?.response?.data?.error === "InvalidCaptcha") {
                setUserData({...userData, captchaAnswer: {value: "", error: [t("login.InvalidCaptcha")]}})
                setRegisterStatus("")
            } else if (e?.response?.data?.error === "UserAlreadyExists") {
                setUserData({...userData, email: {...userData.email, error: [t("login.UserAlreadyExists")]}})
                setRegisterStatus("")
            } else {
                setRegisterStatus("finishedWithError");
            }
        })
    };

    const inputHandler = (e) => {
        let errorMessage = []
        if (typeof e.target.dataset.min !== undefined && e.target.value.length < e.target.dataset.min) {
            errorMessage.push(<Trans
                i18nKey="login.minInput"
                values={{
                    name: t(e.target.dataset.name),
                    min: e.target.dataset.min
                }}
            />)
        }
        if (e.target.dataset?.type === "email" && !validateEmail(e.target.value)) {
            errorMessage.push(t('login.wrongEmail'))
        }
        if (e.target.dataset?.name === "confirmPassword" && e.target.value !== userData.password.value) {
            errorMessage.push([t('login.wrongPasswordConfirmation')])
        }
        let prevState = {
            ...userData,
            [e.target.dataset.name]: {value: e.target.value, error: errorMessage}
        }
        if (e.target.dataset?.name === "password") {
            prevState.confirmPassword.error = (e.target.value === userData.confirmPassword.value || userData.confirmPassword.value.length === 0) ? [] : [t('login.wrongPasswordConfirmation')]
        }
        setUserData(prevState)
    }

    const isFormValid = () => {
        let inputs = {...userData}

        const hasError = Object.values(userData).find(input => input.error.length > 0)
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
                            i18nKey="login.emptyInput"
                            values={{
                                name: t(key),
                            }}
                        />]
                    }
                }
            }
        }

        setUserData(inputs);
        return !isEmpty;
    }

    const LeadCaptchaHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
        }
        if (captcha.image.value === undefined) {
            return <span>{t('captchaAnswer')}</span>
        }
        return <img src={captcha.image.value} className={`height-100`} alt={t('captchaAnswer')}/>
    }

    return (
        <form onSubmit={(e) => submit(e)} className={`column jc-between ${classes.form}`}>
            <div className={`width-100 column jc-center ai-center ${classes.formBody} py-2`}>
                <TextInput
                    lead={t('firstName')}
                    data-name="firstName"
                    data-type="input"
                    data-min={2}
                    type="text"
                    customClass={`${classes.loginInput}`}
                    value={userData.firstName.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.firstName.error}
                />

                <TextInput
                    lead={t('lastName')}
                    data-name="lastName"
                    data-type="input"
                    data-min={2}
                    type="text"
                    customClass={`${classes.loginInput}`}
                    value={userData.lastName.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.lastName.error}
                />
                <TextInput
                    lead={t('email')}
                    type="email"
                    data-name="email"
                    data-type="email"
                    customClass={`${classes.loginInput} ${classes.ltrInput}`}
                    value={userData.email.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.email.error}
                />
                <TextInput
                    lead={t('password')}
                    data-name="password"
                    customClass={`${classes.loginInput} ${classes.passwordInput}`}
                    ltr={true}
                    autoComplete="new-password"
                    value={userData.password.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.password.error}
                    data-min={8}
                    type={isInputVisible.password ? "text" : "password"}
                    after={
                        <Icon
                            iconName={`${isInputVisible.password ? ' icon-eye-2' : 'icon-eye-off'} fs-02 flex cursor-pointer hover-text`}
                            onClick={() => setIsInputVisible({
                                ...isInputVisible,
                                password: !isInputVisible.password
                            })}
                        />
                    }
                />
                <TextInput
                    lead={t('confirmPassword')}
                    data-name="confirmPassword"
                    customClass={`${classes.loginInput} ${classes.passwordInput}`}
                    ltr={true}
                    autoComplete="new-password"
                    value={userData.confirmPassword.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.confirmPassword.error}
                    type={isInputVisible.confirmPassword ? "text" : "password"}
                    after={
                        <Icon
                            iconName={`${isInputVisible.confirmPassword ? ' icon-eye-2' : 'icon-eye-off'} fs-02 flex cursor-pointer hover-text`}
                            onClick={() => setIsInputVisible({
                                ...isInputVisible,
                                confirmPassword: !isInputVisible.confirmPassword
                            })}
                        />
                    }
                />
                <TextInput
                    lead={LeadCaptchaHandler()}
                    after={<span data-tooltip-id="opex-tooltip" data-tooltip-place="left" data-tooltip-float={true}
                                 data-tooltip-html={`<span class="column jc-between col-100">${t("login.refreshCaptcha")}</span>`}><Icon
                        iconName="icon-arrows-cw flex fs-01"
                        onClick={captchaReq}
                        customClass={`hover-text cursor-pointer`}
                    /></span>}
                    type="text"
                    data-name="captchaAnswer"
                    data-type="input"
                    data-min={5}
                    customClass={`${classes.loginInput} ${classes.captcha}`}
                    value={userData.captchaAnswer.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.captchaAnswer.error}
                    maxLength="5"
                />

                <div className={`column ${classes.forgetPassword} mt-1`}>
                    <div className="flex ai-center fs-0-8"><span className={`cursor-pointer hover-text`} onClick={() => setVerifyEmail(true)}>{t('login.verificationEmail')}</span></div>
                </div>

            </div>
            <div className={`width-100 flex jc-center ai-center ${classes.formFooter}`}>
                <Button
                    type="submit"
                    buttonClass={`${classes.thisButton} cursor-pointer`}
                    buttonTitle={t('login.register')}
                />
            </div>
        </form>
    )
}

export default RegisterForm;