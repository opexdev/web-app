import React, {Fragment} from "react";
import {connect} from "react-redux";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import LoginReports from "./components/LoginReports/LoginReports";
import ActiveSessions from "./components/ActiveSessions/ActiveSessions";
import SetTwoStepVerification from "./components/SetTwoStepVerification/SetTwoStepVerification";

const Security = (props) => {
  return (
    <Fragment>
      <div className="row">
        <LoginReports />
      </div>
      <div className="row">
        <ActiveSessions />
      </div>
      <div className="row">
        <ChangePassword />
      </div>
      <div className="row">
        <SetTwoStepVerification />
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(Security);
