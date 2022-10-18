import React, {useEffect, useState} from 'react';
import classes from "../../Login.module.css";
import Button from "../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import {getCaptchaImage, getPanelToken, requestForVerifyEmail} from "js-api-client";
import ReactTooltip from "react-tooltip";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {validateEmail} from "../../../../../../utils/utils";
import {images} from "../../../../../../assets/images";
import TextInput from "../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../components/Icon/Icon";
import Countdown from "react-countdown";
import {useSelector} from "react-redux";

const EmailVerification = ({returnFunc, email, disable, returnFuncDisable}) => {

    const clientSecret = window.env.REACT_APP_CLIENT_SECRET
    const clientId = window.env.REACT_APP_CLIENT_ID

    const {t} = useTranslation();

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const verifyEmailLock = useSelector((state) => state.exchange.verifyEmailLock)

    const [activeEmail, setActiveEmail] = useState({
        email: {value: "", error: []},
        captchaAnswer: {value: "", error: []},
    });
    const [captcha, setCaptcha] = useState({
        image: {value: "", error: []},
        SessionKey: {value: "", error: []},
        expireTime: {value: "", error: []},
    });

    const captchaReq = () => {
        setIsLoading(true)
        getCaptchaImage()
            .then((res) => {
                setCaptcha({
                    image: {
                        value: `data:${res.headers['content-type']};base64,${Buffer.from(res.data).toString('base64')}`,
                        error: []
                    },
                    SessionKey: {value: res.headers['captcha-session-key'], error: []},
                    expireTime: {value: res.headers['captcha-expire-timestamp'], error: []},
                })
            }).catch(() => {
            setActiveEmail({...activeEmail, captchaAnswer: {value: "", error: [t("login.captchaServerError")]}})
            setCaptcha({...captcha, image: {value: undefined, error: []}})
        }).finally(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        captchaReq()
        if (email.length > 0) return setActiveEmail({...activeEmail, email: {...activeEmail.email, value: email}})
    }, [])


    useEffect(() => {
        ReactTooltip.rebuild();
    });

    if (loading) return <LoginFormLoading/>

    const submit = async (e) => {
        e.preventDefault();
        if (activeEmail.email.value === "") {
            setActiveEmail({...activeEmail, email: {value: "", error: [t('login.emptyEmail')]}})
            return;
        }
        if (!validateEmail(activeEmail.email.value)) {
            setActiveEmail({...activeEmail, email: {value: "", error: [t('login.forgetPassEmailForgetError')]}})
            return;
        }
        if (activeEmail.captchaAnswer.value === "") {
            setActiveEmail({...activeEmail, captchaAnswer: {value: "", error: [t('login.emptyCaptcha')]}})
            return;
        }
        if (activeEmail.captchaAnswer.value.length < 5) {
            setActiveEmail({...activeEmail, captchaAnswer: {value: "", error: [t('login.minCaptcha')]}})
            return;
        }
        setLoading(true);

        const {data: {access_token: panelToken}} = await getPanelToken(clientId, clientSecret);
        const captchaValue = `${captcha.SessionKey.value}-${activeEmail.captchaAnswer.value}`
        requestForVerifyEmail(activeEmail.email.value, captchaValue)
            .then(() => {
                setSuccess(true)
            })
            .catch((err) => {
                if (err?.response?.data?.code === 10001 && err?.response?.data?.message === "Captcha is not valid") {
                    console.log("in captcha erro")
                    return setActiveEmail({...activeEmail, captchaAnswer: {value: "", error: [t("login.InvalidCaptcha")]}})
                }
                if (err?.response?.data?.code === 1002 && err?.response?.data?.message === "User already verified") {
                    return setActiveEmail({...activeEmail, captchaAnswer: {value: "", error: [t("login.userAlreadyVerified")]}})
                } else {
                    return setActiveEmail({
                        ...activeEmail,
                        captchaAnswer: {value: "", error: [t('login.verifyEmailServerError')]}
                    })
                }
            })
            .finally(() => {
                setLoading(false);
            });

    }

    const LeadCaptchaHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                   alt="linearLoading"/>

        if (captcha.image.value === undefined) return <span>{t('captchaAnswer')}</span>

        return <span style={{backgroundImage: `url("${captcha.image.value}")`}}/>
    }

    const sendEmailButtonTitle = () => {
        if (disable) {
            return <span className={`flex row jc-center`}>{t('login.sendEmail')}  ( <Countdown
                date={verifyEmailLock && new Date().getTime() < verifyEmailLock ? new Date(parseInt(verifyEmailLock)) : Date.now() + 120000}
                renderer={props => <div> {props.minutes}:{props.seconds} </div>}
                onComplete={returnFuncDisable}
            />)</span>
        }
        return <span>{t('login.sendEmail')}</span>
    }


    const FormBody = () => {
        if (success) return <span>{t('login.verifyEmailFinished')}</span>

        return <>
            <span className={`mb-4`}>{t('login.resendVerifyEmail')}</span>
            <TextInput
                lead={t('email')}
                type="text"
                data-name="email"
                data-type="email"
                customClass={`${classes.forgetPasswordInput} ${classes.loginInput}`}
                value={activeEmail.email.value}
                onchange={(e) =>
                    setActiveEmail({...activeEmail, email: {value: e.target.value, error: []}})
                }
                alerts={activeEmail.email.error}
            />
            <TextInput
                lead={LeadCaptchaHandler()}
                after={<span data-html={true} data-place="left" data-effect="float"
                             data-tip={`<span class="column jc-between col-100">${t("login.refreshCaptcha")}</span>`}><Icon
                    iconName="icon-arrows-cw flex fs-01"
                    onClick={captchaReq}
                    customClass={`hover-text cursor-pointer`}
                /></span>}
                type="text"
                data-name="captchaAnswer"
                data-type="input"
                data-min={5}
                customClass={`${classes.loginInput} ${classes.captcha}`}
                value={activeEmail.captchaAnswer.value}
                onchange={(e) =>
                    setActiveEmail({...activeEmail, captchaAnswer: {value: e.target.value, error: []}})
                }
                alerts={activeEmail.captchaAnswer.error}
                maxLength="5"
            />
        </>
    }


    const FormFooter = () => {
        if (success) return <Button
            type="button"
            buttonClass={`${classes.thisButton} ${classes.backButton} cursor-pointer ml-1`}
            buttonTitle={t('login.back')}
            onClick={returnFunc}
        />

        return <>
            <Button
                type="button"
                buttonClass={`${classes.thisButton} ${classes.backButton} cursor-pointer ml-1`}
                buttonTitle={t('login.back')}
                onClick={returnFunc}
            />
            <Button
                type="submit"
                buttonClass={`${classes.thisButton} ${classes.forgetPassButton} ${classes.disable} cursor-pointer mr-1`}
                buttonTitle={sendEmailButtonTitle()}
                disabled={disable}
            />
        </>
    }

    return (
        <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
            <div className={`width-100 column jc-center ai-center ${classes.formBody} py-4`}>
                {FormBody()}
            </div>
            <div className={`width-100 flex jc-center ai-center ${classes.formFooter}`}>
                {FormFooter()}
            </div>
        </form>
    );
};

export default EmailVerification;
