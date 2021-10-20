import React from "react";
import TheNavMenu from "./components/TheNavMenu/TheNavMenu";
import TheOverview from "./components/TheOverview/TheOverview";
import {Route, Switch} from "react-router-dom";
import * as Routes from "../../../../../../routes/routes";
import {useTranslation} from "react-i18next";
import {LastTrades, MyOrder, Order, OrderBook, Overview} from "../../../../../../routes/routes";
import Button from "../../../../../../components/Button/Button";
import classes from "./TheDashboard.module.css";
import TheOrderBook from "./components/TheOrderBook/TheOrderBook";
import TheTradingView from "./components/TheTradingView/TheTradingView";


const TheDashboard = () => {

    const {t} = useTranslation();

    return (
        <div className={`container column jc-between ai-center px-2 py-1 ${classes.container}`}>

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
                                /*onClick={submit}*/
                                buttonTitle="سفارش خرید"
                            />
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.sellOrder}`}
                                type="submit"
                                /*onClick={submit}*/
                                buttonTitle="سفارش فروش"
                            />
                    </div>
                </Route>
                {/*<Route path={Routes.Order}>

                    <div className={`container col-49`}>

                    </div>
                    <div className={`container col-49`}>

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

                </Route>*/}

                <Route path="*">
                    <div
                        className="container flex ai-center jc-center"
                        style={{height: "70%"}}>
                        <span>{t("comingSoon")}</span>
                    </div>
                </Route>
            </Switch>


            <TheNavMenu/>
        </div>
    );
};

export default TheDashboard;
