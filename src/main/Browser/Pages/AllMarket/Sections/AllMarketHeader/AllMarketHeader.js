import React from 'react';
import {useTranslation} from "react-i18next";
import HeaderBuilder from "../../../../../../components/HeaderBuilder/HeaderBuilder";

const AllMarketHeader = () => {

    const {t} = useTranslation();


    return (
        <HeaderBuilder>
            <h2 className={``}>بازار</h2>
        </HeaderBuilder>
    );
};

export default AllMarketHeader;