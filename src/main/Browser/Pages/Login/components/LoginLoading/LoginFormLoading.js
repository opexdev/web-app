import React from "react";
import {images} from "../../../../../../assets/images";
import {useSelector} from "react-redux";

const LoginFormLoading = () => {
    const isDark = useSelector((state) => state.global.isDark)

    return <div className="flex jc-center ai-center" style={{height: "35vh"}}>
        <img style={{width: "2.5vw", textAlign: "center"}}
             src={isDark ? images.squareLoading : images.squareLoadingLight} alt="Loading"/>
    </div>
}

export default LoginFormLoading;