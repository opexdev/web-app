import React from "react";
import classes from "./SetTwoStepVerification.module.css";
import {useTranslation} from "react-i18next";

const SetTwoStepVerification = () => {
  const {t} = useTranslation();

  return (
    <div className="container py-2">
      <div
        className={`container card-background card-border column ${classes.container}`}>
        <div
          className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
          <div className="row jc-start ">
            <h3>{t("SetTwoStepVerification.title")}</h3>
          </div>
        </div>
        <div className={`row container ${classes.content}`}>
          {t("SetTwoStepVerification.title")}
        </div>
      </div>
    </div>
  );
};

export default SetTwoStepVerification;
