import React from 'react';
import classes from "./Market.module.css"
import {images} from "../../../../assets/images"
import MarketCard from "./components/MarketCard/MarketCard";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import Icon from "../../../../components/Icon/Icon";



const Market = (props) => {

    const {t} = useTranslation();


    const CardDataFavoriteCurrency =[
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
    ]

    const CardDataAll = [



        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },



        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },{
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },{
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'ETH/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: 'BTC/IRT',
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: 'BTC/IRT',
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
    ]


    const data = [
        {id: 1 , title: <Icon iconName="icon-star-1 font-size-md"/> , body: <MarketCard CardData = {CardDataFavoriteCurrency}/> },
        {id: 2 , title: t('all') , body: <MarketCard CardData = {CardDataAll}/>},
        {id: 3 , title: t('currency.BTC') , body: "content"},
        {id: 4 , title: t('currency.IRT') , body: "content"},
        {id: 5 , title: t('currency.USDT') , body: "content"},
    ]



    return (
        <div className={`container card-background ${classes.container}`}>

            <AccordionBox
                title={t('market.title')}
                style={classes}
                /*UlMaxWidth=''*/
                ItemsBorderTop= 'true'
                content={data}
                titleClassName={classes.TitleFontSize}
                headerClassName={classes.listBorder}
                headerListClassName={classes.UlMaxWidth}
                safari={classes.safariFlexSize}
                /*headerFlex={}
                bodyFlex={}*/
            />




        </div>
    );
};

export default Market;