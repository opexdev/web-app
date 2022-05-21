import React, {useEffect, useState} from "react";
import classes from "./Order.module.css";
import BuyOrder from "./components/BuyOrder/BuyOrder";
import SellOrder from "./components/SellOrder/SellOrder";
import {useTranslation} from "react-i18next";
import {connect, useDispatch} from "react-redux";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import {setBuyOrder, setSellOrder} from "../../../../../../../../store/actions";

const Order = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const data = [
    {id: 1, title: t("buy"), body: <BuyOrder />},
    {id: 2, title: t("sell"), body: <SellOrder />},
  ];

  useEffect(() => {
    if (props.selectedSellOrder.amount && activeTab !== 1) {
      setActiveTab(1);
    }
  }, [props.selectedSellOrder]);

  useEffect(() => {
    if (props.selectedBuyOrder.amount && activeTab !== 0) {
      setActiveTab(0);
    }
  }, [props.selectedBuyOrder]);

  useEffect(()=>{
    if (activeTab === 1) {
      dispatch(setBuyOrder({pricePerUnit: 0, amount: 0,}))
    }else{
      dispatch(setSellOrder({pricePerUnit: 0, amount: 0,}))
    }
  },[activeTab])


  return (
      <div className={`container card-background card-border my-2 ${classes.container}`}>
        <AccordionBox
          title={t("orders.title")}
          safari={classes.safariFlexSize}
          content={data}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
export default connect(mapStateToProps, null)(Order);
