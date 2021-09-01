import React, {Fragment, useEffect, useState,useRef} from "react";
import classes from "./MarketHeader.module.css";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import Icon from "../../../../components/Icon/Icon";
import axios from "axios";
import {getAccount, parseWalletsResponse} from "../../../SubMenu/components/WalletSubMenu/api/wallet";
import {setUserAccountInfo} from "../../../../store/actions/auth";
import useInterval from "../../../../Hooks/useInterval";


const MarketHeader = (props) => {
  const {t} = useTranslation();
  const {auth, setUserAccountInfo,activePair} = props

  const [marketHeaderData, setMarketHeaderData] = useState({
    price: null,
  });

  const getWallet = async () => {
    let accountWallet = await getAccount(auth.accessToken)
    if (accountWallet.status === 200) {
      const parsedData = parseWalletsResponse(accountWallet.data);
      setUserAccountInfo(parsedData)
    }
  }

  const getMarketHeaderData = () => {
    const axiosInstance = axios.create({
      baseURL: "https://api.binance.com",
      timeout: 5000,
      headers: {"X-Custom-Header": "foobar"},
    });
    axiosInstance
      .get("/api/v3/ticker/price", {
        params: {
          symbol:
            props.activePair.base +
            (props.activePair.quote === "IRT"
              ? "USDT"
              : props.activePair.quote),
        },
      })
      .then(function (response) {
        setMarketHeaderData(response.data);
      })
      .catch(function (error) {
      })
      .then(function () {

      });
  };

  useInterval(() => {
    getWallet()
    getMarketHeaderData(activePair);
  }, auth.isLogin ? 1500 : null);

  return (
    <Fragment>
      <div className={`col-35 column ai-start`}>
        <h2 className="mb-05">{t(`pair.${props.activePair.pair}`)}</h2>
        <p>
          {t("header.lastPrice")}:{" "}
          <span>
            {marketHeaderData.price !== null ? (
              marketHeaderData.price
            ) : (
              <span className="flashit">{t('loading')}</span>
            )}
          </span>{" "}
          {marketHeaderData.price === null
            ? ""
            : t("currency." + props.activePair.quote)}
        </p>
      </div>
      <div className={`col-30 column ai-center`}>
        <p className="mb-05">{t("header.availableBalance")}</p>
        <div className={`container row ai-center ${classes.inventory}`}>
          <div className="col-50 flex ai-center jc-end">
            <Icon
              iconName="icon-plus icon-white font-size-sm flex"
              customClass={`mx-05 ${classes.iconBG}`}
            />
            <span>{props.auth.wallets[props.activePair.base].free}</span>
            <span>{t("currency." + props.activePair.base)}</span>
          </div>
          <div className="col-50 flex ai-center  jc-start">
            <span>{props.auth.wallets[props.activePair.quote].free}</span>
            <span>{t("currency." + props.activePair.quote)}</span>
            <Icon
              iconName="icon-plus icon-white font-size-sm flex"
              customClass={`mx-05 ${classes.iconBG}`}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserAccountInfo: (info) => dispatch(setUserAccountInfo(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketHeader);
