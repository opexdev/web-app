import React, {useEffect, useState} from "react";
import classes from "./ActiveSessions.module.css";
import {Trans, useTranslation} from "react-i18next";
import {getSessions, LogoutAllSessionsExceptCurrent} from "../../../../api/settings";
import moment from "moment-jalaali";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import Session from "./components/Session/Session";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import ReactTooltip from "react-tooltip";
import {toast} from "react-hot-toast";

const ActiveSessions = () => {
    const {t} = useTranslation();

    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const getSessionsData = async () => {
        const SessionsData = await getSessions()
        if (SessionsData) {
            if (SessionsData.status === 200) {
                //setSessions((SessionsData.data).sort((a,b) => b.started - a.started))
                /*
                --- get location from ip function

                const geo = SessionsData.data.map(async (r) => {
                     r.oo = "jj"
                     return getLocation('94.139.165.171').then((res) => {
                         if (res && res.status === 200) {
                             r.geoIP = res.data
                         }
                         return r
                     })
                 })
                 Promise.all(geo).then(function (geo) {
                     setSessions(geo.filter((s) => !s.inUse).sort((a, b) => b.started - a.started))
                     setCurrentSession(geo.filter((s) => s.inUse)[0])
                 }).then(() => {
                     setLoading(false)
                     setError(false)
                 })*/
                setSessions(SessionsData.data.filter((s) => !s.inUse).sort((a, b) => b.started - a.started))
                setCurrentSession(SessionsData.data.filter((s) => s.inUse)[0])

                setLoading(false)
                setError(false)
            } else {
                setError(true)
                setLoading(false)
            }
        } else {
            setError(true)
            setLoading(false)
        }
    }
    useEffect(() => {
        getSessionsData()
    }, []);

    const clickHandler = async () => {
        const logOutAll = await LogoutAllSessionsExceptCurrent()
        if (logOutAll && logOutAll.status === 204) {
            toast.success(<Trans
                i18nKey="ActiveSessions.logOutAllSuccess"
            />);
            getSessionsData()
        } else {
            toast.error(<Trans
                i18nKey="ActiveSessions.logOutAllError"
            />);
        }
    }

    const content = () => {
        if (loading) {
            return <Loading/>
        }
        if (error) {
            return <Error/>
        }
        return <>
            <div className={`column ai-end ${classes.thisSession}`}>
                <span className={`text-orange mb-05 font-size-sm-plus width-100 text-center py-05`}
                      style={{backgroundColor: 'var(--tableHeader)'}}>{t("ActiveSessions.thisSession")}</span>

                <div className={`row jc-between width-100 py-05 px-1`}>
                    <div className={`col-40 column jc-center ai-center`}>
                        <span>{moment(currentSession?.started * 1000).format("HH:mm:ss , jYY/jMM/jDD")}</span>
                        {sessions.length > 0 ? <span className={`cursor-pointer text-red font-size-sm`}
                                                     onClick={clickHandler}>{t("ActiveSessions.closeAllInusableSessions")}</span> : ""}
                    </div>
                    <div className={`col-60 text-end`}>

                        {/*<div className={`row jc-end ai-center`}>
                                <span className={`ml-05`}>{currentSession?.geoIP?.regionName} / {currentSession?.geoIP?.country}</span>
                                <Icon iconName="icon-location font-size-md"/>
                            </div>*/}
                        <div className={`row jc-end ai-center text-color-gray`}>
                            <span className={`ml-05`}>{currentSession?.ipAddress}</span>
                            <Icon iconName="icon-globe font-size-md"/>
                        </div>
                        <div className={`row jc-end ai-center text-color-gray`}>
                            <span className={`ml-05`}>{currentSession?.agent}</span>
                            <Icon iconName="icon-info font-size-md"/>
                        </div>
                    </div>
                </div>

                <div className={` width-100 text-center py-05`} style={{backgroundColor: 'var(--tableHeader)'}}>
                    <span className={`text-orange font-size-sm-plus`}>{t("ActiveSessions.otherSession")}</span>
                </div>
            </div>
            <ScrollBar>
                {sessions.length > 0 ?
                    sessions.map((list) => <Session list={list} key={list.id} gs={()=>getSessionsData()}/>)
                    : <div className={`flex jc-center ai-center height-100 font-size-sm-plus`}>
                        <span>{t("ActiveSessions.noData")}</span>
                    </div>
                }
            </ScrollBar>
        </>
    }

    return (
        <div className="container">
            <div
                className={` card-background card-border column ${classes.container}`}>
                <div
                    className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
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
