import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

// types
import { RouteProps } from "../../routes/types";

// views
import EditAircraft from "./EditAircraft";
import ListAircraft from "./ListAircraft";

class Aircraft extends React.Component<RouteComponentProps>
{
    routes: Array<RouteProps> = [];

    constructor(props: any)
    {
        super(props);
        this.routes = [
            {
                path: this.props.location.pathname,
                exact: true,
                component: ListAircraft,
            },
            {
                exact: false,
                path: `${this.props.location.pathname}/:id/edit`,
                component: EditAircraft,
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

export default Aircraft;