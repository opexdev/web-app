import React, {useState} from "react"
import classes from "./Session.module.css";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import moment from "moment-jalaali";
import {CheckUserSecurityConfigs, LogoutUsingSessionId} from "../../../../../../api/settings";
import {Trans, useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../../../assets/images";
import {toast} from "react-hot-toast";


const Session = ({list , gs}) => {

    const {t} = useTranslation();

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    const clickHandler = async () => {
        setIsLoading(true)
        const logOut = await LogoutUsingSessionId(list?.id)
        if (logOut && logOut.status === 204) {
          setIsLoading(false)
            setError(true)
            toast.success(<Trans
                i18nKey="ActiveSessions.success"
                values={{
                    location: list?.ipAddress,
                }}
            />);
            gs()
        } else {
            setError(true)
            setIsLoading(false)
        }
    }

    const TextHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
        }
        return t("ActiveSessions.closeSession")
    }



    return (
        <div className={`container ${classes.striped}  py-1 px-1`}>
            <div className={`column ai-end`}>
                <div className={`row jc-between width-100`}>
                    <div className={`col-40 text-center`}>

                    </div>
                    <div className={`col-60 text-end`}>

                    </div>
                </div>
                <div className={`row jc-between width-100`}>
                    <div className={`col-40 column jc-center ai-center`}>
                        <span>{moment(list?.started*1000).format("HH:mm:ss , jYY/jMM/jDD")}</span>
                        <span className={`cursor-pointer text-red font-size-sm`} onClick={clickHandler}>{TextHandler()}</span>
                    </div>

                    <div className={`col-60 text-end`}>
                        {/*<div className={`row jc-end ai-center`}>
                            <span className={`ml-05`}>{list?.geoIP?.regionName} / {list?.geoIP?.country}</span>
                            <Icon iconName="icon-location font-size-md"/>
                        </div>*/}
                        <div className={`row jc-end ai-center text-color-gray`}>
                            <span className={`ml-05`}>{list?.ipAddress}</span>
                            <Icon iconName="icon-globe font-size-md"/>
                        </div>
                        <div className={`row jc-end ai-center text-color-gray`}>
                            <span className={`ml-05`}>{list?.agent}</span>
                            <Icon iconName="icon-info font-size-md"/>
                        </div>
                    </div>

                </div>


                <div className={`row jc-between width-100`}>
                    <div className={`col-100 text-end text-color-gray`}>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Session;
