import React from 'react';
import {useTranslation} from "react-i18next";
import HeaderBuilder from "../../../../../../components/HeaderBuilder/HeaderBuilder";

const LandingHeader = () => {

    const {t} = useTranslation();

    return (
       <HeaderBuilder>
           <h2>{t("Landing.title")}</h2>
       </HeaderBuilder>
    );
};

export default LandingHeader;