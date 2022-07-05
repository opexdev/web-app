import {login, parseToken} from "../../api/auth";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import classes from "../../Login.module.css";
import TextInput from "../../../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {setUserAccountInfoInitiate, setUserInfo, setUserTokensInitiate} from "../../../../../../store/actions";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {setKYCStatusInitiate} from "../../../../../../store/actions/auth";
import Button from "../../../../../../components/Button/Button";
import jwtDecode from "jwt-decode";
import OTPForm from "../OTPForm/OTPForm";
import {browserName, deviceType, fullBrowserVersion} from "react-device-detect";
import {validateEmail} from "../../../../../../utils/utils";
import ForgetPassword from "../ForgetPassword/ForgetPassword";


const LoginForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isLoading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [needOTP, setNeedOTP] = useState(undefined);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [credential, setCredential] = useState({username: "", password: "", otp: ""});
    const from = location.state?.from?.pathname || "/";


    const agent = [deviceType , browserName , fullBrowserVersion]

    useEffect(() => {
        setNeedOTP(undefined)

    }, [credential.username])

    useEffect(() => {
        setLoginError(false)
    }, [needOTP])

    if (forgetPassword){
        return <ForgetPassword returnFunc={()=>setForgetPassword(false)}/>
    }

    const submit = async (e) => {
        e.preventDefault();

        if (credential.username.length === 0 || credential.password.length === 0) {
            setLoginError(t("login.emptyCredentialError"));
            return false;
        }

        if ( !validateEmail(credential.username) || credential.password.length < 4) {
            setLoginError(t("login.inputError"));

            return false;
        }

        if (needOTP && credential.otp.length < 6) {
            setLoginError(t("login.otpLength"));
            setLoading(false);
            return false;
        }

        setLoading(true);
        setLoginError(false);

        const submitResult = await login(credential , agent);
        if (!submitResult) {
            setLoginError(t("login.loginError"));
        }
        if (submitResult.status === 401) {
            setLoginError(t("login.wrongPassword"));
        }
        if (submitResult.status === 403) {
            setLoginError(t("login.wrongOTP"));
            setNeedOTP(true)
        }

        if (submitResult.status === 400 && submitResult.data.error_description === "Account is not fully set up") {
            setLoginError(t("login.accountNotActive"));
        }
        if (submitResult && submitResult.status === 200) {
            const userToken = parseToken(submitResult.data);
            dispatch(setUserTokensInitiate(userToken));
            const jwt = jwtDecode(userToken.accessToken)
            dispatch(setUserInfo(jwt));
            dispatch(setKYCStatusInitiate())
            dispatch(setUserAccountInfoInitiate())
            return navigate(from, { replace: true });
        }
        setLoading(false);
    };

    if (isLoading) {
        return <LoginFormLoading />
    }

    const setOTPInputHandler = (val) => {
        setCredential({...credential, otp: val})
    }

    const returnToLogin = () => {
        setNeedOTP(undefined)
        setLoginError(false)
        setCredential({... credential, otp: ""})
    }

    return <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
        <div className={`container column jc-center ai-center ${classes.formBody} py-2`}>
            {!needOTP ? <div className={`font-weight-300 font-size-sm mb-2`}>
                <span>برای ورود آزمایشی،  <span className={`hover-text cursor-pointer`} onClick={() => setCredential({
                    username: "demo1@opex.dev",
                    password: "12345678",
                    otp: ""
                })}
                >اینجا  </span>کلیک کنید!</span>
            </div> : ""}
            {needOTP ?
                <OTPForm setOTP={setOTPInputHandler} initialVal={credential.otp}/>
                :
                <>
                    <TextInput
                        lead={t('email')}
                        type="text"
                        customClass={classes.loginInput}
                        value={credential.username}
                        onchange={(e) => setCredential({...credential, username: e.target.value})}
                    />
                    <TextInput
                        lead={t('password')}
                        type="password"
                        customClass={classes.loginInput}
                        value={credential.password}
                        onchange={(e) => setCredential({...credential, password: e.target.value})}
                    />
                </>
            }
            <div className={`column ${classes.forgetPassword}`}>
                <span className={`${classes.errorText} font-size-sm-plus`}>{loginError}</span>

                {needOTP ?
                    <span className="cursor-pointer flex ai-center font-size-sm-plus"
                          onClick={returnToLogin}>{t('login.back')}</span>
                    :
                    <span className="cursor-pointer flex ai-center font-size-sm-plus"
                          onClick={()=>setForgetPassword(true)}>{t('login.forgetPassword')}</span>
                }
            </div>
        </div>

        <div className={`container flex jc-center ai-center ${classes.formFooter}`}>
            <Button
                type="submit"
                buttonClass={`${classes.thisButton} cursor-pointer`}
                buttonTitle={t('login.enter')}
            />
        </div>
    </form>
}

export default LoginForm;