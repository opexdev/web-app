import React from 'react';
import {useTranslation} from "react-i18next";
import HeaderBuilder from "../../../../../../components/HeaderBuilder/HeaderBuilder";

const LandingHeader = () => {

    const {t} = useTranslation();


    return (
       <HeaderBuilder>
           <h2 className={``}>پلتفرم تبادل ارزهای دیجیتال</h2>
       </HeaderBuilder>
    );
};

export default LandingHeader;