import React, {useEffect, useState} from "react";
import classes from "./ActiveSessions.module.css";
import {Trans, useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getSessions} from "../../../../api/settings";
import moment from "moment-jalaali";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import useInterval from "../../../../../../../../../../Hooks/useInterval";

const ActiveSessions = () => {
    const {t} = useTranslation();

    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)

    const getSessionsData = async () => {
        const SessionsData = await getSessions()
        if (SessionsData && SessionsData.status === 200) {
            setLoading(false)
            setError(false)
            setSessions((SessionsData.data).sort((a,b) => b.started - a.started))
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



    const content = () => {
        if (loading) {
            return <Loading/>
        }
        if (error) {
            return <Error/>
        }
        return  <ScrollBar>
            <table className="text-center" cellSpacing="0" cellPadding="0">
                <thead>
                <tr>
                    <th>{t("date")}</th>
                    <th>{t("time")}</th>
                    <th>{t("ActiveSessions.ip")}</th>
                    <th>{t("time")}</th>
                </tr>
                </thead>
                <tbody>
                {sessions.map((tr, index) => {
                    return (
                        <tr key={index}>
                            <td style={{direction: "ltr"}}>
                                {moment(tr.started*1000).format("jYY/jMM/jDD")}
                            </td>
                            <td style={{direction: "ltr"}}>
                                {moment(tr.started*1000).format("HH:mm:ss")}
                            </td>
                            <td>{tr.ipAddress}</td>
                            <td className={`text-green`}>{t("ActiveSessions." + tr.state)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </ScrollBar>
    }




    return (
        <div className="container py-2">
            <div
                className={` card-background card-border column ${classes.container}`}>
                <div
                    className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h3>{t("ActiveSessions.title")}</h3>
                    </div>
                </div>
                <div className={`column container ${classes.content}`}>
                    {content()}
                </div>
            </div>
        </div>
    );
};

export default ActiveSessions;
