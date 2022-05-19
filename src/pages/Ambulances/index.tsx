import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

// types
import { RouteProps } from "../../routes/types";

// views
import EditAmbulance from "./EditAmbulance";
import ListAmbulance from "./ListAmbulance";

class Ambulances extends React.Component<RouteComponentProps>
{
    routes: Array<RouteProps> = [];

    constructor(props: any)
    {
        super(props);
        this.routes = [
            {
                path: this.props.location.pathname,
                exact: true,
                component: ListAmbulance,
            },
            {
                exact: false,
                path: `${this.props.location.pathname}/:id/edit`,
                component: EditAmbulance,
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

export default Ambulances;