import React from "react";
import {useTranslation} from "react-i18next";
import {images} from "../../assets/images";


const Loading = () => {
    const {t} = useTranslation();
    return (
        <div className="container column ai-center jc-center" style={{height: "100%"}}>
            <img className="mb-05" style={{width: "3vw"}} src={images.squareLoading}/>
            <span className="flashit mt-1">در حال دریافت اطلاعات...</span>
        </div>
    );
};

export default Loading;