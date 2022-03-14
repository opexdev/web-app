import {login, parseToken} from "../../api/auth";
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import classes from "../../Login.module.css";
import TextInput from "../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {
    setUserInfo,
    setUserTokensInitiate
} from "../../../../store/actions";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {setUserAccountInfo} from "../../../../store/actions/auth";
import Button from "../../../../components/Button/Button";
import {getAccount,} from "../../../../main/Browser/Sections/SubMenu/components/WalletSubMenu/api/wallet";
import jwtDecode from "jwt-decode";


const LoginForm = (props) => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [credential, setCredential] = useState({username: "", password: ""});

    const submit = async (e) => {
        e.preventDefault();

        if( credential.username.length === 0  || credential.password.length === 0 ){
            setLoginError(t("login.emptyCredentialError"));
            return false;
        }

        if( credential.username.length < 5 || credential.password.length < 4 ){
            setLoginError(t("login.inputError"));
            return false;
        }

        setLoginError(false);
        setLoading(true);

        const submitResult = await login(credential);
        if (!submitResult) {
            setLoginError(t("login.loginError"));
        }
        if (submitResult.status === 401) {
            setLoginError(t("login.wrongPassword"));
        }
        if (submitResult.status === 400 && submitResult.data.error_description === "Account is not fully set up") {
            setLoginError(t("login.accountNotActive"));
        }
        if (submitResult && submitResult.status === 200) {
            const userToken = parseToken(submitResult.data);
            dispatch(setUserTokensInitiate(userToken));
            const jwt = jwtDecode(userToken.accessToken)
            dispatch(setUserInfo(jwt));
            let account = await getAccount(userToken.accessToken)
            if (account) {
                dispatch(setUserAccountInfo(account))
            }
            return history.push("/");
        }
        setLoading(false);
    };

    if (isLoading) {
        return <LoginFormLoading/>
    }

    return <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
        <div className={`container column jc-center ai-center ${classes.formBody} py-2`}>
            <div className={`font-weight-300 mb-2`}>
                <span>برای ورود آزمایشی می توانید از <span className={`hover-text cursor-pointer`} onClick={() => setCredential({username: "demo1", password: "demo1"})}>نام کاربری و رمز عبور demo1</span> استفاده کنید.</span>
            </div>
            <TextInput
                lead={t('username')}
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
            <div className={`column ${classes.forgetPassword}`}>
                <span className={`${classes.errorText} font-size-sm-plus`}>{loginError}</span>
                <span className="cursor-pointer flex ai-center font-size-sm-plus" onClick={props.forgetPass}>{t('login.forgetPassword')}</span>
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