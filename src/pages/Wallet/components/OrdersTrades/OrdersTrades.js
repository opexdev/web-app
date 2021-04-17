import React, {Fragment, useState, useEffect} from "react";
import classes from "./OrdersTrades.module.css";
import ScrollBar from "../../../../components/ScrollBar";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {
  OrdersTradesAliveOrderData,
  OrdersTradesStopData,
  OrdersTradesOrdersHistoryData,
  OrdersTradesTradesData,
} from "../../../../FakeData/FakeData";
import Icon from "../../../../components/Icon/Icon";

const OrdersTrades = (props) => {
  const {t} = useTranslation();
  const [openItem, setOpenItem] = useState({
    aliveOrder: null,
    ordersHistory: null,
    trades: null,
  });
  const [customData, setCustomData] = useState({
    aliveOrder: [],
    stopOrder: [],
    ordersHistory: [],
    trades: [],
  });
  useEffect(() => {
    setCustomData({
      aliveOrder: OrdersTradesAliveOrderData(),
      stopOrder: OrdersTradesStopData(),
      ordersHistory: OrdersTradesOrdersHistoryData(),
      trades: OrdersTradesTradesData(),
    });
  }, []);

  const aliveOrderTable = (
    <ScrollBar>
      <table
        className="text-center double-striped"
        cellSpacing="0"
        cellPadding="0">
        <thead>
          <tr>
            <th className="pt-1">{t("time")}</th>
            <th>{t("date")}</th>
            <th>{t("OrdersTrades.market")}</th>
            <th>{t("OrdersTrades.side")}</th>
            <th>{t("OrdersTrades.order")}</th>
            <th />
            <th>{t("OrdersTrades.done")}</th>
            <th>{t("pricePerUnit")}</th>
            <th />
            <th>{t("totalPrice")}</th>
            <th>{t("OrdersTrades.donePercentage")}</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {customData.aliveOrder.map((tr, index) => (
            <Fragment key={index}>
              <tr className={tr.side === "buy" ? "text-green" : "text-red"}>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{t("pair." + tr.market)}</td>
                <td>{tr.side === "buy" ? t("buy") : t("sell")}</td>
                <td>{tr.order}</td>
                <td>
                  {tr.market === "BTC/IRT" || tr.market === "BTC/USDT"
                    ? "BTC"
                    : "ETH"}
                </td>
                <td>{tr.done}</td>
                <td>{tr.pricePerUnit}</td>
                <td>
                  {tr.market === "BTC/IRT"
                    ? "IRRT"
                    : tr.market === "ETH/BTC"
                    ? "BTC"
                    : "USDT"}
                </td>
                <td>{tr.totalPrice}</td>
                <td>{tr.donePercentage}</td>
                <td>
                  <Icon
                    iconName="icon-cancel text-red font-size-sm"
                    customClass={classes.iconBG}
                  />
                </td>

                {openItem.aliveOrder === index ? (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, aliveOrder: null})
                    }>
                    {/*<i className="icon-up flex jc-center  text-blue font-size-md"/>*/}
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm"
                      customClass={classes.iconBG}
                    />
                  </td>
                ) : (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, aliveOrder: index})
                    }>
                    {/*<i className="icon-down flex jc-center  text-blue font-size-md"/>*/}
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm"
                      customClass={classes.iconBG}
                    />
                  </td>
                )}
              </tr>
              <tr
                style={{
                  display: openItem.aliveOrder === index ? "revert" : "none",
                }}>
                <td colSpan="13" className={`py-1 px-2`}>
                  <div
                    className="row jc-around  ai-center"
                    style={{width: "100%"}}></div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );
  const stopOrderTable = (
    <ScrollBar>
      <table className="text-center striped" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th className="pt-1">{t("time")}</th>
            <th>{t("date")}</th>
            <th>{t("OrdersTrades.market")}</th>
            <th>{t("OrdersTrades.side")}</th>
            <th>{t("OrdersTrades.order")}</th>
            <th />
            <th>{t("OrdersTrades.stoppedPrice")}</th>
            <th />
            <th>{t("pricePerUnit")}</th>
            <th />
            <th>{t("totalPrice")}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customData.stopOrder.map((tr, index) => (
            <Fragment key={index}>
              <tr className={tr.side === "buy" ? "text-green" : "text-red"}>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{t("pair." + tr.market)}</td>
                <td>{tr.side === "buy" ? t("buy") : t("sell")}</td>
                <td>{tr.order}</td>
                <td>
                  {tr.market === "BTC/IRT" || tr.market === "BTC/USDT"
                    ? "BTC"
                    : "ETH"}
                </td>
                <td>{tr.stoppedPrice.toLocaleString()}</td>
                <td>
                  {tr.market === "BTC/IRT"
                    ? "IRRT"
                    : tr.market === "ETH/BTC"
                    ? "BTC"
                    : "USDT"}
                </td>
                <td>{tr.pricePerUnit.toLocaleString()}</td>
                <td>
                  {tr.market === "BTC/IRT"
                    ? "IRRT"
                    : tr.market === "ETH/BTC"
                    ? "BTC"
                    : "USDT"}
                </td>
                <td>{tr.totalPrice.toLocaleString()}</td>
                <td>
                  <Icon
                    iconName="icon-cancel text-red font-size-sm"
                    customClass={classes.iconBG}
                  />
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );
  const ordersHistoryTable = (
    <ScrollBar>
      <table
        className="text-center double-striped"
        cellSpacing="0"
        cellPadding="0">
        <thead>
          <tr>
            <th className="pt-1">{t("time")}</th>
            <th>{t("date")}</th>
            <th>{t("OrdersTrades.market")}</th>
            <th>{t("OrdersTrades.side")}</th>
            <th>{t("OrdersTrades.type")}</th>
            <th>{t("OrdersTrades.order")}</th>
            <th />
            <th>{t("OrdersTrades.done")}</th>
            <th>{t("pricePerUnit")}</th>
            <th />
            <th>{t("OrdersTrades.paid")}</th>
            <th>{t("status")}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customData.ordersHistory.map((tr, index) => (
            <Fragment key={index}>
              <tr className={tr.side === "buy" ? "text-green" : "text-red"}>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{t("pair." + tr.market)}</td>
                <td>{tr.side === "buy" ? t("buy") : t("sell")}</td>
                <td>
                  {tr.type === "market"
                    ? t("OrdersTrades.market")
                    : t("OrdersTrades.limit")}
                </td>
                <td>{tr.order}</td>
                <td>
                  {tr.market === "BTC/IRT" || tr.market === "BTC/USDT"
                    ? "BTC"
                    : "ETH"}
                </td>
                <td>{tr.done}</td>
                <td>{tr.pricePerUnit.toLocaleString()}</td>
                <td>
                  {tr.market === "BTC/IRT"
                    ? "IRRT"
                    : tr.market === "ETH/BTC"
                    ? "BTC"
                    : "USDT"}
                </td>
                <td>{tr.paid.toLocaleString()}</td>
                <td>{t("ordersStatus." + tr.status)}</td>
                {openItem.ordersHistory === index ? (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, ordersHistory: null})
                    }>
                    {/*<i className="icon-up flex jc-center  text-blue font-size-md"/>*/}
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm"
                      customClass={classes.iconBG}
                    />
                  </td>
                ) : (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, ordersHistory: index})
                    }>
                    {/*<i className="icon-down flex jc-center  text-blue font-size-md"/>*/}
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm"
                      customClass={classes.iconBG}
                    />
                  </td>
                )}
              </tr>
              <tr
                style={{
                  display: openItem.ordersHistory === index ? "revert" : "none",
                }}>
                <td colSpan="13" className={`py-1 px-2`}>
                  <div
                    className="row jc-around  ai-center"
                    style={{width: "100%"}}></div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );
  const tradesTable = (
    <ScrollBar>
      <table
        className="text-center double-striped"
        cellSpacing="0"
        cellPadding="0">
        <thead>
          <tr>
            <th className="pt-1">{t("time")}</th>
            <th>{t("date")}</th>
            <th>{t("OrdersTrades.market")}</th>
            <th>{t("OrdersTrades.side")}</th>
            <th>{t("OrdersTrades.type")}</th>
            <th>{t("OrdersTrades.order")}</th>
            <th />

            <th>{t("pricePerUnit")}</th>
            <th />
            <th>{t("totalPrice")}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customData.trades.map((tr, index) => (
            <Fragment key={index}>
              <tr className={tr.side === "buy" ? "text-green" : "text-red"}>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{t("pair." + tr.market)}</td>
                <td>{tr.side === "buy" ? t("buy") : t("sell")}</td>
                <td>
                  {tr.type === "market"
                    ? t("OrdersTrades.market")
                    : t("OrdersTrades.limit")}
                </td>
                <td>{tr.order}</td>
                <td>
                  {tr.market === "BTC/IRT" || tr.market === "BTC/USDT"
                    ? "BTC"
                    : "ETH"}
                </td>
                <td>{tr.pricePerUnit.toLocaleString()}</td>
                <td>
                  {tr.market === "BTC/IRT"
                    ? "IRRT"
                    : tr.market === "ETH/BTC"
                    ? "BTC"
                    : "USDT"}
                </td>
                <td>{tr.totalPrice.toLocaleString()}</td>
                {openItem.trades === index ? (
                  <td onClick={() => setOpenItem({...openItem, trades: null})}>
                    {/*<i className="icon-up flex jc-center  text-blue font-size-md"/>*/}
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm"
                      customClass={classes.iconBG}
                    />
                  </td>
                ) : (
                  <td onClick={() => setOpenItem({...openItem, trades: index})}>
                    {/*<i className="icon-down flex jc-center  text-blue font-size-md"/>*/}
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm"
                      customClass={classes.iconBG}
                    />
                  </td>
                )}
              </tr>
              <tr
                style={{
                  display: openItem.trades === index ? "revert" : "none",
                }}>
                <td colSpan="13" className={`py-1 px-2`}>
                  <div
                    className="row jc-around  ai-center"
                    style={{width: "100%"}}></div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );

  const data = [
    {id: 1, title: t("OrdersTrades.aliveOrder"), body: aliveOrderTable},
    {id: 2, title: t("OrdersTrades.stop"), body: stopOrderTable},
    {id: 3, title: t("OrdersTrades.ordersHistory"), body: ordersHistoryTable},
    {id: 3, title: t("OrdersTrades.trades"), body: tradesTable},
  ];

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <AccordionBox
        title={t("OrdersTrades.title")}
        content={data}
        safari={classes.safariFlexSize}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(OrdersTrades);
