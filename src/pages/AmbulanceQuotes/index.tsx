import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

// types
import { RouteProps } from "../../routes/types";

// views
import EditAmbulanceQuote from "./EditAmbulanceQuote";
import ListAmbulanceQuote from "./ListAmbulanceQuote";

class AmbulanceQuotes extends React.Component<RouteComponentProps>
{
    routes: Array<RouteProps> = [];

    constructor(props: any)
    {
        super(props);
        this.routes = [
            {
                path: this.props.location.pathname,
                exact: true,
                component: ListAmbulanceQuote,
            },
            {
                exact: false,
                path: `${this.props.location.pathname}/:id/edit`,
                component: EditAmbulanceQuote,
            }
        ];
    }

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
            </Switch>
        );
    }
}

export default AmbulanceQuotes;