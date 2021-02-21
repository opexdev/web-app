import React, {Fragment} from "react";
import {connect} from "react-redux";
import ChangePassword from "./ChangePassword/ChangePassword";
import LoginReports from "./LoginReports/LoginReports";
import ActiveSessions from "./ActiveSessions/ActiveSessions";
import SetTwoStepVerification from "./SetTwoStepVerification/SetTwoStepVerification";


const Security = (props) => {

    return (
        <div className="px-1 py-1">
            <div className="row">

                <LoginReports/>

            </div>
            <div className="row">

                <ActiveSessions/>

            </div>
            <div className="row">

                <ChangePassword/>

            </div>
            <div className="row">

                <SetTwoStepVerification/>

            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(Security);