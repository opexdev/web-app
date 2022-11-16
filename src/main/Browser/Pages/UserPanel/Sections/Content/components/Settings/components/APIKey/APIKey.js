    import React from 'react';
    import classes from './APIKey.module.css'
    import {useTranslation} from "react-i18next";
    import CreateAPIKey from "./components/CreateAPIKey/CreateAPIKey";
    import APIKeyList from "./components/APIKeyList/APIKeyList";

    const APIKey = () => {

        const {t} = useTranslation();


        return (<>
                <CreateAPIKey/>
                <APIKeyList/>

            </>
        );
    };

    export default APIKey;
