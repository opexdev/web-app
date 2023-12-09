import moment from "moment-jalaali";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import useInterval from "../../../../../../../../Hooks/useInterval";

const Clock = () => {
    const type = useSelector((state) => state.exchange.dateType)
    const calendar = () => {
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

    return (<>{time}</>);
};

export default Clock;
