import React, {useState, useEffect, useRef} from "react";
import classes from "./ChangePassword.module.css";
import {Trans, useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../../../components/Button/Button";
import {useSelector} from "react-redux";
import {sendActivateOTP, sendChangePassword} from "../../../../api/settings";
import {toast} from "react-hot-toast";
import Error from "../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import DisableOTP from "../SetTwoStepVerification/components/DisableOTP";
import ActivateOTP from "../SetTwoStepVerification/components/ActivateOTP";
import {validateEmail} from "../../../../../../../../../../utils/utils";


const ChangePassword = () => {
  const {t} = useTranslation();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [req, setReq] = useState(undefined);


    const [changePassword, setChangePassword] = useState({
        newPassword: {value: "", error: []},
        confirmation: {value: "", error: []},
        currentPassword: {value: "", error: []},
    });

    const [isInputVisible, setIsInputVisible] = useState({
        newPassword: false,
        confirmation: false,
        currentPassword: false,
    });


    const inputHandler = (e) => {
        let errorMessage = []
        if( typeof e.target.dataset.min !== undefined  && e.target.value.length < e.target.dataset.min ) {
            errorMessage.push( <Trans
                i18nKey="ChangePassword.minInput"
                values={{
                    name: t("ChangePassword."+e.target.dataset.name),
                    min : e.target.dataset.min
                }}
            />)
        }

        setChangePassword({
            ...changePassword,
            [e.target.dataset.name] :{ value :e.target.value , error : errorMessage }
        })
    }

    const isFormValid = () => {
        let inputs = {...changePassword}

        const hasError = Object.values(changePassword).find( input => input.error.length > 0 )
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
                            i18nKey="ChangePassword.emptyInput"
                            values={{
                                name: t("ChangePassword."+key),
                            }}
                        />]
                    }
                }
            }
        }
        setChangePassword(inputs);
        return !isEmpty;
    }



    const buttonClickHandler = async (e) => {
        e.preventDefault();

        if ( !isFormValid() ){
            return false
        }

        if (changePassword.newPassword.value !== changePassword.confirmation.value) {
            setChangePassword({...changePassword , confirmation: {...changePassword.confirmation, error: [t("ChangePassword.confirmationError")] } })
            return false
        }

        setLoading(true)

        const data = {
            password: changePassword.currentPassword.value,
            newPassword: changePassword.newPassword.value,
            confirmation: changePassword.confirmation.value,
        }
        const ActivateOTPReq = await sendChangePassword(data);
        if (ActivateOTPReq && ActivateOTPReq.status === 204) {
            setLoading(false)
            setChangePassword({
                newPassword: {value: "", error: []},
                confirmation: {value: "", error: []},
                currentPassword: {value: "", error: []},
            })
            toast.success(<Trans
                i18nKey="ChangePassword.success"
            />);

        } else if (ActivateOTPReq && ActivateOTPReq.status === 403) {
            setLoading(false)
            setChangePassword({
                newPassword: {...changePassword.newPassword, error: []},
                confirmation: {...changePassword.confirmation, error: []},
                currentPassword: {...changePassword.currentPassword, error: [t("ChangePassword.currentPasswordError")]},
            })
            toast.error(<Trans
                i18nKey="ChangePassword.error"
            />);

        } else {
            setError(true)
            setLoading(false)
        }



    }

    const content = () => {
        if (error) {
            return <Error/>
        }
        if (loading) {
            return <Loading/>
        }
        return <form onSubmit={buttonClickHandler} className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
            <div className={`col-80 width-90 column jc-center`}>
                <TextInput
                    customClass={`${classes.passwordInput}`}
                    lead={t("ChangePassword.currentPassword")}
                    after={
                        <Icon
                            iconName={`${isInputVisible.currentPassword ? ' icon-eye-2'  : 'icon-eye-off' } font-size-md-01 flex`}
                            onClick={() => setIsInputVisible({ ...isInputVisible, currentPassword: !isInputVisible.currentPassword })}
                        />
                    }
                    autocomplete="off"
                    type={isInputVisible.currentPassword ? "text" : "password"}
                    value={changePassword.currentPassword.value}
                    data-name="currentPassword"
                    data-type="input"
                    data-min={5}
                    onchange={(e) => inputHandler(e)}
                    alerts={changePassword.currentPassword.error}
                />
                <div className={`my-1`}>
                    <TextInput
                        customClass={`${classes.passwordInput}`}
                        lead={t("ChangePassword.newPassword")}
                        after={
                            <Icon
                                iconName={`${isInputVisible.newPassword ? ' icon-eye-2'  : 'icon-eye-off' } font-size-md-01 flex`}
                                onClick={() => setIsInputVisible({ ...isInputVisible, newPassword: !isInputVisible.newPassword })}
                            />
                        }
                        autocomplete="off"
                        type={isInputVisible.newPassword ? "text" : "password"}
                        value={changePassword.newPassword.value}
                        data-name="newPassword"
                        data-type="input"
                        data-min={8}
                        onchange={(e) => inputHandler(e)}
                        alerts={changePassword.newPassword.error}
                    />
                </div>
                <TextInput
                    customClass={`${classes.passwordInput}`}
                    lead={t("ChangePassword.confirmation")}
                    after={
                        <Icon
                            iconName={`${isInputVisible.confirmation ? ' icon-eye-2'  : 'icon-eye-off' } font-size-md-01 flex`}
                            onClick={() => setIsInputVisible({ ...isInputVisible, confirmation: !isInputVisible.confirmation })}
                        />
                    }
                    autocomplete="off"
                    type={isInputVisible.confirmation ? "text" : "password"}
                    value={changePassword.confirmation.value}
                    data-name="confirmation"
                    data-type="input"
                    data-min={8}
                    onchange={(e) => inputHandler(e)}
                    alerts={changePassword.confirmation.error}
                />

            </div>
            <div className={`col-20 width-100 flex jc-center ai-center`}>
                <Button
                    buttonClass={`${classes.thisButton}`}
                    buttonTitle={t("submit")}
                />
            </div>

        </form>
    }

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
        <div className="row jc-start ">
          <h3>{t("ChangePassword.title")}</h3>
        </div>
      </div>
        {content()}
    </div>
  );
};

export default ChangePassword;
