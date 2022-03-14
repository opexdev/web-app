import classes from "../../Login.module.css";
import React, {Fragment, useState} from "react";
import TextInput from "../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {useTranslation} from "react-i18next";
import {getToken, getUser, parsePanelToken, sendForgetPasswordEmail} from "../../api/auth";
import {setPanelTokensInitiate} from "../../../../store/actions";
import {connect} from "react-redux";
import {validateEmail} from "../../../../utils/utils";
import Button from "../../../../components/Button/Button";

const ForgetPassword = (props) => {
    const [error, setError] = useState([]);
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
        const submitResult = await sendForgetPasswordEmail(panelToken, email);

        if( submitResult.status === 204){
            setSuccess(true)
        }
        setLoading(false);
    }

    const FormBody = () => {
        if (success) {
            return <span>{t('login.forgetPasswordFinished')}</span>
        }
        return <Fragment>
            <span className={`mb-4`}>{t('login.forgetPassword')}</span>
            <TextInput
                lead={t('email')}
                type="text"
                customClass={`${classes.forgetPasswordInput} ${classes.loginInput}`}
                value={email}
                onchange={(e) => setEmail(e.target.value)}
                alerts={error}
            />
        </Fragment>
    }

    const FormFooter = () => {
        if (success) {
            return <Button
                type="button"
                buttonClass={`${classes.thisButton} ${classes.backButton} cursor-pointer ml-1`}
                buttonTitle={t('login.back')}
                onClick={props.forgetPass}
            />
        }
        return <Fragment>
            <Button
                type="button"
                buttonClass={`${classes.thisButton} ${classes.backButton} cursor-pointer ml-1`}
                buttonTitle={t('login.back')}
                onClick={props.forgetPass}
            />
            <Button
                type="submit"
                buttonClass={`${classes.thisButton} ${classes.forgetPassButton} cursor-pointer mr-1`}

                buttonTitle={t('login.resetPassword')}
            />
        </Fragment>
    }


    return (
        <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
            <div className={`container column jc-center ai-center ${classes.formBody} py-4`}>
                {FormBody()}
            </div>
            <div className={`container flex jc-center ai-center ${classes.formFooter}`}>
                {FormFooter()}
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