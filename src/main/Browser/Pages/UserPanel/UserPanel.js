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

const UserPanel = () => {
    const isLogin = useSelector((state) => state.auth.isLogin)

    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path={RoutesName.TechnicalRelative} element={<TechnicalChart/>}/>
            </Route>
            <Route path="*" element={<div className="row">
                <MainMenu isLogin={isLogin}/>
                <SubMenu isLogin={isLogin}/>
                <div className="column content">
                    <Header/>
                    <Info/>
                    <div style={{display: "flex", flex: 1}}>
                        <Content/>
                    </div>
                </div>
            </div>}/>
        </Routes>
    );
};

export default UserPanel;
