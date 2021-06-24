import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Auth} from './Pages/AuthPage/Auth'
import {Admin} from './Pages/AdminPage/Admin'
import {Main} from "./Pages/MainPage/Main";


export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/admin" exact>
                    <Admin/>
                </Route>
                <Route path="/main" exact>
                    <Main/>
                </Route>
                <Redirect to="/main"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <Auth/>
            </Route>
            <Route path="/main" exact>
                <Main/>
            </Route>
            <Redirect to="/main"/>
        </Switch>
    )
}
