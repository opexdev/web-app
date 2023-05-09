import React from 'react';
import CreateAPIKey from "./components/CreateAPIKey/CreateAPIKey";
import APIKeyList from "./components/APIKeyList/APIKeyList";

const APIKey = () => {
    return (
        <>
            <CreateAPIKey/>
            <APIKeyList/>
        </>
    );
};

export default APIKey;
