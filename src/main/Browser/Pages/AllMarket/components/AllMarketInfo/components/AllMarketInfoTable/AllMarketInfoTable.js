import React from 'react';
import classes from './AllMarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";
import Button from "../../../../../../../../components/Button/Button";
import {BN} from "../../../../../../../../utils/utils";
import i18n from "i18next";
import {setActivePairInitiate} from "../../../../../../../../store/actions";
import {Panel} from "../../../../../../Routes/routes";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const AllMarketInfTable = ({data, activeCurrency}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allExchangeSymbols = useSelector((state) => state.exchange.symbols)

    const navigateToPanel = (symbol) => {
        const selectedPair = allExchangeSymbols.find( s => s.symbol === symbol)
        dispatch(setActivePairInitiate(selectedPair, 0))
        navigate(Panel)
    }

    let head = (
        <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-15 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-11 flex  jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-9 flex jc-start ai-center">{t("MarketInfo.priceChange")}</span>
            <span className="width-12 flex jc-start ai-center">{t("MarketInfo.lowPrice")}</span>
            <span className="width-12 flex jc-start ai-center">{t("MarketInfo.highPrice")}</span>
            <span className="width-15 flex jc-start ai-center">{t("MarketInfo.volume")}</span>
            {/*<span className="width-10 flex jc-start ai-center">{t("MarketInfo.lowPrice")}</span>
            <span className="width-10 flex jc-start ai-center">{t("MarketInfo.highPrice")}</span>*/}
            <span className="width-10 flex jc-start ai-center">{t("MarketInfo.chart")}</span>{/*
            <span className="width-8 flex jc-center ai-center">{t("MarketInfo.details")}</span>
            <span className="width-8 flex jc-center ai-center">{t("MarketInfo.trade")}</span>*/}
        </div>
    );

    let body = (
        <>
            {data.map((tr, index) => {
                return (
                    <div className={`${classes.row} row rounded-5 border-bottom px-2 py-2`} key={index}>
                         <span className="width-15 row jc-start ai-center">
                             <img src={images[tr?.base]} alt={tr?.base}
                                  title={tr?.base} className={`img-md-plus ml-05`}/>
                                 <span className={`fs-01 mr-05`}>{activeCurrency ? t("currency." + tr?.base) : tr?.base + " / " + tr?.quote}</span>
                         </span>
                        <span className={`width-11 flex jc-start ai-center ${tr?.priceChangePercent > 0 ? "text-green" : "text-red"}`}>{new BN(tr.lastPrice).toFormat()} <span className={`fs-0-7 mr-05`}>{t("currency." + tr?.quote)}</span></span>


                        <span className={`width-9 flex ${i18n.language !== "fa" ? 'jc-start' : 'jc-end'} ai-center ${tr?.priceChangePercent > 0 ? "text-green" : "text-red"} direction-ltr`}>{new BN(tr?.priceChangePercent).toFormat(2)} %</span>
                        <span className="width-12 flex jc-start ai-center">{new BN(tr?.lowPrice).toFormat()}</span>

                        <span className={`width-12 flex jc-start ai-center`}>{new BN(tr?.highPrice).toFormat()}</span>


                        <span className="width-15 flex jc-start ai-center">{new BN(tr?.volume).toFormat()}</span>
                        {/*<span className="width-10 flex jc-start ai-center">{tr.lowPrice}</span>
                        <span className="width-10 flex jc-start ai-center">{tr.highPrice}</span>*/}

                        <span className="width-10 flex jc-start ai-center position-relative">
                            <img
                                className={`img-lg-2 ${classes.filter}`}
                                src={images.chart}
                                alt={""}
                                title={""}
                            />
                            <span className={`fs-0-6 position-absolute`} style={{left:`${i18n.language !== "fa" ? "20%" : "48%"}`}}>{t("comingSoon")}</span>
                        </span>

                        <span className="width-8 flex jc-end ai-center">
                            <Button
                                buttonClass={classes.thisButton}
                                type="button"
                                // onClick={() => navigate("/", { replace: true })}
                                buttonTitle={t("MarketInfo.details")}
                            />
                        </span>
                        <span className="width-8 flex jc-end ai-center">
                            <Button
                                buttonClass={classes.thisButton}
                                type="button"
                                onClick={() => navigateToPanel(tr.symbol)}
                                buttonTitle={t("MarketInfo.trade")}
                            />
                        </span>



                    </div>
                )
            })}
        </>
    );

    return (
        <>
            {head}
            {body}
        </>
    );
};

export default AllMarketInfTable;
