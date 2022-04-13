import React, {useEffect, useState} from "react";
import classes from "./ActiveSessions.module.css";
import {Trans, useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getLocation, getSessions} from "../../../../api/settings";
import moment from "moment-jalaali";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import useInterval from "../../../../../../../../../../Hooks/useInterval";
import Session from "./components/Session/Session";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import ReactTooltip from "react-tooltip";
import Detailes from "./components/Details/Details";

const ActiveSessions = () => {
    const {t} = useTranslation();

    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState([]);
    const [details, setDetails] = useState(false);
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
                })


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

     useInterval(async () => {
         await getSessionsData();
     }, 3000);

    // console.log("sessions :", sessions)
    // console.log("setCurrentSession :", currentSession)

    const content = () => {
        if (loading) {
            return <Loading/>
        }
        if (error) {
            return <Error/>
        }
        return <>
            <div className={`column ai-end ${classes.thisSession} py-05 px-1`}>
                <span className={`text-orange mb-05 font-size-sm-plus width-100 text-center`}>{t("ActiveSessions.thisSession")}</span>
                <div className={`row jc-between width-100`}>
                    <div className={`col-40 text-center`}>
                        <span className={`ml-05`}>{moment(currentSession?.started * 1000).format("HH:mm:ss , jYY/jMM/jDD")}</span>
                    </div>
                    <div className={`col-60 text-end`}>
                        <span className={`ml-05`}>{currentSession?.geoIP?.regionName} / {currentSession?.geoIP?.country}</span>
                        <Icon iconName="icon-location font-size-md"/>
                    </div>
                </div>
                <div className={`row jc-between width-100`}>
                    <div className={`col-40 text-center`}>
                        <span className={`cursor-pointer`} onClick={()=>setDetails(prevState => !prevState)} data-html={true} data-place="top" data-effect="float" data-tip={`<span class="column jc-between col-100">${t("ActiveSessions.details",)}</span>`}>
                            <Icon iconName="icon-dot-3 font-size-md"/>
                        </span>
                    </div>
                    <div className={`col-60 text-end text-color-gray`}>
                        <span className={`ml-05`}>{currentSession?.ipAddress}</span>
                        <Icon iconName="icon-globe font-size-md"/>
                    </div>
                </div>
                <span className={`text-orange mb-05 font-size-sm-plus width-100 text-center`}>{t("ActiveSessions.otherSession")}</span>
            </div>
            <ScrollBar>
                { sessions.length > 0 ?
                sessions.map((list) => <Session list={list} key={list.key}/>)
                    : <div className={`flex jc-center ai-center height-100 font-size-sm-plus`}>
                        <span>{t("ActiveSessions.noData")}</span>
                    </div>
                }
            </ScrollBar>


            <Detailes details={details} setWrapper={setDetails}/>


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
