import React from 'react';
import moment from "moment-jalaali";
import {useSelector} from "react-redux";

const Date = ({date}) => {
    const type = useSelector((state) => state.exchange.dateType)
    const calendar = () => {

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

    return (<>{calendar()}</>);
};

export default Date;
