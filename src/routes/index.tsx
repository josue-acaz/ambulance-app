import React from "react";

import { AuthContext } from "../contexts/auth/auth.context";

// routes
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

class Routes extends React.Component
{
    static contextType = AuthContext;

    constructor(props: any)
    {
        super(props);
    }

    componentDidMount()
    {
        this.setState({ authenticated: this.context.authenticated });
    }

    render()
    {
        if(this.context.loading) {
            return <p>Loading...</p>;
        }

        return this.context.authenticated ? <AppRoutes /> : <AuthRoutes />;
    }
}   

export default Routes;