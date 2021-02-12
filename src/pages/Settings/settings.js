import React, {Fragment} from "react";
import {connect} from "react-redux";
import UserAccountStatus from "./UserAccountStatus/UserAccountStatus";
import PersonalProfile from "./PersonalProfile/PersonalProfile";

const Settings = (props) => {

    return (
        <div className="px-1 py-1">
            <div className="row">

                <UserAccountStatus/>

            </div>
            <div className="row">

                <PersonalProfile/>

            </div>
            <div className="row">


            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(Settings);