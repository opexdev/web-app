import React from "react";
import classes from "./SendToExpertStep.module.css";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../../../../../components/Button/Button";


const SendToExpertStep = (props) => {
  const {t} = useTranslation();

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
        <div className="row jc-start ">
          <h3>{t("SendToExpertStep.title")}</h3>
        </div>
      </div>
      <div
        className={`container column jc-between px-1 py-2 ${classes.content}`}>
        <span>ارسال به کارشناس</span>
        <div className="row pt-1 jc-end">
            <Button
                buttonClass={`${classes.thisButton} ${classes.prev}`}
                onClick={props.prevStep}
                buttonTitle={t("prevStep")}
            />
            {/*<Button
                buttonClass={`${classes.thisButton} ${classes.submit}`}
                onClick={props.nextStep}
                type="submit"
                buttonTitle={t("submit")}
            />*/}
        </div>
      </div>
    </div>
  );
};

export default SendToExpertStep;
