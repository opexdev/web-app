import React from "react";
import {useTranslation} from "react-i18next";
import {images} from "../../assets/images";
import {useSelector} from "react-redux";
import {isMobile} from 'react-device-detect';

const Loading = () => {
    const theme = useSelector((state) => state.global.theme)
    const {t} = useTranslation();
    return (
        <div className="width-100 column ai-center jc-center" style={{height: "100%"}}>
            <img className="mb-05" style={{width: isMobile ? "10vw" : "3vw"}} src={theme === "DARK" ? images.squareLoading : images.squareLoadingLight} alt="loading..."/>
            <span className="flashit mt-1">{t('loading')}</span>
        </div>
    );
};
export default Loading;