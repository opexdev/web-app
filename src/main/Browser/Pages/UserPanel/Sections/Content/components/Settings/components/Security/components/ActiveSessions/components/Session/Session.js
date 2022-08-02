import React, {useState} from "react"
import classes from "./Session.module.css";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import moment from "moment-jalaali";
import {Trans, useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../../../../../assets/images";
import {toast} from "react-hot-toast";
import {expireSessionById} from "js-api-client";

const Session = ({list, reloadSessionsList}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false)

    const expireSession = async () => {
        if (isLoading) return;
        setIsLoading(true)
        expireSessionById(list?.id)
            .then(() => {
                toast.success(<Trans
                    i18nKey="ActiveSessions.success"
                    values={{location: list?.ipAddress,}}
                />);
                reloadSessionsList()
            }).catch(() => {
            toast.error(<Trans
                i18nKey="ActiveSessions.failed"
                values={{location: list?.ipAddress,}}
            />);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={`container ${classes.striped}  py-1 px-1`}>
            <div className={`column ai-end`}>
                <div className={`row jc-between width-100`}>
                    <div className={`col-40 column jc-center ai-center`}>
                        <span>{moment(list?.lastAccess * 1000).format("HH:mm:ss , jYY/jMM/jDD")}</span>
                        <span className={`cursor-pointer text-red font-size-sm`} onClick={expireSession}>
                            {isLoading ?
                                <img className={`${classes.thisLoading}`}
                                     src={images.linearLoadingBgOrange}
                                     alt="linearLoading"/>
                                :
                                t("ActiveSessions.closeSession")}
                        </span>
                    </div>
                    <div className={`col-60 text-end`}>
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
            </div>
        </div>
    );
};

export default Session;
