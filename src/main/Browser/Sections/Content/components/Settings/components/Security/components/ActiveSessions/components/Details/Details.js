import React, {useEffect, useState} from "react"
import classes from "./Details.module.css";
import {Trans, useTranslation} from "react-i18next"
import {
    browserName,
    BrowserTypes,
    browserVersion,
    deviceType,
    engineName,
    engineVersion,
    fullBrowserVersion
} from "react-device-detect";


const Details = ({details , setWrapper}) => {

    const {t} = useTranslation();

    const [close, setClose] = useState(false);

    useEffect(()=>{
        setClose(false)
    }, [])

    const clickHandler = () => {

        setWrapper(false)
        setClose(true)

    }


    return (

        <>{details ? <div className={`${classes.wrapper}`} onClick={clickHandler}/> : ""}

        <div className={`${classes.container} column jc-center ai-center ${details ? classes.expand : ""} ${close ? classes.close : ""} card-border`}>

            {!details ?

            ""
                :
                <>
                    <div className={`border-bottom column jc-center ai-center`}>
                        <span className={``}>نوع</span>
                        <span className={``}>{deviceType}</span>
                    </div>
                    <div className={`border-bottom column jc-center ai-center`}>
                        <span className={``}>نام</span>
                        <span className={``}>{browserName}</span>
                    </div>

                    <div className={`border-bottom column jc-center ai-center`}>
                        <span className={``}>نسخه</span>
                        <span className={``}>{fullBrowserVersion}</span>
                    </div>

                </>

            }


        </div>

        </>
    );
};

export default Details;



/*
<div className={`column ai-end`}>
                <div className={`row`}>
                    <span></span>
                    <span> : browserName</span>
                </div>
                <div className={`row`}>
                    <span>{browserVersion}</span>
                    <span> : browserVersion</span>
                </div>
                <div className={`row`}>
                    <span>{engineName}</span>
                    <span> : engineName</span>
                </div>
                <div className={`row`}>
                    <span>{engineVersion}</span>
                    <span> : engineVersion</span>
                </div>
                <div className={`row`}>
                    <span>{deviceType}</span>
                    <span> : deviceType</span>
                </div>
                <div className={`row`}>
                    <span>{fullBrowserVersion}</span>
                    <span> : fullBrowserVersion</span>
                </div>
* */
