import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import * as RoutesName from "../../Routes/routes";
import TechnicalChart from "./Sections/Content/components/TechnicalChart/TechnicalChart";
import MainMenu from "./Sections/MainMenu/MainMenu";
import SubMenu from "./Sections/SubMenu/SubMenu";
import Header from "./Sections/Header/Header";
import Info from "../../../../components/Info/Info";
import Content from "./Sections/Content/Content";
import {useSelector} from "react-redux";
import classes from "./UserPanel.module.css"

const UserPanel = () => {
    const isLogin = useSelector((state) => state.auth.isLogin)

    return (
        <div className={`${classes.container} width-100`}>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path={RoutesName.TechnicalRelative} element={<TechnicalChart/>}/>
                </Route>
                <Route path="*" element={<div className="row width-100 height-100" style={{backgroundColor:"red"}}>
                    <MainMenu isLogin={isLogin}/>
                    <SubMenu isLogin={isLogin}/>
                    <div className="column content">
                        <Header/>
                        <Info/>
                        <Content/>
                    </div>
                </div>}/>
            </Routes>
        </div>
    );
};

export default UserPanel;
