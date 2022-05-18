import React, {Fragment} from "react";
import {connect} from "react-redux";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import LoginReports from "./components/LoginReports/LoginReports";
import ActiveSessions from "./components/ActiveSessions/ActiveSessions";
import SetTwoStepVerification from "./components/SetTwoStepVerification/SetTwoStepVerification";

const Security = (props) => {
  return (
    <Fragment>

      {/*
      <div className="row">
        <LoginReports />
      </div>
      */}
      {/* down row   ---  py-2*/}
      <div className="row pb-2">

          <div className="col-50 pl-05">
              <ActiveSessions />
          </div>
          <div className="col-50 pr-05">
              <ChangePassword />
          </div>

      </div>
      <div className="row">

      </div>
      <div className="row">
        <SetTwoStepVerification />
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.exchange.activePair,
  };
};

export default connect(mapStateToProps, null)(Security);
