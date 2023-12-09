import React from "react";
import {images} from "../../../../../../assets/images";
import {useSelector} from "react-redux";

const LoginFormLoading = () => {
    const theme = useSelector((state) => state.global.theme)

    return <div className="flex jc-center ai-center" style={{height: "35vh"}}>
        <img style={{width: "2.5vw", textAlign: "center"}}
             src={theme === "DARK" ? images.squareLoading : images.squareLoadingLight} alt="Loading"/>
    </div>
}

export default LoginFormLoading;