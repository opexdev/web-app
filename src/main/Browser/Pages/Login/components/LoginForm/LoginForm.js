import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import classes from "../../Login.module.css";
import TextInput from "../../../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../components/Button/Button";
import jwtDecode from "jwt-decode";
import OTPForm from "../OTPForm/OTPForm";
import {browserName, deviceType, fullBrowserVersion} from "react-device-detect";
import {validateEmail} from "../../../../../../utils/utils";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import {setUserAccountInfoInitiate, setUserInfo, setUserTokensInitiate} from "../../../../../../store/actions";
import {useGetKycStatus} from "../../../../../../queries";
import {login, parseToken} from "js-api-client";

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
    const {refetch: getKycStatus} = useGetKycStatus();

    const from = location.state?.from?.pathname || "/";
    const isLogin = useSelector((state) => state.auth.isLogin)

    const agent = [deviceType, browserName, fullBrowserVersion]
    const clientSecret = window.env.REACT_APP_CLIENT_SECRET
    const clientId = window.env.REACT_APP_CLIENT_ID

    useEffect(() => {
        if (isLogin) navigate(from, {replace: true});
    }, [])

    useEffect(() => {
        setNeedOTP(undefined)
    }, [credential.username])

    useEffect(() => {
        setLoginError(false)
    }, [needOTP])

    if (forgetPassword) return <ForgetPassword returnFunc={() => setForgetPassword(false)}/>

    const submit = async (e) => {
        e.preventDefault();
        if (credential.username.length === 0 || credential.password.length === 0) {
            return setLoginError(t("login.emptyCredentialError"));
        }

        if (!validateEmail(credential.username) || credential.password.length < 4) {
            return setLoginError(t("login.inputError"));
        }

        if (needOTP && credential.otp.length < 6) {
            setLoginError(t("login.otpLength"));
            setLoading(false);
            return;
        }
        setLoading(true);
        setLoginError(false);

        login(credential, agent, clientId, clientSecret)
            .then(async (res) => {
                const userToken = parseToken(res.data);
                const jwt = jwtDecode(userToken.accessToken)
                await dispatch(setUserInfo(jwt));
                await dispatch(setUserTokensInitiate(userToken));
                await dispatch(setUserAccountInfoInitiate())
                await getKycStatus()
                return navigate(from, {replace: true});
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    return setLoginError(t("login.wrongPassword"));
                }
                if (err?.response?.status === 403) {
                    setLoginError(t("login.wrongOTP"));
                    return setNeedOTP(true)
                }
                if (err?.response?.status === 400 && err?.response?.data?.error_description === "Account is not fully set up") {
                    return setLoginError(t("login.accountNotActive"));
                }
                setLoginError(t("login.loginError"));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (isLoading) return <LoginFormLoading/>

    const setOTPInputHandler = (val) => {
        setCredential({...credential, otp: val})
    }

    const returnToLogin = () => {
        setNeedOTP(undefined)
        setLoginError(false)
        setCredential({...credential, otp: ""})
    }

    return <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
        <div className={`width-100 column jc-center ai-center ${classes.formBody} py-2`}>
            {!needOTP && <span className={`font-weight-300 fs-0-8 mb-2 hover-text cursor-pointer`}
                               onClick={() => setCredential({
                                   username: "demo1@opex.dev",
                                   password: "12345678",
                                   otp: ""
                               })}>{t('login.forDemoLogin')}</span>}
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
                <span className={`${classes.errorText} fs-0-8`}>{loginError}</span>

                {needOTP ?
                    <span className="cursor-pointer flex ai-center fs-0-8"
                          onClick={returnToLogin}>{t('login.back')}</span>
                    :
                    <span className="cursor-pointer flex ai-center fs-0-8"
                          onClick={() => setForgetPassword(true)}>{t('login.forgetPassword')}</span>
                }
            </div>
        </div>

        <div className={`width-100 flex jc-center ai-center ${classes.formFooter}`}>
            <Button
                type="submit"
                buttonClass={`${classes.thisButton} cursor-pointer`}
                buttonTitle={t('login.enter')}
            />
        </div>
    </form>
}

export default LoginForm;