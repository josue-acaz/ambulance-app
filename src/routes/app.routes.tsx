import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth/auth.context";

// layout
import Layout from "../layout";

// pages
import Home from "../pages/Home";
import Aircraft from "../pages/Aircraft";
import Customers from "../pages/Customers";
import AircraftModels from "../pages/AircraftModels";
import AircraftQuotes from "../pages/AircraftQuotes";
import AmbulanceQuotes from "../pages/AmbulanceQuotes";
import Ambulances from "../pages/Ambulances";
import Aerodromes from "../pages/Aerodromes";
import AmbulanceBases from "../pages/AmbulanceBases";
import Download from "../pages/Download";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

// types
import { RouteProps } from "./types";
import { SidebarOption } from "../layout/types";

class AppRoutes extends React.Component {
    static contextType = AuthContext;

    constructor(props: any)
    {
        super(props);
    }

    routes: Array<RouteProps> = [
        {
            path: "/home",
            exact: false,
            component: Home,
        },
        {
            path: "/customers",
            exact: false,
            component: Customers,
        },
        {
            path: "/aircraft",
            exact: false,
            component: Aircraft,
        },
        {
            path: "/aircraft-models",
            exact: false,
            component: AircraftModels,
        },
        {
            path: "/aircraft-quotes",
            exact: false,
            component: AircraftQuotes,
        },
        {
            path: "/ambulances",
            exact: false,
            component: Ambulances,
        },
        {
            path: "/ambulance-bases",
            exact: false,
            component: AmbulanceBases,
        },
        {
            path: "/ambulance-quotes",
            exact: false,
            component: AmbulanceQuotes,
        },
        {
            path: "/aerodromes",
            exact: false,
            component: Aerodromes,
        },
        {
            path: "/download",
            exact: false,
            component: Download,
        }
    ];

    sidebarOptions: Array<SidebarOption> = [
        {
            to: "/home",
            label: "Página inicial",
            icon: <DashboardIcon className="icon"/>,
            childs: [],
        },
        {
            to: "/",
            label: "Cotações",
            icon: <RequestQuoteIcon className="icon"/>,
            childs: [
                {
                    to: "/aircraft-quotes",
                    label: "UTI Aérea",
                    icon: <AirplanemodeActiveIcon className="icon"/>,
                    childs: []
                },
                {
                    to: "/ambulance-quotes",
                    label: "Ambulância",
                    icon: <DirectionsCarIcon className="icon"/>,
                    childs: []
                }
            ]
        },
        {
            to: "/",
            label: "Cadastros",
            icon: <FolderIcon />,
            childs: [
                {
                    to: "/aircraft",
                    label: "Aeronaves",
                    icon: <AirplanemodeActiveIcon className="icon"/>,
                    childs: []
                },
                {
                    to: "/ambulances",
                    label: "Ambulâncias",
                    icon: <DirectionsCarIcon className="icon"/>,
                    childs: []
                },
                {
                    to: "/ambulance-bases",
                    label: "Bases das Ambulâncias",
                    icon: <HomeWorkIcon className="icon"/>,
                    childs: []
                },
                {
                    to: "/customers",
                    label: "Clientes",
                    icon: <PeopleAltIcon className="icon"/>,
                    childs: []
                },
                {
                    to: "/aircraft-models",
                    label: "Modelos de Aeronaves",
                    icon: <ConnectingAirportsIcon className="icon"/>,
                    childs: []
                },
                {
                    to: "/aerodromes",
                    label: "Aeródromos",
                    icon: <AirplaneTicketIcon className="icon" />,
                    childs: []
                },
            ]
        }
    ];

    handleOpenSettings()
    {
        
    }

    render()
    {
        return(
            <Switch>
                <Layout auth_user={this.context.auth_user} sidebarOptions={this.sidebarOptions} onSettings={this.handleOpenSettings}>
                    {this.routes.map((route, index) => (
                        <Route 
                            key={index} 
                            path={route.path} 
                            exact={route.exact} 
                            component={route.component}
                        />
                    ))}
                </Layout>
            </Switch>
        );
    }
};

export default AppRoutes;
