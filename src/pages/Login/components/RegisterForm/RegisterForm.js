import classes from "../../Login.module.css";
import React, {useEffect, useState} from "react";
import TextInput from "../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {Trans, useTranslation} from "react-i18next";
import {getCaptcha, getToken, register} from "../../api/auth";
import {validateEmail} from "../../../../utils/utils";
import Button from "../../../../components/Button/Button";
import {LogoutAllSessionsExceptCurrent} from "../../../../main/Browser/Sections/Content/components/Settings/api/settings";
import {toast} from "react-hot-toast";
import Loading from "../../../../components/Loading/Loading";
import Icon from "../../../../components/Icon/Icon";
import {images} from "../../../../assets/images";
import ReactTooltip from "react-tooltip";
import useInterval from "../../../../Hooks/useInterval";

const RegisterForm = () => {
    const {t} = useTranslation();
    const [registerStatus, setRegisterStatus] = useState("")
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
    });

    const captchaReq = async () => {
        setIsLoading(true)
        const captchaData = await getCaptcha()
        if (captchaData && captchaData.status === 200) {
            setIsLoading(false)
            setCaptcha({
                image: { value: `data:${captchaData.headers['content-type']};base64,${Buffer.from(captchaData.data).toString('base64')}`, error: []},
                SessionKey: {value: captchaData.headers['captcha-session-key'], error: []},
                expireTime: {value: captchaData.headers['captcha-expire-timestamp'], error: []},
            })
        } else {
            setUserData({...userData , captchaAnswer: {value: "" , error: [t("login.captchaServerError")] }})
            setCaptcha({...captcha , image: {value: undefined, error: []}})
            setIsLoading(false)

        }
    }
    useEffect(()=>{
        captchaReq().then(r => setIsLoading(false) )
    }, [])


    /*
    useInterval(async () => {
        await captchaReq();
    },  (captcha.expireTime.value)*1000);
    */

    useEffect(() => {
        ReactTooltip.rebuild();
    });




    if (registerStatus === "loading") {
        return <LoginFormLoading/>
    }
    if (registerStatus === "finish") {
        return <div className={`column jc-center ai-center text-center px-4`} style={{height: "35vh"}}>
            <span>{t('login.registerFinished')}</span>
            <span>{t('login.registerFinishedGoToMail')}</span>
            <span className={`font-size-sm-plus border-top-dotted pt-1 mt-1`}>{t('login.registerFinishedSpamMail')}</span>
        </div>
    }
    if (registerStatus === "finishedWithError") {
        return <div className={`column jc-center ai-center`} style={{height: "30vh"}}>
            <span>{t('login.finishedWithError')}</span>
        </div>
    }
    const submit = async (e) => {
        e.preventDefault();

        if ( !isFormValid() ){
            return false
        }
        setRegisterStatus("loading");
        let panelToken = await getToken();

        const user = {
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            email: userData.email.value.toLowerCase(),
            //email: userData.email.value.toLowerCase(),
            captchaAnswer: `${captcha.SessionKey.value}-${userData.captchaAnswer.value}`,
        }

        let userInfo = await register(user,panelToken)

        if (userInfo.status === 200) {
            setRegisterStatus("finish");
        }
        else{
            if (userInfo.status === 400 && userInfo.data.error === "InvalidCaptcha" ) {
                setUserData({...userData , captchaAnswer: {value: "", error: [t("login.InvalidCaptcha")]}})
                setRegisterStatus("")
            }
            else {
                setRegisterStatus("finishedWithError");
            }
        }

    };

    const inputHandler = (e) => {
        let errorMessage = []
        if( typeof e.target.dataset.min !== undefined  && e.target.value.length < e.target.dataset.min ) {
            errorMessage.push( <Trans
                i18nKey="login.minInput"
                values={{
                    name: t(e.target.dataset.name),
                    min : e.target.dataset.min
                }}
            />)
        }

        if( typeof e.target.dataset.type !== undefined  && e.target.dataset.type === "email" && !validateEmail(e.target.value) ) {
            errorMessage.push(t('login.wrongEmail'))
        }

        setUserData({
            ...userData,
            [e.target.dataset.name] :{ value :e.target.value , error : errorMessage }
        })
    }

    const isFormValid = () => {
        let inputs = {...userData}

        const hasError = Object.values(userData).find( input => input.error.length > 0 )
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
        if (captcha.image.value === undefined ) {
            return <span>{t('captchaAnswer')}</span>
        }
        return <span style={{backgroundImage: `url("${captcha.image.value}")`}}/>
    }







    return (
        <form onSubmit={(e) => submit(e)} className={`column jc-between ${classes.form}`}>
            <div className={`container column jc-center ai-center ${classes.formBody} py-2`}>
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
                    lead= {LeadCaptchaHandler()}
                    after={<span data-html={true} data-place="left" data-effect="float" data-tip={`<span class="column jc-between col-100">${t("login.refreshCaptcha")}</span>`}><Icon
                        iconName="icon-arrows-cw flex font-size-md"
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
            </div>
            <div className={`container flex jc-center ai-center ${classes.formFooter}`}>

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