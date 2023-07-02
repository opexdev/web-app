import classes from "../../Login.module.css";
import React, {useEffect, useState} from "react";
import TextInput from "../../../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../components/Button/Button";
import Icon from "../../../../../../components/Icon/Icon";
import {images} from "../../../../../../assets/images";
import {validateEmail} from "../../../../../../utils/utils";
import {getCaptchaImage, requestForForgetPassword} from "js-api-client";
import {Buffer} from 'buffer';

const ForgetPassword = ({returnFunc}) => {

    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [forgetPass, setForgetPass] = useState({
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
            setForgetPass({...forgetPass, captchaAnswer: {value: "", error: [t("login.captchaServerError")]}})
            setCaptcha({...captcha, image: {value: undefined, error: []}})
        }).finally(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        captchaReq()
    }, [])



    if (loading) return <LoginFormLoading/>

    const submit = async (e) => {
        e.preventDefault();
        if (forgetPass.email.value === "") {
            setForgetPass({...forgetPass, email: {value: "", error: [t('login.emptyEmail')]}})
            return;
        }
        if (!validateEmail(forgetPass.email.value)) {
            setForgetPass({...forgetPass, email: {value: "", error: [t('login.forgetPassEmailForgetError')]}})
            return;
        }
        if (forgetPass.captchaAnswer.value === "") {
            setForgetPass({...forgetPass, captchaAnswer: {value: "", error: [t('login.emptyCaptcha')]}})
            return;
        }
        if (forgetPass.captchaAnswer.value.length < 5) {
            setForgetPass({...forgetPass, captchaAnswer: {value: "", error: [t('login.minCaptcha')]}})
            return;
        }
        setLoading(true);

        const captchaValue = `${captcha.SessionKey.value}-${forgetPass.captchaAnswer.value}`
        requestForForgetPassword(forgetPass.email.value, captchaValue)
            .then(() => {
                setSuccess(true)
            })
            .catch((err) => {
                if (err?.status === 400 && err?.data?.error === "InvalidCaptcha") {
                    setForgetPass({...forgetPass, captchaAnswer: {value: "", error: [t("login.InvalidCaptcha")]}})
                } else {
                    setForgetPass({
                        ...forgetPass,
                        captchaAnswer: {value: "", error: [t('login.forgetPassServerError')]}
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

        return <img src={captcha.image.value} className={`height-100`} alt={t('captchaAnswer')}/>
    }


    const FormBody = () => {
        if (success) return <span>{t('login.forgetPasswordFinished')}</span>

        return <>
            <span className={`mb-4`}>{t('login.forgetPassword')}</span>
            <TextInput
                lead={t('email')}
                type="text"
                data-name="email"
                data-type="email"
                customClass={`${classes.forgetPasswordInput} ${classes.loginInput}`}
                value={forgetPass.email.value}
                onchange={(e) =>
                    setForgetPass({...forgetPass, email: {value: e.target.value, error: []}})
                }
                alerts={forgetPass.email.error}
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
                value={forgetPass.captchaAnswer.value}
                onchange={(e) =>
                    setForgetPass({...forgetPass, captchaAnswer: {value: e.target.value, error: []}})
                }
                alerts={forgetPass.captchaAnswer.error}
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
                buttonClass={`${classes.thisButton} ${classes.forgetPassButton} cursor-pointer mr-1`}
                buttonTitle={t('login.resetPassword')}
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
    )
}

export default ForgetPassword;