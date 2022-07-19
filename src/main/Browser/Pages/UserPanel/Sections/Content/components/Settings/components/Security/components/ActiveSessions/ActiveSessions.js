import React from "react";
import classes from "./ActiveSessions.module.css";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Session from "./components/Session/Session";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import {toast} from "react-hot-toast";
import {expireAllSessionsExceptCurrent, useGetUserActiveSessions} from "../../../../../../../../../../../../queries";

const ActiveSessions = () => {
    const {t} = useTranslation();
    const {data: activeSessions, isLoading, error, refetch} = useGetUserActiveSessions()

    const expireAllSessions = () => {
        expireAllSessionsExceptCurrent()
            .then(() => {
                toast.success(t("ActiveSessions.logOutAllSuccess"));
                refetch()
            }).catch(() => {
            toast.error(t("ActiveSessions.logOutAllError"));
        })
    }

    const content = () => {
        if (isLoading) return <Loading/>

        if (error) return <Error/>

        const current = activeSessions.filter((s) => s.inUse)[0]
        const other = activeSessions.filter((s) => !s.inUse)

        return <>
            <div className={`column ai-end ${classes.thisSession}`}>
                <span className={`text-orange mb-05 font-size-sm-plus width-100 text-center py-05`}
                      style={{backgroundColor: 'var(--tableHeader)'}}>{t("ActiveSessions.thisSession")}</span>
                <div className={`row jc-between width-100 py-05 px-1`}>
                    <div className={`col-40 column jc-center ai-center`}>
                        <span>{moment(current?.lastAccess * 1000).format("HH:mm:ss , jYY/jMM/jDD")}</span>
                        {other.length > 0 ?
                            <span className={`cursor-pointer text-red font-size-sm`} onClick={expireAllSessions}>
                            {t("ActiveSessions.closeOtherSessions")}</span> : ""}
                    </div>
                    <div className={`col-60 text-end`}>
                        <div className={`row jc-end ai-center text-color-gray`}>
                            <span className={`ml-05`}>{current?.ipAddress}</span>
                            <Icon iconName="icon-globe font-size-md"/>
                        </div>
                        <div className={`row jc-end ai-center text-color-gray`}>
                            <span className={`ml-05`}>{current?.agent}</span>
                            <Icon iconName="icon-info font-size-md"/>
                        </div>
                    </div>
                </div>
                <div className={` width-100 text-center py-05`} style={{backgroundColor: 'var(--tableHeader)'}}>
                    <span className={`text-orange font-size-sm-plus`}>{t("ActiveSessions.otherSession")}</span>
                </div>
            </div>
            <ScrollBar>
                {other.length > 0 ? other.map((list) => <Session list={list} key={list.id} reloadSessionsList={refetch}/>)
                    : <div className={`flex jc-center ai-center height-100 font-size-sm-plus`}>
                        <span>{t("ActiveSessions.noData")}</span>
                    </div>
                }
            </ScrollBar>
        </>
    }

    return (
        <div className="container">
            <div className={` card-background card-border column ${classes.container}`}>
                <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h3>{t("ActiveSessions.title")}</h3>
                    </div>
                </div>
                <div className={`column container ${classes.content} position-relative`}>
                    {content()}
                </div>
            </div>
        </div>
    );
};

export default ActiveSessions;
