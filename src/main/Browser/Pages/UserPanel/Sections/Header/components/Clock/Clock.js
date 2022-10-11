import React, {useState} from "react";
import moment from "moment-jalaali";
import useInterval from "../../../../../../../../Hooks/useInterval";
import i18n from "i18next";

const Clock = () => {

    const [time, setTime] = useState(i18n.language === "fa" ? moment().format("jYYYY/jM/jD - HH:mm:ss") : moment().format("HH:mm:ss - YYYY/M/D"))

    useInterval(() => {
        setTime(i18n.language === "fa" ? moment().format("jYYYY/jM/jD - HH:mm:ss") : moment().format("HH:mm:ss - YYYY/M/D"))
    }, 1000);

    return (
        <>{time}</>
    );
};

export default Clock;
