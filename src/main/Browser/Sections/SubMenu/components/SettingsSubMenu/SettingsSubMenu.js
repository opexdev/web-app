import React from "react";
import classes from "./SettingsSubMenu.module.css";
import {useTranslation} from "react-i18next";
import * as Routes from "../../../../../../routes/routes";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const SettingsSubMenu = () => {
  const {t} = useTranslation();
  const KYCStatus = useSelector(state => state.auth.kyc);

  return (
    <div className={`container card-background column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
        <div className="row jc-start ">
          <h2>{t("SettingsSubMenu.title")}</h2>
        </div>
      </div>
      <div className={`column container  ${classes.content}`}>

        {
          KYCStatus === "ACCEPTED" &&
            <NavLink
                exact={true}
                activeClassName={classes.selected}
                className="row jc-around ai-center cursor-pointer px-1 py-1"
                to={Routes.Profile}>
              <div className="row ai-center" style={{width: "40%"}}>
            <span className={`font-weight-bold pr-05 ${classes.topic}`}>
              {t("SettingsSubMenu.userProfile")}
            </span>
              </div>
              <div
                  className={`column position-relative font-size-sm mr-1 ${classes.listBox}`}
                  style={{width: "60%"}}>
            {/*<span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("UserAccountStatus.title")}
            </span>*/}
                <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("PersonalProfile.title")}
            </span>
              </div>
            </NavLink>

        }

        <NavLink
          exact={true}
          activeClassName={classes.selected}
          className="row jc-around ai-center cursor-pointer px-1 py-1"
          to={Routes.Security}>
          <div className="row ai-center" style={{width: "40%"}}>
            <span className={`font-weight-bold pr-05 ${classes.topic}`}>
              {t("SettingsSubMenu.security")}
            </span>
          </div>
          <div
            className={` column position-relative font-size-sm mr-1 ${classes.listBox}`}
            style={{width: "60%"}}>
            {/*<span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("LoginReports.title")}
            </span>*/}
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("ActiveSessions.title")}
            </span>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("ChangePassword.title")}
            </span>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("SetTwoStepVerification.title")}
            </span>
          </div>
        </NavLink>
       {/* <NavLink
          exact={true}
          activeClassName={classes.selected}
          className="row jc-around ai-center cursor-pointer px-1 py-1"
          to={Routes.Personalization}>
          <div className="row ai-center" style={{width: "40%"}}>
            <span className={`font-weight-bold pr-05 ${classes.topic}`}>
              {t("SettingsSubMenu.personalization")}
            </span>
          </div>
          <div
            className={` column position-relative font-size-sm mr-1 ${classes.listBox}`}
            style={{width: "60%"}}>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("SettingsSubMenu.personalization")}
            </span>
          </div>
        </NavLink>*/}
        <NavLink
          exact={true}
          activeClassName={classes.selected}
          className="row jc-around ai-center cursor-pointer px-1 py-1"
          to={Routes.Authentication}>
          <div className="row ai-center" style={{width: "40%"}}>
            <span className={`font-weight-bold pr-05 ${classes.topic}`}>
              {t("SettingsSubMenu.authentication")}
            </span>
          </div>
          <div
            className={`column position-relative font-size-sm mr-1 ${classes.listBox}`}
            style={{width: "60%"}}>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("HelpStep.title")}
            </span>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("PersonalProfileStep.title")}
            </span>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("SendPhotosStep.title")}
            </span>
            <span className={`flex ai-center my-05 pr-2 ${classes.list}`}>
              {t("SendToExpertStep.title")}
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SettingsSubMenu;
