import React from "react";
import {useTranslation} from "react-i18next";
import {images} from "../../assets/images";
import {connect} from "react-redux";
import {isMobile} from 'react-device-detect';


const Loading = ({isDark}) => {
    const {t} = useTranslation();
    return (
        <div className="width-100 column ai-center jc-center" style={{height: "100%"}}>
            <img className="mb-05" style={{width: isMobile ? "10vw" : "3vw"}} src={isDark ? images.squareLoading : images.squareLoadingLight} alt="loading..."/>
            <span className="flashit mt-1">{t('loading')}</span>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};

export default connect(mapStateToProps, null)(Loading);