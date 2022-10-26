import React from 'react';
import moment from "moment-jalaali";

const Date = ({date}) => {

    const calendar = () => {
        const type = window.env.REACT_APP_CALENDAR_TYPE
        switch (type) {
            case "Jalali":
                return moment(date).format("jYY/jMM/jDD");
            case "Hijri":
                return moment(date).format("YY/MM/DD");
            case "Georgian":
                return moment(date).format("iYY/iMM/iDD");
            default:
                return moment(date).format("YY/MM/DD");
        }
    };

    return calendar();
};

export default Date;
