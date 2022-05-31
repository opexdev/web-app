import React from "react";
import {Login} from "../../routes/routes";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    let location = useLocation();
    const isLogin = useSelector((state) => state.auth.isLogin)

    if (!isLogin) return <Navigate to={Login} state={{from: location}} replace/>

    return <Outlet/>;
};
export default ProtectedRoute;
