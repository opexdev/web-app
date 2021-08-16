import {getToken, getUser, login, parsePanelToken, parseToken} from "../../api/auth";
import {connect} from "react-redux";
import React, {useState} from "react";
import classes from "../../Login.module.css";
import TextInput from "../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {
    setUserInfo,
    setPanelTokensInitiate,
    setUserTokensInitiate
} from "../../../../store/actions";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getAccount, parseWalletsResponse} from "../../../../main/SubMenu/components/WalletSubMenu/api/wallet";
import {setUserAccountInfo} from "../../../../store/actions/auth";


const LoginForm = (props) => {
    const {t} = useTranslation();
    const history = useHistory();
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

        setLoginError(false)
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
            props.setToken(userToken)

            let panelToken = await getToken()
            panelToken = parsePanelToken(panelToken.data)
            props.setPanelToken(panelToken)

            let userInfo = await getUser(panelToken.panelAccessToken, "username", credential.username)
            if (userInfo.status === 200) {
                userInfo = userInfo.data.find(user => user.username === credential.username)
                props.setUserInfo(userInfo)
            }
            let account = await getAccount(userToken.accessToken)
            if (account.status === 200) {
                const parsedData = parseWalletsResponse(account.data);
                props.setUserAccountInfo(parsedData)
            }

            return history.push("/");

        }
        setLoading(false);
    };

    if (isLoading) {
        return <LoginFormLoading/>
    }

    return <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
        <div className={`container column jc-center ai-center ${classes.formBody}`}>
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
                <span className="cursor-pointer flex ai-center font-size-sm-plus"
                      onClick={props.forgetPass}>{t('login.forgetPassword')}</span>
            </div>
        </div>

        <div className={`container flex jc-center ai-center ${classes.formFooter}`}>
            <button type="submit" className={`flex jc-center ai-center ${classes.button}`}>{t('login.enter')}</button>
        </div>
    </form>
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch(setUserTokensInitiate(token)),
        setPanelToken: (token) => dispatch(setPanelTokensInitiate(token)),
        setUserInfo: (token) => dispatch(setUserInfo(token)),
        setUserAccountInfo: (info) => dispatch(setUserAccountInfo(info)),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);