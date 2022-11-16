import React from 'react';
import classes from './APIKeyList.module.css'
import {useGetAPIKeyList} from "../../../../../../../../../../../../queries/hooks/useGetAPIKeyList";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useTranslation} from "react-i18next";
import APIKeyCard from "./components/APIKeyCard/APIKeyCard";

const APIKeyList = () => {

    const {t} = useTranslation();

    const {data, isLoading, error} = useGetAPIKeyList()



    const content = () => {

        if (isLoading) return <div className={`${classes.container} width-100 card-bg card-border py-5`}>
            <Loading/>
        </div>
        if (error) return <div className={`${classes.container} width-100 card-bg card-border py-5`}>

            <Error/>
        </div>
        if (data.length === 0) return <div className={`${classes.container} width-100 card-bg card-border py-5 flex jc-center ai-center`}>
            <span>{t('APIKey.noActiveAPIKey')}</span>

        </div>
        else return data.map((data , index) => <APIKeyCard data={data} key={index}/>)

    }

    return (

        content()
    );
};

export default APIKeyList;
