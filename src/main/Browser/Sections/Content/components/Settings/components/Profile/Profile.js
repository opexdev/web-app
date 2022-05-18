import React, {Fragment} from "react";
import {connect} from "react-redux";
import UserAccountStatus from "./components/UserAccountStatus/UserAccountStatus";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";

const Profile = () => {
  return (
    <Fragment>
      {/*<div className="row">
        <UserAccountStatus />
      </div>*/}
      <div className="row">
        <PersonalProfile />
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.exchange.activePair,
  };
};

export default connect(mapStateToProps, null)(Profile);
