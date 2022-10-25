import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import {BN} from "../../../../../../../../../../utils/utils";
import i18n from "i18next";
import {setActivePairInitiate} from "../../../../../../../../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Panel} from "../../../../../../../../Routes/routes";
import {useNavigate} from "react-router-dom";

const MarketInfoTable = ({data, activeCurrency}) => {

    console.log("data" , data)

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
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-30 flex jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.priceChange")}</span>
            <span className="width-20 flex jc-start ai-center">{t("MarketInfo.volume")}</span>
            <span className="width-25 flex jc-end ai-center">{t("MarketInfo.chart")}</span>
        </div>
    );

    let body = (
        <>
         {data.map((tr, index) => {
            return (
                <div className={`${classes.row} row fs-01 rounded-5 border-bottom cursor-pointer px-2 py-2`}  key={index} onClick={() => navigateToPanel(tr.symbol)}>
                    <span className="width-25 row jc-start ai-center">
                        <img src={images[tr?.base]} alt={tr?.base}
                             title={tr?.base} className={`img-lg ml-05`}/>
                        <span className={`fs-01 mr-05`}>{activeCurrency ? t("currency." + tr?.base) : tr?.base + " / " + tr?.quote}</span>
                    </span>
                    <span className={`width-30 flex jc-start ai-center ${tr.priceChange > 0 ? "text-green" : "text-red"}`}>{new BN(tr.lastPrice).toFormat()} <span className={`fs-0-7 mr-05`}>{t("currency." + tr?.quote)}</span></span>
                    <span className={`width-25 flex ${i18n.language !== "fa" ? 'jc-start' : 'jc-end'} ai-center ${tr.priceChange > 0 ? "text-green" : "text-red"} direction-ltr`}>{new BN(tr.priceChange).toFormat()} %</span>
                    <span className="width-20 flex jc-start ai-center">{new BN(tr.volume).toFormat()}</span>
                    <span className="width-25 flex jc-end ai-center position-relative">
                        <img
                            className={`img-lg-2 ${classes.filter}`}
                            src={images.chart}
                            alt={""}
                            title={""}
                        />
                        <span className={`fs-0-6 position-absolute`} style={{left:"13%"}}>{t("comingSoon")}</span>
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
