import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import * as Routes from "../../../../../../routes/routes";

import Profile from "./components/Profile/Profile";
import Security from "./components/Security/Security";
import Personalization from "./components/Personalization/Personalization";
import Authentication from "./components/Authentication/Authentication";
import {setKYCStatusInitiate} from "../../../../../../store/actions/auth";

const Settings = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setKYCStatusInitiate())
    }, [])

    return (
        <div className="px-1 py-1">
            <Switch>
                <Route exact path={Routes.Profile}>
                    <Profile/>
                </Route>
                    <Route exact path={Routes.Security}>
                    <Security/>
                </Route>
                <Route exact path={Routes.Personalization}>
                    <Personalization/>
                </Route>
                <Route exact path={Routes.Authentication}>
                    <Authentication/>
                </Route>
                {/*<ProtectedRoute component={WalletSubMenu} isLogin={props.isLogin} exact path={Routes.WalletSubMenu}/>*/}
                <Route path="*">
                    <Redirect
                        to={{
                            pathname: `${Routes.Profile}`,
                        }}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default Settings;
