import React from "react";
import MainMenu from "./MainMenu/MainMenu";
import SubMenu from "./SubMenu/SubMenu";
import ScrollBar from "../components/ScrollBar";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = (props) => {
    return (
        <Router>
            <div className={`container ${props.isDark ? 'dark' : ''}`}>
                <div className="row">
                    <MainMenu/>
                    <SubMenu/>
                    <div className="column content" style={{marginRight: "27%", height: "100vh"}}>
                        <ScrollBar>
                            <Header/>
                            <Switch>
                                <Route exact path="/">

                                </Route>
                                <Route path="*">
                                    "404"
                                </Route>
                            </Switch>
                            <Footer/>
                        </ScrollBar>
                    </div>
                </div>
            </div>
        </Router>
    );
};

const mapStateToProps = state => {
    return {
        isDark: state.isDark
    }
}

export default connect(mapStateToProps, null)(App);