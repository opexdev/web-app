import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../Routes/routes";
import Verify from "./components/Verify/Verify";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import classes from "./User.module.css";
import {images} from "../../../../assets/images";

const User = () => {
    return (
        <div className={`width-100 ${classes.container} move-image flex jc-center ai-center text-color`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <Routes>
                <Route path={RoutesName.UserVerifyRelative} element={<Verify/>}/>
                <Route path={RoutesName.UserForgetPasswordRelative} element={<ForgetPassword/>}/>
                <Route path="*" element={<Navigate to={{pathname: `${RoutesName.Panel}`}} replace />}/>
            </Routes>
        </div>
    );
};

export default User;