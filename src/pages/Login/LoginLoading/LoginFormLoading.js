import React from "react";
import {images} from "../../../assets/images";

const LoginFormLoading = () => {
    return <div className= "flex jc-center ai-center" style={{height: "100%"}}>
        <img style={{width: "3vw", textAlign: "center"}} src={images.SquareLoading}/>
    </div>
}
export default LoginFormLoading;