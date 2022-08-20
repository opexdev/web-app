import React from 'react';
import {Trans, useTranslation} from "react-i18next";

const NullMarketStats = ({interval}) => {

    const {t} = useTranslation();

    return (
        <span className={`text-center`}>
                <Trans
                    i18nKey="MarketView.nullResponse"
                    values={{
                        interval: t("marketInterval." + interval),
                    }}
                />
            </span>
    );
};

export default NullMarketStats;
