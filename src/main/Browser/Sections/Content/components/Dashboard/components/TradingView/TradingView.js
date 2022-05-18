import React from "react";
import {useTranslation} from "react-i18next";

import OpexChart from "./components/OpexChart/OpexChart";
import GlobalChart from "./components/GlobalChart/GlobalChart";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import MarketChart from "./components/MarketChart/MarketChart";

const TradingView = () => {
    const {t} = useTranslation();

    const charts = [
        {title: t("charts.globalChart"), body: <MarketChart/>},
        {title: t("charts.opexChart"), body: <OpexChart/>},
    ];

    return (
        <div
            className={`container card-background card-border`} style={{height:"50vh"}}>
            <AccordionBox
                title={t("charts.title")}
                content={charts}
            />
        </div>
    );
};


export default TradingView;
