import React, {Fragment, useState, useEffect} from "react";
import classes from "./OrdersTradesFilter.module.css";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {isSafari} from "react-device-detect";
import {
  OrdersTradesAliveOrderData,
  OrdersTradesOrdersHistoryData,
  OrdersTradesStopData,
  OrdersTradesTradesData
} from "../../../../../../../../FakeData/FakeData";
import ScrollBar from "../../../../../../../../components/ScrollBar";
import Icon from "../../../../../../../../components/Icon/Icon";
import NumberInput from "../../../../../../../../components/NumberInput/NumberInput";
import TextInput from "../../../../../../../../components/TextInput/TextInput";

const OrdersTradesFilter = (props) => {
  const {t} = useTranslation();

  //AccordionBox

  const {activeTab} = props;

  const [active, setActive] = useState(0);
  const itemsClickHandler = (index) => {
    setActive(index);
  };

  useEffect(() => {
    if (activeTab !== undefined) {
      setActive(activeTab);
    }
  }, [activeTab]);

  // end AccordionBox

  const [filterOpen, setFilterOpen] = useState(null);

  const [filters, setFilters] = useState({
    fromTime: null,
    fromDate: null,
    toTime: null,
    toDate: null,
    type: null,
    address: null,
  });

  const [alert, setAlert] = useState({
    fromTime: null,
    fromDate: null,
    toTime: null,
    toDate: null,
  });

  function timeValidator(inputField, key) {
    const isValid = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(inputField);
    if (isValid) {
      setAlert({...alert, [key]: null});
      setFilters({...filters, [key]: inputField});
    } else {
      setAlert({...alert, [key]: "ساعت وارد شده صحیح نمیباشد"});
    }
  }

  function dateValidator(inputField, key) {
    const isValid = /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/.test(
      inputField,
    );
    if (isValid) {
      setAlert({...alert, [key]: null});
    } else {
      setAlert({...alert, [key]: "تاریخ وارد شده صحیح نمیباشد"});
    }
  }
  const marketOptions = [
    {value: "all", label: "همه"},
    {value: "BTC/IRT", label: "بیتکوین/تومان"},
    {value: "ETH/IRT", label: "اتریوم/تومان"},
    {value: "ETH/BTC", label: "اتریوم/بیتکوین"},
  ];
  const sideOptions = [
    {value: "all", label: "همه"},
    {value: "buy", label: "خرید"},
    {value: "sell", label: "فروش"},
  ];

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
        <thead className="th-border-y">
          <tr>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
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
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
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
                    iconName="icon-cancel text-red font-size-sm cursor-pointer"
                    customClass={classes.iconBG}
                  />
                </td>

                {openItem.aliveOrder === index ? (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, aliveOrder: null})
                    }>
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm cursor-pointer"
                      customClass={classes.iconBG}
                    />
                  </td>
                ) : (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, aliveOrder: index})
                    }>
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm cursor-pointer"
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
                  <div className="row jc-around  ai-center" style={{width: "100%"}}/>
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
        <thead className="th-border-y">
          <tr>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
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
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
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
                    iconName="icon-cancel text-red font-size-sm cursor-pointer"
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
        <thead className="th-border-y">
          <tr>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
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
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
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
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm cursor-pointer"
                      customClass={classes.iconBG}
                    />
                  </td>
                ) : (
                  <td
                    onClick={() =>
                      setOpenItem({...openItem, ordersHistory: index})
                    }>
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm cursor-pointer"
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
                  <div className="row jc-around  ai-center" style={{width: "100%"}}/>
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
        <thead className="th-border-y">
          <tr>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
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
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
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
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm cursor-pointer"
                      customClass={classes.iconBG}
                    />
                  </td>
                ) : (
                  <td onClick={() => setOpenItem({...openItem, trades: index})}>
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm cursor-pointer"
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
                  <div className="row jc-around  ai-center" style={{width: "100%"}}/>
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
      <div
        className={`${classes.content} ${
          isSafari ? classes.safariFlexSize : ""
        } `}>
        <div className={`card-header-bg accordion-header ${classes.header}`}>
          <div className={`row jc-between ai-center  px-1 py-1`}>
            <h3>{t("OrdersTrades.title")}</h3>
            <div className="row jc-center ai-center">
              <span
                style={{color: "var(--bgGreen)"}}
                className="font-size-md-plus cursor-pointer">
                <i className="icon-microsoft_excel flex" />
              </span>
              <span
                style={{color: "var(--orange)"}}
                className="font-size-md-plus cursor-pointer"
                onClick={() => setFilterOpen((prev) => !prev)}>
                <i className="icon-filter flex" />
              </span>
            </div>
          </div>
          <div className={classes.items}>
            <ul>
              {data.map((item, index) => {
                return (
                  <li
                    className={active === index ? classes.active : ""}
                    onClick={() => itemsClickHandler(index)}
                    key={index}>
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={`accordion-body ${classes.body}`}>
          {filterOpen ? (
            <Fragment>
              <div className={classes.filterBox}>
                <NumberInput
                  lead="از ساعت"
                  after=<i className="icon-clock" />
                  customClass={classes.filterInput}
                  format="##:##"
                  placeholder="HH:mm"
                  mask={["H", "H", "m", "m"]}
                  alert={alert.fromTime}
                  onchange={(input) =>
                    timeValidator(input.target.value, "fromTime")
                  }
                />
                <NumberInput
                  lead="تاریخ"
                  after=<i className="icon-calendar-1" />
                  customClass={classes.filterInput}
                  format="####/##/##"
                  placeholder="YYYY/MM/DD"
                  mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
                  alert={alert.fromDate}
                  onchange={(input) =>
                    dateValidator(input.target.value, "fromDate")
                  }
                />
                <NumberInput
                  lead="تا ساعت"
                  after=<i className="icon-clock" />
                  customClass={classes.filterInput}
                  format="##:##"
                  placeholder="HH:mm"
                  mask={["H", "H", "m", "m"]}
                  alert={alert.toTime}
                  onchange={(input) =>
                    timeValidator(input.target.value, "toTime")
                  }
                />
                <NumberInput
                  lead="تاریخ"
                  after=<i className="icon-calendar-1" />
                  customClass={classes.filterInput}
                  format="####/##/##"
                  placeholder="YYYY/MM/DD"
                  mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
                  alert={alert.toDate}
                  onchange={(input) =>
                    dateValidator(input.target.value, "toDate")
                  }
                />
              </div>
              <div className={classes.filterBox}>
                <TextInput
                  select={true}
                  placeholder="بازار"
                  options={marketOptions}
                  value={filters.type}
                  lead="بازار"
                  customClass={classes.filterInput}
                  onchange={(e) => setFilters({...filters, type: e.value})}
                />
                <TextInput
                  select={true}
                  placeholder="سمت"
                  options={sideOptions}
                  value={filters.address}
                  lead="سمت"
                  customClass={`${classes.filterInput} ${classes.address}`}
                  onchange={(e) => setFilters({...filters, address: e.value})}
                />
              </div>
              <div className={classes.btnBox}>
                <button
                  className={`${classes.button} ${classes.submit} cursor-pointer`}
                  onClick={() => setFilterOpen((prev) => !prev)}>
                  اعمال فیلتر
                </button>
                <button
                  className={`${classes.button} ${classes.reset} cursor-pointer`}
                  onClick={() => setFilterOpen((prev) => !prev)}>
                  حذف فیلتر
                </button>
                <button
                  className={`${classes.button} ${classes.return} cursor-pointer`}
                  onClick={() => setFilterOpen((prev) => !prev)}>
                  بازگشت
                </button>
              </div>
            </Fragment>
          ) : (
            data[active].body
          )}
        </div>
      </div>
   </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.exchange.activePair,
  };
};

export default connect(mapStateToProps, null)(OrdersTradesFilter);
