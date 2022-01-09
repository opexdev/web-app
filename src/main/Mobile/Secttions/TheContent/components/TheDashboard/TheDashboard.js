import React, {useEffect, useState} from "react";
import TheNavMenu from "./components/TheNavMenu/TheNavMenu";
import TheOverview from "./components/TheOverview/TheOverview";
import {Route, Switch, useHistory, useParams} from "react-router-dom";
import * as Routes from "../../../../../../routes/routes";
import {useTranslation} from "react-i18next";
import {LastTrades, MyOrder, Order, OrderBook, Overview} from "../../../../../../routes/routes";
import Button from "../../../../../../components/Button/Button";
import classes from "./TheDashboard.module.css";
import TheOrderBook from "./components/TheOrderBook/TheOrderBook";
import TheTradingView from "./components/TheTradingView/TheTradingView";
import Icon from "../../../../../../components/Icon/Icon";
import TheOrder from "./components/TheOrder/TheOrder";


const TheDashboard = () => {

    const {t} = useTranslation();
    const [activeOrder , setActiveOrder] = useState(false)
    const [showChart , setShowChart] = useState(false)
    const history = useHistory();


    history.listen((location) =>{
        if (location.pathname === Order) {
            setActiveOrder(true)
        }
    })

    const GoToOrderHandler = () => {
        setActiveOrder(true)
        history.push(Order)
    }
    const BackClickHandler = () => {
        setActiveOrder(false)
        history.push(OrderBook)
    }
    const NextClickHandler = () => {
        setActiveOrder(false)
        history.push(MyOrder)
    }


    return (
        <div className={`container column jc-between ai-center px-2 py-1 ${classes.container} ${activeOrder ? classes.activeOrder : ""}`}>

            <Switch>
                <Route path={Routes.Overview}>

                    <div className={`container col-28`}>
                        <TheOverview/>
                    </div>
                    <div className={`container col-70`}>
                        <TheTradingView/>
                    </div>

                </Route>
                <Route path={Routes.OrderBook}>
                    <div className={`container col-92`}>
                        <TheOrderBook/>
                    </div>
                    <div className={`container row jc-between ai-end col-08`}>
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.buyOrder}`}
                                type="submit"
                                onClick={GoToOrderHandler}
                                buttonTitle="سفارش خرید"
                            />
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.sellOrder}`}
                                type="submit"
                                onClick={GoToOrderHandler}
                                buttonTitle="سفارش فروش"
                            />
                    </div>
                </Route>
                <Route path={Routes.Order}>
                    <div className={`container col-06 row jc-around ai-center`}>
                        <div className={`container col-10 flex jc-center ai-center ${classes.headerItem}`}>
                            <Icon iconName="icon-right-open font-size-md flex" onClick={BackClickHandler}/>
                        </div>
                        <div className={`container col-38 row jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(false)}>
                            <Icon iconName={`icon-orderbook font-size-md-plus flex ${showChart ?  '' : 'icon-active font-size-md-plus-plus'}`} customClass={`ml-1`}/>
                            <Button
                                buttonClass={`${classes.headerButton} ${showChart ? "" : classes.selected} mr-1`}
                                type="submit"
                                /*onClick={()=>setShowChart(false)}*/
                                buttonTitle={t("orderBook.title")}
                            />
                        </div>
                        <div className={`container col-38 flex jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(true)}>
                            <Icon iconName={`icon-account font-size-md-plus flex ${showChart ? 'icon-active font-size-md-plus-plus' : ''}`} customClass={`ml-1`}/>
                            <Button
                                buttonClass={`${classes.headerButton} ${showChart ? classes.selected : ""} mr-1`}
                                type="submit"
                                /*onClick={()=>setShowChart(true)}*/
                                buttonTitle={t("charts.title")}
                            />
                        </div>
                        <div className={`container col-10 flex jc-center ai-center ${classes.headerItem}`}>
                            <Icon iconName="icon-left-open font-size-md flex" onClick={NextClickHandler}/>

                        </div>
                    </div>
                    <div className={`container col-46`}>
                        {showChart ? <TheTradingView/> : <TheOrderBook orderLayout={true}/>}
                    </div>
                    <div className={`container col-46`}>
                        <TheOrder/>
                    </div>
                </Route>
                <Route path={Routes.MyOrder}>

                    <div className={`container col-49`}>

                    </div>
                    <div className={`container col-49`}>

                    </div>

                </Route>
                <Route path={Routes.LastTrades}>

                    <div className={`container col-49`}>

                    </div>
                    <div className={`container col-49`}>

                    </div>

                </Route>

                <Route path="*">
                    <div
                        className="container flex ai-center jc-center"
                        style={{height: "70%"}}>
                        <span>{t("comingSoon")}</span>
                    </div>
                </Route>
            </Switch>


            {activeOrder ? "" : <TheNavMenu/>}
        </div>
    );
};

export default TheDashboard;
