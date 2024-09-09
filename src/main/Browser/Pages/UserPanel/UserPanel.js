import React from 'react';
import {Route, Routes, useMatch} from "react-router-dom";
import * as RoutesName from "../../Routes/routes";
import MainMenu from "./Sections/MainMenu/MainMenu";
import SubMenu from "./Sections/SubMenu/SubMenu";
import Header from "./Sections/Header/Header";
import Info from "../../../../components/Info/Info";
import Content from "./Sections/Content/Content";
import {useSelector} from "react-redux";
import classes from "./UserPanel.module.css"
import {Transactions} from "../../Routes/routes";

const UserPanel = () => {
    const isLogin = useSelector((state) => state.auth.isLogin)

    const isTxHistoryPage = useMatch(RoutesName.History)
    const isTechnicalPage = useMatch(RoutesName.Technical)

    const hasSubMenu = !(isTxHistoryPage || isTechnicalPage);


    return (
        <div className={`${classes.container} width-100`}>
            <Routes>
                <Route path="*" element={<div className="row width-100 height-100" style={{backgroundColor:"red"}}>
                    <MainMenu isLogin={isLogin}/>
                    {hasSubMenu && <SubMenu isLogin={isLogin}/>}
                    <div className={`${hasSubMenu ? "width-73" : "width-95 z-index-6" } column content`}>
                        {!isTechnicalPage && <Header/>}
                        <Info/>
                        <Content/>
                    </div>
                </div>}/>
            </Routes>
        </div>
    );
};

export default UserPanel;
