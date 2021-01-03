import React from 'react';
import Styles from "./Market.module.css"
import {images} from "../../../assets/images"

import MarketCard from "./components/MarketCard/MarketCard";
import AccordionBox from "../../../components/AccordionBox/AccordionBox";


const Market = (props) => {

    /*const img ={
        if(MarketName === "بیتکوین/تومان"){

        }
    }*/


    const CardDataFavoriteCurrency =[
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
    ]

    const CardDataAll = [



        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },



        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },{
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },{
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
        {
            MarketImage: `${images.bitcoin}`,
            MarketName: "بیتکوین/تومان",
            Change: "2.4٪",
            Price: '446،544،000',
            Amount: "590",
            Type: 'increase'
        },
        {
            MarketImage: `${images.ethereumLight}`,
            MarketName: "اتریوم/تومان",
            Change: "1.4٪",
            Price: '16،544،000',
            Amount: "90",
            Type: 'decrease'
        },
    ]




    const data = [
        {id: 1 , title: <img className="img-sm" src={images.favoriteCurrency} alt="favoriteCurrency"/> , body: <MarketCard CardData = {CardDataFavoriteCurrency}/> },
        {id: 2 , title: "همه" , body: <MarketCard CardData = {CardDataAll}/>},
        {id: 3 , title: "بیتکوین" , body: "content"},
        {id: 4 , title: "تومان" , body: "content"},
        {id: 5 , title: "تتر" , body: "content"},
    ]

    const  styles = [
        {
            /*UlMaxWidth:'45%',*/

        }
        ]



    return (
        <div className={`container ${Styles.container}`}>

            <AccordionBox
                title="بازار"
                style={styles}
                /*UlMaxWidth=''*/
                ItemsBorderTop= 'true'
                content={data}
                titleClassName={Styles.TitleFontSize}
                headerClassName={Styles.TitleFontSize}
                headerListClassName={Styles.UlMaxWidth}
            />




        </div>
    );
};

export default Market;