import React, {useState} from "react";
import moment from "moment-jalaali";
import useInterval from "../../../../../../Hooks/useInterval";

const Clock = () => {

    const [time, setTime] = useState(moment().format("jYYYY/jM/jD - HH:mm:ss"))

    useInterval(() => {
        setTime(moment().format("jYYYY/jM/jD - HH:mm:ss"))
    }, 1000);

    return (
        <>{time}</>
    );
};

export default Clock;
