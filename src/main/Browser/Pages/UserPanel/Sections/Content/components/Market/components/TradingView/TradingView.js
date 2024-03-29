import React from "react";
import {useTranslation} from "react-i18next";
import AccordionBox from "../../../../../../../../../../components/AccordionBox/AccordionBox";
import MarketChart from "./components/MarketChart/MarketChart";

const TradingView = () => {
    const {t} = useTranslation();
    const charts = [
        {title: t("charts.globalChart"), body: <MarketChart/>},
        {title: t("charts.opexChart"), body: <MarketChart type="Opex"/>},
    ];
    return (
        <div
            className={`container card-bg card-border`} style={{height:"58vh"}}>
            <AccordionBox
                title={t("charts.title")}
                content={charts}
            />
        </div>
    );
};

export default TradingView;