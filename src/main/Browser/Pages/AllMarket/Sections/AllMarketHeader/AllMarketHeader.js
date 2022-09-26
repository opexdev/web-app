import React from 'react';
import {useTranslation} from "react-i18next";
import HeaderBuilder from "../../../../../../components/HeaderBuilder/HeaderBuilder";
import {useSelector} from "react-redux";

const AllMarketHeader = () => {

    const {t} = useTranslation();
    const interval = useSelector((state) => state.global.marketInterval)

    return (
        <HeaderBuilder>
            <div className={`row jc-center ai-baseline`}>
                <h2 className={`ml-025`}>{t("market.title")}</h2>
                <span className={`fs-0-8 mr-025`}>( {t("marketInterval." + interval)} )</span>
            </div>
        </HeaderBuilder>
    );
};

export default AllMarketHeader;