import React from "react";
import {useTranslation} from "react-i18next";

const OrderBookTooltip = (props) => {
  const {t} = useTranslation();
  return (
    <div className="column jc-between col-100">
      <div className="row jc-between col-100">
        <span className="pl-05">${t("averagePrice")}:</span>
        <span>${props.price.toLocaleString()}</span>
      </div>
      <div className="row jc-between col-100">
        <span className="pl-05">${t("totalVolume")}:</span>
        <span>${props.amount}</span>
      </div>
      <div className="row jc-between col-100">
        <span className="pl-05">${t("totalPrice")}:</span>
        <span>${props.totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OrderBookTooltip;