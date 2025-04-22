import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../utils/utils";
import i18n from "i18next";
import {setActivePairInitiate} from "../../../../../../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Panel} from "../../../../../../Routes/routes";
import {useNavigate} from "react-router-dom";
import {useGetChartData} from "../../../../../../../../queries";


const MarketInfoTable = ({data, activeCurrency, interval}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)
    const allExchangeSymbols = useSelector((state) => state.exchange.symbols)

    const pairsList = useSelector((state) => state.exchange.pairsList)
    const symbols = Object.keys(pairsList);

    const { data: ChartData, isLoading: ChartDataIsLoading, error: ChartDataError } = useGetChartData(symbols, interval);


    const navigateToPanel = (baseAsset, quoteAsset) => {
        const pairSymbolFormatted = `${baseAsset}_${quoteAsset}`;
        dispatch(setActivePairInitiate(`${baseAsset}_${quoteAsset}`, 0));
        navigate(Order)
    }

    let head = (
        <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-30 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.priceChange")}</span>
            <span className="width-20 flex jc-start ai-center">{t("MarketInfo.volume")}</span>
            <span className="width-25 flex jc-end ai-center">{t("MarketInfo.chart")}</span>
        </div>
    );

    const chartView = (chartInfo) => {
        if (ChartDataIsLoading) {
            return <span className="flashit ">-----</span>
        }
        if (ChartDataError || !(chartInfo?.svgData)) {
            return
        }
        return <img src={`data:image/svg+xml;base64,${chartInfo?.svgData}`} alt={chartInfo?.symbol} className={`${classes.chart} ${chartInfo?.isTrendUp ? classes.filterUp : classes.filterDown }`}/>
    }

    let body = (
        <>
         {data.map((tr, index) => {
            const chartInfo = ChartData?.find(chart => chart.symbol.replace("_", "") === tr.symbol);
            return (
                <div className={`${classes.row} row fs-01 rounded-5 border-bottom cursor-pointer px-2 py-2`}  key={index} onClick={() => navigateToPanel(tr?.base, tr?.quote)}>
                    <span className="width-30 row jc-start ai-center">
                        <img src={currencies[tr?.base]?.icon} alt={tr?.base}
                             title={tr?.base} className={`img-lg ml-05`}/>
                        <span className={`fs-01 mr-05`}>{activeCurrency ?
                            <>
                                {getCurrencyNameOrAlias(currencies[tr?.base], language)}
                                <span className={`text-gray fs-0-8 mr-05`}>{tr?.base}</span>
                            </>
                            : tr?.base + " / " + tr?.quote}</span>
                    </span>

                    <span className={`width-25 flex jc-start ai-center ${tr.priceChangePercent > 0 ? "text-green" : tr.priceChangePercent < 0 ? "text-red" : ""}`}>{new BN(tr.lastPrice).decimalPlaces(currencies[tr?.quote]?.precision ?? 0).toFormat()} <span className={`fs-0-7 mr-05`}>{tr?.quote}</span></span>

                    <span className={`width-25 flex ${i18n.language !== "fa" ? 'jc-start' : 'jc-end'} ai-center ${tr.priceChangePercent > 0 ? "text-green" : tr.priceChangePercent < 0 ? "text-red" : ""} direction-ltr`}>{tr.priceChangePercent === 0 ? "0 %" : `${new BN(tr.priceChangePercent).toFormat(2)} %`}</span>

                    <span className="width-20 flex jc-start ai-center">{new BN(tr.volume).decimalPlaces(currencies[tr?.base]?.precision ?? 0).toFormat()} <span className={`text-gray fs-0-8 mr-05`}>{tr?.base}</span></span>

                    <span className="width-25 flex jc-end ai-center position-relative">
                        {chartView(chartInfo)}
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

export default MarketInfoTable;
