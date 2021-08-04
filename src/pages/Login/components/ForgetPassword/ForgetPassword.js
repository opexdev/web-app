import classes from "../../Login.module.css";
import React, {useState} from "react";
import Icon from "../../../../components/Icon/Icon";
import TextInput from "../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {useTranslation} from "react-i18next";
import {getToken, getUser, parsePanelToken, sendForgetPasswordEmail} from "../../api/auth";
import {setPanelTokensInitiate} from "../../../../store/actions";
import {connect} from "react-redux";
import {validateEmail} from "../../../../utils/utils";

const ForgetPassword = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const {t} = useTranslation();

    if (isLoading) {
        return <LoginFormLoading/>
    }

    const submit = async (e) => {
        e.preventDefault();
        if (!email){
            setError([t('login.emptyEmail')])
            return false
        }
        if (!validateEmail(email)) {
            setError([t('login.wrongEmail')])
            return false
        }

        setLoading(true);

        let panelToken = await getToken();
        panelToken = parsePanelToken(panelToken.data)

        props.setPanelToken(panelToken)
        let userInfo = await getUser(panelToken.panelAccessToken, "email", email)

        if (userInfo.status === 200) {
            userInfo = userInfo.data.find(user => user.email === email)
        }

        if (!userInfo) {
            setError(t('login.notFoundEmail'))
            setLoading(false);
            return false
        }
        const submitResult = await sendForgetPasswordEmail(panelToken.panelAccessToken, userInfo.id);

        if( submitResult.status === 204){
            setSuccess(true)
        }
        setLoading(false);
    }

    if(success){
        return <div className={`column jc-center ai-center`} style={{height: "100%"}}>
            <span>{t('login.forgetPasswordFinished')}</span>
        </div>
    }
    return (
        <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
            <div className={`row jc-between ai-center ${classes.restPassHeader}`}>
                <Icon iconName="icon-down-open font-size-md-01" customClass={`${classes.thisButton} cursor-pointer`}
                      onClick={props.forgetPass}/>
                <span>{t('login.forgetPassword')}</span>
                <Icon iconName="icon-down-open font-size-md-01"
                      customClass={`${classes.thisButton} visibility-hidden cursor-pointer`}/>
            </div>
            <div className={`container column jc-center ai-center ${classes.restPassBody}`}>
                <TextInput
                    lead={t('email')}
                    type="text"
                    customClass={`${classes.forgetPasswordInput} ${classes.loginInput} `}
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                    alerts={error}
                />
            </div>
            <div className={`container flex jc-center ai-center ${classes.formFooter}`}>
                <button type="submit" className={`flex jc-center ai-center ${classes.button} ${classes.forgetPassButton}`}>
                    {t('login.resetPassword')}
                </button>
            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPanelToken: (token) => dispatch(setPanelTokensInitiate(token)),
    };
};

export default connect(null, mapDispatchToProps)(ForgetPassword);