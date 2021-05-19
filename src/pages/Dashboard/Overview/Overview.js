import React, {Fragment, useEffect, useState} from "react";
import classes from "./Overview.module.css";
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import {OverViewData} from "../../../FakeData/FakeData";
import {connect} from "react-redux";
import axios from "axios";

const Overview = (props) => {
  const {t} = useTranslation();

  const [overviewData, setOverviewData] = useState({
    symbol: "",
    priceChange: "",
    priceChangePercent: "",
    weightedAvgPrice: "",
    prevClosePrice: "",
    lastPrice: "",
    lastQty: "",
    bidPrice: "",
    //bidQty: "",
    askPrice: "",
    //askQty: "",
    openPrice: "",
    highPrice: "",
    lowPrice: "",
    volume: "",
    quoteVolume: "",
    openTime: 0,
    closeTime: 0,
    firstId: 0,
    lastId: 0,
    count: 0,
  });

  const getOverviewData = (activePair) => {
    //console.log( activePair.base + activePair.quote )
    const axiosInstance = axios.create({
      //proxy: {host:"217.97.101.134",port:80},
      baseURL: "https://api.binance.com",
      timeout: 5000,
      headers: {"X-Custom-Header": "foobar"},
    });
    axiosInstance
      .get("/api/v3/ticker/24hr", {
        params: {
          symbol: props.activePair.base + (props.activePair.quote === "IRT" ? "USDT" : props.activePair.quote),
        },
      })
      .then(function (response) {
        //console.log("overviewData   : " , response.data);
        setOverviewData(response.data);
      })
      .catch(function (error) {
        //console.log("Error : " , error);
        //setOverviewData( )
        clearInterval();
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getOverviewData(props.activePair);
    }, 2000);
    return () => clearInterval(interval);
  }, [props.activePair]);

  const bodyBuilder = (data) => {
    return (
      <div className={classes.content}>
        <p>
          {t("overview.change")}:{" "}
          <span className={data.type ? "text-green" : "text-red"}>
            %{data.change}
            {data.type ? "+" : "-"}
          </span>
        </p>
        <p>
          {t("min")}:{" "}
          <span className="text-red">{data.min.toLocaleString()}</span>{" "}
          {t(`currency.${props.activePair.quote}`)}
        </p>
        <p>
          {t("max")}:{" "}
          <span className="text-green">{data.max.toLocaleString()}</span>{" "}
          {t(`currency.${props.activePair.quote}`)}
        </p>
        <p>
          {t("overview.volume")}: <span>{data.volume.toLocaleString()} </span>
          {t(`currency.${props.activePair.quote}`)}
        </p>
      </div>
    );
  };

  let lastDayBody = (
    <div className={classes.content}>
      {overviewData.openTime > 0 ? (
        <Fragment>
          <p className="flex">
            {t("overview.change")}:{" "}
            <span
              className={`${
                overviewData.priceChangePercent > 0 ? "text-green" : "text-red"
              }`}
              style={{direction: "ltr"}}>
              {parseFloat(overviewData.priceChangePercent)} %{" "}
            </span>{" "}
          </p>
          <p>
            {t("min")}:{" "}
            <span className="text-red">{overviewData.lowPrice}</span>{" "}
            {t(`currency.${props.activePair.quote}`)}
          </p>
          <p>
            {t("max")}:{" "}
            <span className="text-green">{overviewData.highPrice}</span>{" "}
            {t(`currency.${props.activePair.quote}`)}
          </p>
          <p>
            {t("overview.volume")}: <span>{overviewData.volume} </span>
            {t(`currency.${props.activePair.quote}`)}
          </p>
        </Fragment>
      ) : (
        <div
          className="container flex ai-center jc-center flashit"
          style={{height: "100%"}}>
          در حال دریافت اطلاعات...
        </div>
      )}
    </div>
  );

  const data = [
    {title: t("overview.lastDay"), body: lastDayBody},
    {title: t("overview.lastWeek"), body: bodyBuilder(OverViewData.lastWeek)},
    {title: t("overview.lastMonth"), body: bodyBuilder(OverViewData.lastMonth)},
  ];

  return (
    <div
      className={`container card-background card-border ${classes.container}`}>
      <AccordionBox
        title={t("overview.title")}
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

export default connect(mapStateToProps, null)(Overview);
