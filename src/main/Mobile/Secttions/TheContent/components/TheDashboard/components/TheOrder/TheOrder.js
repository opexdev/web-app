import React, {useEffect, useState} from "react";
import classes from "./TheOrder.module.css";
import {useTranslation} from "react-i18next";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import {connect} from "react-redux";
import TheBuyOrder from "./components/TheBuyOrder/TheBuyOrder";
import TheSellOrder from "./components/TheSellOrder/TheSellOrder";


const TheOrder = (props) => {

    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    const data = [
        {id: 1, title: t("buy"), body: <TheBuyOrder />},
        {id: 2, title: t("sell"), body: <TheSellOrder />},
    ];

    useEffect(() => {
        if (props.selectedSellOrder.amount) {
            setActiveTab(1);
        }
    }, [props.selectedSellOrder]);

    useEffect(() => {
        if (props.selectedBuyOrder.amount) {
            setActiveTab(0);
        }
    }, [props.selectedBuyOrder]);

    return (
        <div className={`container ${classes.container}  card-background card-border`}>
            <AccordionBox
                title={t("orders.title")}
                safari={classes.safariFlexSize}
                content={data}
                activeTab={activeTab}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedSellOrder: state.exchange.activePairOrders.selectedSellOrder,
        selectedBuyOrder: state.exchange.activePairOrders.selectedBuyOrder,
    };
};
export default connect(mapStateToProps, null)(TheOrder);
