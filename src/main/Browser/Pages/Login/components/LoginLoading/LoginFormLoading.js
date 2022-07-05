import React from "react";
import {images} from "../../../../../../assets/images";
import {connect} from "react-redux";

const LoginFormLoading = ({isDark}) => {
    return <div className= "flex jc-center ai-center" style={{height: "35vh"}}>
        <img style={{width: "2.5vw", textAlign: "center"}} src={isDark ? images.squareLoading : images.squareLoadingLight} alt="Loading"/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};

export default connect(mapStateToProps, null)(LoginFormLoading);