import React from 'react';
import classes from "../../MarketView.module.css";
import {images} from "../../../../../../../../../../assets/images";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {useTranslation} from "react-i18next";

const MostDecreasedPrice = ({mostDecreasedPrice}) => {

    const {t} = useTranslation();

    return (
        <div className={`column border-bottom  my-3`}>
            <span className={`${classes.title} text-orange`}>{t("MarketView.mostDecreased")}</span>
            <div className={`row jc-between ai-center`}>
                <div className={`row jc-center ai-center`}>
                    <img
                        className="img-md-plus ml-05"
                        src={images[mostDecreasedPrice.pairInfo.baseAsset]}
                        alt={mostDecreasedPrice.pairInfo.baseAsset}
                        title={mostDecreasedPrice.pairInfo.baseAsset}
                    />
                    <span className={`mr-05`}>{t("currency." + mostDecreasedPrice.pairInfo.baseAsset)}</span>
                </div>
                <div className={`column ai-end text-red`}>
                    <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'}`}>
                        <span className={`font-size-sm-mini ${i18n.language !== "fa" ? 'mr-05' : 'ml-05'}`}>{mostDecreasedPrice.pairInfo.quoteAsset}</span>
                        <span> {new BN(mostDecreasedPrice?.lastPrice).toFormat()} </span>
                    </div>
                    <span className={`direction-ltr`}>{new BN(mostDecreasedPrice?.priceChangePercent).toFormat(2)} %</span>
                </div>
            </div>
        </div>
    );
};

export default MostDecreasedPrice;
