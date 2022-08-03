import React, {useEffect, useState} from "react"
import classes from "./Details.module.css";
import {browserName, deviceType, fullBrowserVersion} from "react-device-detect";


const Details = ({details, setWrapper}) => {
    const [close, setClose] = useState(false);
    useEffect(() => {
        setClose(false)
    }, [])

    const clickHandler = () => {
        setWrapper(false)
        setClose(true)
    }


    return (
        <>{details ? <div className={`${classes.wrapper}`} onClick={clickHandler}/> : ""}
            <div
                className={`${classes.container} column jc-center ai-center ${details ? classes.expand : ""} ${close ? classes.close : ""} card-border`}>
                {!details ? "" :
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