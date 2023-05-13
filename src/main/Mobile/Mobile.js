import React from "react";

const Mobile = () => {
    const redirectURL = window.env.REACT_APP_MOBILE_URL
    window.location.replace(redirectURL);
}
export default Mobile;