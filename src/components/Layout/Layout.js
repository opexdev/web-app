import React from 'react';
import classes from './Layout.module.css'
import {images} from "../../assets/images";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
import {Outlet} from "react-router-dom";
import Footer from "../../main/Browser/Pages/UserPanel/Sections/Footer/Footer";
import ScrollBar from "../ScrollBar";

const Layout = () => {
    return (
        <div className={`${classes.container} width-100 column text-color`}>
            <LayoutHeader/>
            <div className={`${classes.content} column`}>
                <ScrollBar>
                    <Outlet/>
                    <Footer/>
                </ScrollBar>
            </div>
        </div>
    );
};

export default Layout;
