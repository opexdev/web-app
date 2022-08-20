import React from 'react';
import classes from "../../MarketView.module.css";
import {images} from "../../../../../../../../../../assets/images";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {useTranslation} from "react-i18next";

const MostIncreasedPrice = ({mostIncreasedPrice}) => {

    const {t} = useTranslation();

    return (
        <div className={`column border-bottom`}>
            <span className={`${classes.title} text-orange`}>{t("MarketView.mostIncreased")}</span>
            <div className={`row jc-between ai-center`}>
                <div className={`row jc-center ai-center`}>
                    <img
                        className="img-md-plus ml-05"
                        src={images[mostIncreasedPrice.pairInfo.baseAsset]}
                        alt={mostIncreasedPrice.pairInfo.baseAsset}
                        title={mostIncreasedPrice.pairInfo.baseAsset}
                    />
                    <span className={`mr-05`}>{t("currency." + mostIncreasedPrice.pairInfo.baseAsset)}</span>
                </div>
                <div className={`column ai-end text-green`}>
                    <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'}`}>
                        <span className={`font-size-sm-mini ${i18n.language !== "fa" ? 'mr-05' : 'ml-05'}`}>{mostIncreasedPrice.pairInfo.quoteAsset}</span>
                        <span>{new BN(mostIncreasedPrice?.lastPrice).toFormat()}</span>
                    </div>
                    <span>% {new BN(mostIncreasedPrice?.priceChangePercent).toFormat(2)}+</span>
                </div>
            </div>
        </div>
    );
};

export default MostIncreasedPrice;
