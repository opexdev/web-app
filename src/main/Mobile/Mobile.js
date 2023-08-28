import React from "react";
import {useLocation} from "react-router-dom";

const Mobile = () => {
    let location = useLocation();
    const redirectURL = window.env.REACT_APP_MOBILE_URL + location?.pathname + location?.search
    window.location.replace(redirectURL);
}
export default Mobile;