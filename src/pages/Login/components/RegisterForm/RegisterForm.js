import classes from "../../Login.module.css";
import React, {useState} from "react";
import TextInput from "../../../../components/TextInput/TextInput";
import LoginFormLoading from "../LoginLoading/LoginFormLoading";
import {Trans, useTranslation} from "react-i18next";
import {getToken, getUser, parsePanelToken, register, sendForgetPasswordEmail, sendVerifyEmail} from "../../api/auth";
import {setPanelTokensInitiate} from "../../../../store/actions";
import {connect} from "react-redux";
import {validateEmail} from "../../../../utils/utils";

const RegisterForm = props => {
    const {t} = useTranslation();
    const [registerStatus, setRegisterStatus] = useState("");
    const [userData, setUserData] = useState({
        firstName: {value: "", error: []},
        lastName: {value: "", error: []},
        username: {value: "", error: []},
        email: {value: "", error: []},
    });

    if (registerStatus === "loading") {
        return <LoginFormLoading/>
    }
    if (registerStatus === "finish") {
        return <div className={`column jc-center ai-center`} style={{height: "100%"}}>
            <span>{t('login.registerFinished')}</span>
            <span>{t('login.registerFinishedGoToMail')}</span>
        </div>
    }
    if (registerStatus === "finishedWithError") {
        return <div className={`column jc-center ai-center`} style={{height: "100%"}}>
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
        panelToken = parsePanelToken(panelToken.data)

        props.setPanelToken(panelToken)
        const user = {
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            username: userData.username.value,
            email: userData.email.value,
        }
        let userInfo = await register(panelToken.panelAccessToken, user)

        if (userInfo.status === 201) {

            let userInfo = await getUser(panelToken.panelAccessToken, "email", userData.email.value)

            if (userInfo.status === 200) {
                userInfo = userInfo.data.find(user => user.email === userData.email.value)
            }
            await sendVerifyEmail(panelToken.panelAccessToken, userInfo.id);
            setRegisterStatus("finish");
        }else {
            setRegisterStatus("finishedWithError");
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



    return (
        <form onSubmit={(e) => submit(e)} className={`column jc-between ${classes.form}`}>
            <div className={`container column jc-center ai-center ${classes.formBody}`}>
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
                    lead={t('username')}
                    data-name="username"
                    data-type="input"
                    data-min={5}
                    data-letter="en"
                    type="text"
                    customClass={`${classes.loginInput}`}
                    value={userData.username.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.username.error}
                />
                <TextInput
                    lead={t('email')}
                    type="email"
                    data-name="email"
                    data-type="email"
                    customClass={`${classes.loginInput}`}
                    value={userData.email.value}
                    onchange={(e) => inputHandler(e)}
                    alerts={userData.email.error}
                />
            </div>
            <div className={`container flex jc-center ai-center ${classes.formFooter}`}>
                <button type="submit" className={` ${classes.button}`}>{t('login.register')}</button>
            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPanelToken: (token) => dispatch(setPanelTokensInitiate(token)),
    };
};

export default connect(null, mapDispatchToProps)(RegisterForm);