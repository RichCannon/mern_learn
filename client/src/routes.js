import React, {useContext} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {AuthContext} from "./context/AuthContext";

export const useRoutes = isAuth => {
    const context = useContext(AuthContext)
    //console.log('Routes',context);
    //console.log('Routes: ',isAuth);
    if (isAuth) {
        return (
            <Switch>
                <Route path={'/links'} exact>
                    <LinksPage/>
                </Route>
                <Route path={'/create'} exact>
                    <CreatePage/>
                </Route>
                <Route path={'/detail/:id'}>
                    <DetailPage/>
                </Route>
                <Redirect to={'/create'}/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path={'/'} exact>
                <AuthPage/>
            </Route>
            <Redirect to={'/'}/>
        </Switch>
    )
}
