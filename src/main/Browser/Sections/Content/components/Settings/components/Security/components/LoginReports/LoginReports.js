import React from "react";
import classes from "./LoginReports.module.css";
import {useTranslation} from "react-i18next";

const LoginReports = () => {
  const {t} = useTranslation();

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
        <div className="row jc-start ">
          <h3>{t("LoginReports.title")}</h3>
        </div>
      </div>
      <div className={`row container ${classes.content}`}>
        {t("LoginReports.title")}
      </div>
    </div>
  );
};

export default LoginReports;
