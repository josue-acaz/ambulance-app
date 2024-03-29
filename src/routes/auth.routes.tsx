import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// pages
import SignIn from "../pages/SignIn";
import Download from "../pages/Download";

// types
import { RouteProps } from "./types";

class AuthRoutes extends React.Component
{
    routes: Array<RouteProps> = [
        {
            path: "/login",
            exact: false,
            component: SignIn,
        },
        {
            path: "/download",
            exact: false,
            component: Download,
        }
    ];

    render()
    {
        return(
            <Switch>
                {this.routes.map((route, index) => (
                    <Route 
                        key={index} 
                        path={route.path} 
                        exact={route.exact} 
                        component={route.component} 
                    />
                ))}
                <Redirect from="*" to="/login" />
            </Switch>
        );
    }
}


export default AuthRoutes;
