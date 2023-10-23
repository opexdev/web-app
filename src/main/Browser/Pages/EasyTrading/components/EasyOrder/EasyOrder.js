import React, {useState} from 'react';
import classes from './EasyOrder.module.css'
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import AccordionBox from "../../../../../../components/AccordionBox/AccordionBox";
import EasyBuyOrder from "./components/EasyBuyOrder/EasyBuyOrder";
import EasySellOrder from "./components/EasySellOrder/EasySellOrder";
import {images} from "../../../../../../assets/images";

const EasyOrder = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(0);

    const [selected, setSelected] = useState({
        "base": null,
        "quote": null,
    })


    const data = [
        {id: 1, title: t("buy"), body: <EasyBuyOrder setOutPutSelected={setSelected}/>},
        {id: 2, title: t("sell"), body: <EasySellOrder/>},
    ];

    return (
        <div className={`container card-bg card-border my-2 ${classes.container} width-30`}>



            <AccordionBox
                title={<div className={`width-100 row jc-between ai-center`}>
                    <span>{t("orders.title")}</span>
                    {/*<div className={`${classes.avatar}  position-relative`}
                         style={{backgroundImage: `url("${images[selected?.quote] }")`}}>
                        <div className={`${classes.avatar} ${classes.backImg} position-absolute`}
                             style={{backgroundImage: `url("${images[selected?.base] }")`}}
                        />
                    </div>*/}
                </div>}
                safari={classes.safariFlexSize}
                content={data}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
};

export default EasyOrder;
