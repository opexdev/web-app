import React from "react";
import MainMenu from "./MainMenu/MainMenu";
import SubMenu from "./SubMenu/SubMenu";
import ScrollBar from "../components/ScrollBar";
import Header from "./Header/Header";
import Footer from "./Footer/footer";

const App = () => {
    return (
        <div className="container">
            <div className="row">
                <MainMenu/>
                <SubMenu/>
                <div className="column content" style={{marginRight: "27%", height: "100vh"}}>
                    <ScrollBar>
                        <Header/>
                        <Footer/>
                    </ScrollBar>
                </div>
            </div>
        </div>
    );
};

export default App;