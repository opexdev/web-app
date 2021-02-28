import React,{useState} from 'react';
import classes from "./MessagesSubMenu.module.css"
import {images} from "../../../../assets/images"
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";




const MessagesSubMenu = (props) => {


    const {t} = useTranslation();


    const data = [
        {id: 1 , title: t('MessagesSubMenu.myMessages') , body: "" },
        {id: 2 , title: t('MessagesSubMenu.news') , body: ""},
    ]


    return (
        <div className={`container card-background ${classes.container}`}>
            <AccordionBox
                title={t('MessagesSubMenu.title')}
                style={classes}
                ItemsBorderTop= 'true'
                content={data}
                titleClassName={classes.TitleFontSize}
                headerClassName={classes.listBorder}
                headerListClassName={classes.UlMaxWidth}
                safari={classes.safariFlexSize}
            />
        </div>
    );
};

export default MessagesSubMenu;