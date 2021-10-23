import React from "react";
import {images} from "../../../../assets/images";

const LoginFormLoading = () => {
    return <div className= "flex jc-center ai-center" style={{height: "35vh"}}>
        <img style={{width: "2.5vw", textAlign: "center"}} src={images.squareLoading} alt="Loading"/>
    </div>
}
export default LoginFormLoading;