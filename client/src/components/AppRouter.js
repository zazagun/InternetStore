import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRouts, publicRouts} from '../routs'

const AppRouter = () =>{
    let isAuth = false
    return (
        <Switch>
            {authRouts.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
        </Switch>
    )

}

export default AppRouter;