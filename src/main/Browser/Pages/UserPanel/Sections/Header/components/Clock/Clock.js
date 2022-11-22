import React, {useState} from "react";
import moment from "moment-jalaali";
import useInterval from "../../../../../../../../Hooks/useInterval";

const Clock = () => {

    const calendar = () => {
        const type = window.env.REACT_APP_CALENDAR_TYPE
        switch (type) {
            case "Jalali":
                return moment().format("jYYYY/jMM/jDD - HH:mm:ss");
            case "Hijri":
                return moment().format("YYYY/MM/DD - HH:mm:ss");
            case "Georgian":
                return moment().format("iYYYY/iMM/iDD - HH:mm:ss");
            default:
                return moment().format("YYYY/MM/DD - HH:mm:ss");
        }
    };

    const [time, setTime] = useState(calendar())

    useInterval(() => {
        setTime(calendar())
    }, 1000);

    return (
        <>{time}</>
    );
};

export default Clock;
