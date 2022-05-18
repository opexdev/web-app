import React, {useEffect, useState} from "react";
import classes from "./Market.module.css";
import MarketCard from "./components/MarketCard/MarketCard";
import {useTranslation} from "react-i18next";
import Icon from "../../../../../../components/Icon/Icon";
import AccordionBox from "../../../../../../components/AccordionBox/AccordionBox";

const Market = () => {

    const {t} = useTranslation();
    const [activeTab] = useState(JSON.parse(localStorage.getItem("activeMarketTab")) || 0);
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem("favPair")) || []);

    useEffect(() => {
        localStorage.setItem("favPair", JSON.stringify(fav))
    }, [fav])

    const addToFav = (selected) => {
        if (fav.includes(selected)) {
            const newFav = fav.filter((item) => item !== selected);
            setFav(newFav);
        } else {
            setFav((prev) => [...prev, selected]);
        }
    };

    const data = [
        {
            title: <Icon iconName="icon-star-1 font-size-md"/>,
            body: (
                <MarketCard
                    id="0"
                    type="fav"
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
                    type="all"
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
                    type="BTC"
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
                    type="USDT"
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

export default Market;