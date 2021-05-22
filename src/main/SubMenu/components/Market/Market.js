import React, {useEffect, useState} from "react";
import classes from "./Market.module.css";
import {images} from "../../../../assets/images";
import MarketCard from "./components/MarketCard/MarketCard";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import Icon from "../../../../components/Icon/Icon";
import {MarketPair} from "../../../../FakeData/FakeData";
import axios from "axios";
import {connect} from "react-redux";

const Market = (props) => {
  const [pairs, setPairs] = useState(MarketPair);
  const [fav, setFav] = useState(["BTC/IRT", "ETH/IRT"]);

  const {t} = useTranslation();

  const marketBody = (selected, pairs) => {
    let selectedPair = pairs.filter((pair) =>
      pair.name.includes(selected + "/"),
    );
    return selectedPair.concat(
      pairs.filter((pair) => pair.name.includes("/" + selected)),
    );
  };

  const addToFav = (selected) => {
    if (fav.includes(selected)) {
      const newFav = fav.filter((item) => item !== selected);
      setFav(newFav);
    } else {
      setFav((prev) => [...prev, selected]);
    }
  };


  const [marketData, setMarketData] = useState({
    symbol: "",
    priceChange: "",
    priceChangePercent: "",
    weightedAvgPrice: "",
    prevClosePrice: "",
    lastPrice: "",
    lastQty: "",
    bidPrice: "",
    bidQty: "",
    askPrice: "",
    askQty: "",
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

  const getMarketData = (activePair) => {
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
            /*symbol: props.activePair.base + (props.activePair.quote === "IRT" ? "USDT" : props.activePair.quote),*/
            symbol: "BTCUSDT"
          },
        })
        .then(function (response) {
          //console.log("MarketData: " , response.data);
          //setMarketData(response.data);
        })
        .catch(function (error) {
          //console.log("MarketDataError: " , error);
          //setMarketData( )
          clearInterval();
        })
        .then(function () {
          // always executed
        });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMarketData(props.activePair);
    }, 2000);
    return () => clearInterval(interval);
  }, [props.activePair]);

  const data = [
    {
      id: 1,
      title: <Icon iconName="icon-star-1 font-size-md" />,
      body: (
        <MarketCard
          pairs={pairs.filter((pair) => fav.includes(pair.name))}
          favPair={fav}
          addFav={(selected) => addToFav(selected)}
        />
      ),
    },
    {
      id: 2,
      title: t("all"),
      body: (
        <MarketCard
          pairs={pairs}
          favPair={fav}
          addFav={(selected) => addToFav(selected)}
        />
      ),
    },
    {
      id: 3,
      title: t("currency.BTC"),
      body: (
        <MarketCard
          pairs={marketBody("BTC", pairs)}
          favPair={fav}
          addFav={(selected) => addToFav(selected)}
        />
      ),
    },
    {
      id: 4,
      title: t("currency.IRT"),
      body: (
        <MarketCard
          pairs={marketBody("IRT", pairs)}
          favPair={fav}
          addFav={(selected) => addToFav(selected)}
        />
      ),
    },
    {
      id: 5,
      title: t("currency.USDT"),
      body: (
        <MarketCard
          pairs={marketBody("USDT", pairs)}
          favPair={fav}
          addFav={(selected) => addToFav(selected)}
        />
      ),
    },
  ];

  return (
    <div className={`container card-background ${classes.container}`}>
      <AccordionBox
        title={t("market.title")}
        style={classes}
        ItemsBorderTop="true"
        content={data}
        titleClassName={classes.TitleFontSize}
        headerClassName={classes.listBorder}
        headerListClassName={classes.UlMaxWidth}
        safari={classes.safariFlexSize}
      />
    </div>
  );
};

/*export default Market;*/

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(Market);

