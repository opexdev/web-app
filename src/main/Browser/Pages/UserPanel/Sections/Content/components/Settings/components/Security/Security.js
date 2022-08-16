import React from "react";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ActiveSessions from "./components/ActiveSessions/ActiveSessions";
import SetTwoStepVerification from "./components/SetTwoStepVerification/SetTwoStepVerification";

const Security = () => {
    return (
        <>
            <div className="row pb-2">
                <div className="col-50 pl-05">
                    <ActiveSessions/>
                </div>
                <div className="col-50 pr-05">
                    <ChangePassword/>
                </div>
            </div>
            <div className="row">
                <SetTwoStepVerification/>
            </div>
        </>
    );
};

export default Security;