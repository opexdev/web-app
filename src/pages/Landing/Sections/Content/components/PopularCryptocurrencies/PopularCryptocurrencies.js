import React from 'react';
import classes from './PopularCryptocurrencies.module.css'
import Icon from "../../../../../../components/Icon/Icon";
import MarketInfoTable from "./components/MarketInfoTable/MarketInfoTable";

const PopularCryptocurrencies = () => {
    return (
        <div className={`${classes.container} width-80 py-5`}>
            <div className={`${classes.header} row jc-between ai-center`}>

                <div className={`row jc-center ai-center`}>
                    <h2 className={`ml-1`}>رمزارزهای محبوب</h2>


                    <div className={`row jc-center ai-center mr-1`}>
                        <span className={`px-2 py-05 rounded cursor-pointer hover-text icon-active`} style={{backgroundColor:"var(--cardHeaderAlpha)"}}>تومان</span>
                        <span className={`text-orange px-05`} style={{userSelect:"none"}}>|</span>
                        <span className={`px-2 py-05 rounded cursor-pointer hover-text`} style={{backgroundColor:"var(--cardHeaderAlpha)"}}>تتر</span>
                    </div>
                </div>


                <div className={`row jc-center ai-center cursor-pointer hover-text`}>
                    <span  className={`ml-05`}>نمایش تمام بازار</span>
                    <Icon iconName="icon-left-open-1 font-size-md flex" className={`mr-05`}/>

                </div>

            </div>
            <div className={`${classes.content}`}>

                <MarketInfoTable/>

            </div>


            
        </div>
    );
};

export default PopularCryptocurrencies;
