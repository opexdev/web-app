import React, {useEffect, useState} from "react";
import classes from "./Market.module.css";
import MarketCard from "./components/MarketCard/MarketCard";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {getExchange} from "./api/market";
import Icon from "../../../../../../components/Icon/Icon";
import AccordionBox from "../../../../../../components/AccordionBox/AccordionBox";

const Market = (props) => {

    const {t} = useTranslation();
    const [pairs, setPairs] = useState([]);
    const [fav, setFav] = useState(["BTCUSDT", "ETHUSDT"]);
    const [activeTab, setActiveTab] = useState(undefined);

    const tabPairFilter = (selected, pairs) => {
        return pairs.filter((pair) => pair.baseAsset === selected || pair.quoteAsset === selected );
    };

    const addToFav = (selected) => {
        if (fav.includes(selected)) {
            const newFav = fav.filter((item) => item !== selected);
            setFav(newFav);
        } else {
            setFav((prev) => [...prev, selected]);
        }
    };

    useEffect(() => {
        getExchange()
            .then((info) => {
                if (info && info.status === 200) setPairs(info.data.symbols)
            })
        if (props.activeMarketTab) setActiveTab(parseInt(props.activeMarketTab))
    }, [])

    const data = [
        {
            title: <Icon iconName="icon-star-1 font-size-md"/>,
            body: (
                <MarketCard
                    id="0"
                    pairs={pairs.filter((pair) => fav.includes(pair.symbol))}
                    favPair={fav}
                    addFav={(selected) => addToFav(selected)}
                />
            ),
        },
        {
            title: t("all"),
            body: (
                <MarketCard
                    id="1"
                    pairs={pairs}
                    favPair={fav}
                    addFav={(selected) => addToFav(selected)}
                />
            ),
        },
        {
            id: 2,
            title: t("currency.BTC"),
            body: (
                <MarketCard
                    id="2"
                    pairs={tabPairFilter("BTC", pairs)}
                    favPair={fav}
                    addFav={(selected) => addToFav(selected)}
                />
            ),
        },
        {
            id: 3,
            title: t("currency.IRT"),
            body: (
                <MarketCard
                    id="3"
                    pairs={tabPairFilter("IRT", pairs)}
                    favPair={fav}
                    addFav={(selected) => addToFav(selected)}
                />
            ),
        },
        {
            id: 4,
            title: t("currency.USDT"),
            body: (
                <MarketCard
                    id="4"
                    pairs={tabPairFilter("USDT", pairs)}
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
                activeTab={activeTab}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeMarketTab: state.global.activeMarketTab,
    };
};

export default connect(mapStateToProps, null)(Market);

