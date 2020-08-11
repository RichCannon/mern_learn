import 'materialize-css'
import React, {useContext} from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {NavBar} from "./components/NavBar";
import {Loader} from "./components/Loader";


function App() {
    const {login, logout, token, userId, isReady} = useAuth()

    const isAuth = !!token
   // console.log('App: ', isAuth)
    const routes = useRoutes(isAuth)

    if (!isReady) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{login, logout, token, userId, isAuth}}>
            <BrowserRouter>
                {isAuth && <NavBar/>}
                <div className={'container'}>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
