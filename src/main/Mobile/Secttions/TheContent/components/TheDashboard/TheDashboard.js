import React, {useState} from "react";
import TheNavMenu from "./components/TheNavMenu/TheNavMenu";
import TheOverview from "./components/TheOverview/TheOverview";
import {Route, Routes, useNavigate} from "react-router-dom";
import * as RoutesName from "../../../../../../routes/routes";
import {MyOrder, Order, OrderBook} from "../../../../../../routes/routes";
import {useTranslation} from "react-i18next";
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
    const navigate = useNavigate();

    navigate.listen((location) =>{
        if (location.pathname === Order) {
            setActiveOrder(true)
        }
    })

    const GoToOrderHandler = () => {
        setActiveOrder(true)
        navigate(Order, { replace: true });
    }
    const BackClickHandler = () => {
        setActiveOrder(false)
        navigate(OrderBook, { replace: true });
    }
    const NextClickHandler = () => {
        setActiveOrder(false)
        navigate(MyOrder, { replace: true });
    }

    return (
        <div className={`container column jc-between ai-center px-2 py-1 ${classes.container} ${activeOrder ? classes.activeOrder : ""}`}>
            <Routes>
                <Route path={RoutesName.Overview}>
                    <div className={`container col-28`}>
                        <TheOverview/>
                    </div>
                    <div className={`container col-70`}>
                        <TheTradingView/>
                    </div>
                </Route>
                <Route path={RoutesName.OrderBook}>
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
                <Route path={RoutesName.Order}>
                    <div className={`container col-06 row jc-around ai-center`}>
                        <div className={`container col-10 flex jc-center ai-center ${classes.headerItem}`}>
                            <Icon iconName="icon-right-open font-size-md flex" onClick={BackClickHandler}/>
                        </div>
                        <div className={`container col-38 row jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(false)}>
                            <Icon iconName={`icon-orderbook font-size-md-plus flex ${showChart ?  '' : 'icon-active font-size-md-plus-plus'}`} customClass={`ml-1`}/>
                            <Button
                                buttonClass={`${classes.headerButton} ${showChart ? "" : classes.selected} mr-1`}
                                type="submit"
                                buttonTitle={t("orderBook.title")}
                            />
                        </div>
                        <div className={`container col-38 flex jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(true)}>
                            <Icon iconName={`icon-account font-size-md-plus flex ${showChart ? 'icon-active font-size-md-plus-plus' : ''}`} customClass={`ml-1`}/>
                            <Button
                                buttonClass={`${classes.headerButton} ${showChart ? classes.selected : ""} mr-1`}
                                type="submit"
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
                <Route path={RoutesName.MyOrder}>
                    <div className={`container col-49`}/>
                    <div className={`container col-49`}/>
                </Route>
                <Route path={RoutesName.LastTrades}>
                    <div className={`container col-49`}/>
                    <div className={`container col-49`}/>
                </Route>
                <Route path="*">
                    <div
                        className="container flex ai-center jc-center"
                        style={{height: "70%"}}>
                        <span>{t("comingSoon")}</span>
                    </div>
                </Route>
            </Routes>
            {activeOrder ? "" : <TheNavMenu/>}
        </div>
    );
};

export default TheDashboard;
