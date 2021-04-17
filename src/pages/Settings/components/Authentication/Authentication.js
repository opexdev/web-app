import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import classes from "./Authentication.module.css";
import HelpStep from "./HelpStep/HelpStep";
import PersonalProfileStep from "./PersonalProfileStep/PersonalProfileStep";
import SendPhotosStep from "./SendPhotosStep/SendPhotosStep";
import SendToExpertStep from "./SendToExpertStep/SendToExpertStep";

const Authentication = (props) => {
  const [step, setStep] = useState(1);

  const stepSwitch = (step) => {
    switch (step) {
      case 1:
        return <HelpStep nextStep={() => setStep(2)} />;
      case 2:
        return (
          <PersonalProfileStep
            prevStep={() => setStep(1)}
            nextStep={() => setStep(3)}
          />
        );
      case 3:
        return (
          <SendPhotosStep
            prevStep={() => setStep(2)}
            nextStep={() => setStep(4)}
          />
        );
      case 4:
        return <SendToExpertStep prevStep={() => setStep(3)} />;
      default:
        return <HelpStep />;
    }
  };

  return (
    <Fragment>
      <div className={`row jc-center ai-center mb-3 `}>
        <div className={`column jc-between ${classes.wizardBox}`}>
          <ul className="row position-relative ai-center">
            <li
              className={`col-25 text-center  ${
                step === 1 ? classes.activeStep : ""
              }`}>
              راهنما
            </li>

            <li
              className={`col-25 text-center ${
                step === 2 ? classes.activeStep : ""
              }`}>
              اطلاعات فردی
            </li>
            <li
              className={`col-25 text-center ${
                step === 3 ? classes.activeStep : ""
              }`}>
              ارسال تصاویر
            </li>
            <li
              className={`col-25 text-center ${
                step === 4 ? classes.activeStep : ""
              }`}>
              ارسال به کارشناس
            </li>
            <div
              className={`container position-absolute  row jc-center`}
              style={{padding: "0 10%"}}>
              <span
                className={`col-15`}
                style={{height: "0.2vh", backgroundColor: "var(--orange)"}}
              />
              <span
                className={`col-15`}
                style={{
                  height: "0.2vh",
                  backgroundColor: "var(--orange)",
                  margin: "0 22% 0 22%",
                }}
              />
              <span
                className={`col-15`}
                style={{height: "0.2vh", backgroundColor: "var(--orange)"}}
              />
            </div>
          </ul>
          <div className="row card-background card-border">
            {step === 1 ? (
              <span
                className="col-25"
                style={{
                  backgroundColor: "var(--activeTab)",
                  height: "0.5vh",
                  borderBottomRightRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
            ) : (
              ""
            )}
            {step === 2 ? (
              <span
                className="col-50"
                style={{
                  backgroundColor: "var(--activeTab)",
                  height: "0.5vh",
                  borderBottomRightRadius: "15px",
                  borderTopRightRadius: "15px",
                  transition: "all 5s",
                }}
              />
            ) : (
              ""
            )}
            {step === 3 ? (
              <span
                className="col-75"
                style={{
                  backgroundColor: "var(--activeTab)",
                  height: "0.5vh",
                  borderBottomRightRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
            ) : (
              ""
            )}
            {step === 4 ? (
              <span
                className="col-100"
                style={{
                  backgroundColor: "var(--activeTab)",
                  height: "0.5vh",
                  borderRadius: "15px",
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {stepSwitch(step)}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(Authentication);
