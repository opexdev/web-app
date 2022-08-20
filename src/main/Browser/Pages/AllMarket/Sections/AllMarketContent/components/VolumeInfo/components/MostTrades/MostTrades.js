import React from 'react';
import {images} from "../../../../../../../../../../assets/images";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {useTranslation} from "react-i18next";

const MostTrades = ({mostTrades}) => {

    const {t} = useTranslation();

    return (
        <>
            <img src={images[mostTrades?.pairInfo?.baseAsset]}
                 alt={mostTrades?.pairInfo?.baseAsset}
                 title={mostTrades?.pairInfo?.baseAsset}
                 className={`img-md-plus`}/>
            <span>{t("currency." + mostTrades?.pairInfo?.baseAsset)}</span>
            <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-center ai-center width-100 text-green`}>
                <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} font-size-md`}>{new BN(mostTrades?.tradeCount).toFormat()} </span>
            </div>

        </>
    );
};

export default MostTrades;
