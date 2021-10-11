import React, {useState, useEffect, useRef} from "react";
import classes from "./ChangePassword.module.css";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../../../components/Button/Button";


const ChangePassword = () => {
  const {t} = useTranslation();
    const [changePassword, setChangePassword] = useState({
        newPassword: "",
        repeatNewPassword: "",
        currentPassword: "",
    });
    const [isInputVisible, setIsInputVisible] = useState({
        newPassword: false,
        repeatNewPassword: false,
        currentPassword: false,
    });

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
        <div className="row jc-start ">
          <h3>{t("ChangePassword.title")}</h3>
        </div>
      </div>
      <div className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
          <div className="row jc-between">
              <div className="col-49">
                  <TextInput
                      customClass={classes.passwordInput}
                      lead={t("ChangePassword.newPassword")}
                      after={
                          <Icon
                              iconName={`${isInputVisible.newPassword ? 'icon-eye'  : 'icon-closed_eye' } font-size-md-01 flex`}
                              onClick={() => setIsInputVisible({ ...isInputVisible, newPassword: !isInputVisible.newPassword })}
                          />
                      }
                      type={isInputVisible.newPassword ? "text" : "password"}
                      onchange={(e) =>
                          setChangePassword({...changePassword, repeatNewPassword: e.value,})
                      }
                  />
              </div>
              <div className="col-49">
                  <TextInput
                      customClass={classes.passwordInput}
                      lead={t("ChangePassword.repeatNewPassword")}
                      after={
                          <Icon
                              iconName={`${isInputVisible.repeatNewPassword ? 'icon-eye'  : 'icon-closed_eye' } font-size-md-01 flex`}
                              onClick={() => setIsInputVisible({ ...isInputVisible, repeatNewPassword: !isInputVisible.repeatNewPassword })}
                          />
                      }
                      type={isInputVisible.repeatNewPassword ? "text" : "password"}
                      onchange={(e) =>
                          setChangePassword({
                              ...changePassword,
                              currentPassword: e.value,
                          })
                      }
                  />
              </div>
          </div>
          <div className="row jc-between">
              <div className="col-49">
                  <TextInput
                      customClass={classes.passwordInput}
                      lead={t("ChangePassword.currentPassword")}
                      after={
                          <Icon
                              iconName={`${isInputVisible.currentPassword ? 'icon-eye'  : 'icon-closed_eye' } font-size-md-01 flex`}
                              onClick={() => setIsInputVisible({ ...isInputVisible, currentPassword: !isInputVisible.currentPassword })}
                          />
                      }
                      type={isInputVisible.currentPassword ? "text" : "password"}
                      onchange={(e) =>
                          setChangePassword({
                              ...changePassword,
                              newPassword: e.value,
                          })
                      }
                  />
              </div>
              <div className="col-49 flex jc-end">
                  <Button
                      buttonClass={`${classes.thisButton}`}
                      buttonTitle={t("submit")}
                  />
              </div>

          </div>

      </div>
    </div>
  );
};

export default ChangePassword;
