import React from 'react';
import classes from './MarketInfoCard.module.css'
import {images} from "../../../../../../../../../../assets/images";
import {useTranslation} from "react-i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {setActivePairInitiate} from "../../../../../../../../../../store/actions";
import {Panel} from "../../../../../../../../Routes/routes";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const MarketInfoCard = ({data}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allExchangeSymbols = useSelector((state) => state.exchange.symbols)

    const backgroundBar = (percent) => {
        if (percent > 0) {
            return {
                background: `linear-gradient(#02002400 0%, #35293326 50%, #27b35a1c 70%, #31cc6a4d 100%)`,
            };
        }
        return {
            background: `linear-gradient(#02002400 0%,#35293326 50%,#dc150717 70%, #e8201236 100%)`,
        };
    }

    const navigateToPanel = (symbol) => {
        const selectedPair = allExchangeSymbols.find( s => s.symbol === symbol)
        dispatch(setActivePairInitiate(selectedPair, 0))
        navigate(Panel)
    }

    return (
        <div className={`${classes.container} my-3 px-1`}>
            {data.map((tr, index) => {
                return (
                    <div className={`${classes.item} card-border card-background column jc-between ai-center py-3 cursor-pointer`} style={backgroundBar(tr.priceChange.toString())} key={index} onClick={() => navigateToPanel(tr.symbol)}>
                        <div className={`row jc-center ai-center width-100`}>
                            <img src={images[tr?.pairInfo?.baseAsset]} alt={tr?.pairInfo?.baseAsset}
                                 title={tr?.pairInfo?.baseAsset} className={`img-lg ml-05`}/>
                            <div className={`column mr-05`}>
                                <span className={`font-size-md`}>{t("currency." + tr?.pairInfo?.baseAsset)}</span>
                                <span
                                    className={`${tr.priceChange > 0 ? "text-green" : "text-red"} direction-ltr`}>{new BN(tr.priceChange).toFormat()} %</span>
                            </div>
                        </div>
                        <span
                            className={`${tr.priceChange > 0 ? "text-green" : "text-red"} font-size-md-01`}>{new BN(tr.lastPrice).toFormat()}</span>
                        <div className={`row jc-center ai-center width-100`}>
                            <span className={`text-color-gray ml-05`}>{t("MarketInfo.volume")}:</span>
                            <span className={`mr-05`}>{new BN(tr.volume).toFormat()}</span>
                        </div>
                        <div className={`column jc-center ai-center position-relative`}>
                            <img
                                className={`img-lg-2 mb-05 ${classes.filter}`}
                                src={images.chart}
                                alt={""}
                                title={""}
                            />
                            <span className={`font-size-sm-mini position-absolute`}
                                  style={{left: "35%"}}>{t("comingSoon")}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MarketInfoCard;