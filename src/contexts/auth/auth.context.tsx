import React from "react";
import api from "../../api";

// services
import AuthService from "./auth.service";

// models
import AuthUser from "../../models/Auth/AuthUser";
import LoginCredentials from "../../viewModels/LoginCredentials";

// types
import { AuthContextData } from "./types";

export const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

class PropsType
{
    loading: boolean = true;
    processing: boolean = false;
    authenticated: boolean = false;
    auth_user: AuthUser | null = null;
    errors: Array<string> = [];
}

class AuthProvider extends React.Component<any, PropsType>
{
    state: PropsType = new PropsType();
    authService: AuthService = new AuthService();

    constructor(props: any)
    {
        super(props);

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount()
    {
        const storaged_user = this.authService.getAuthUser();
        const storaged_token =  this.authService.getAuthToken();

        if(storaged_user && storaged_token) {
            this.setState({ auth_user: storaged_user });
            api.defaults.headers.Authorization = `Bearer ${storaged_token}`;
            api.defaults.headers.user_id = storaged_user.id;
        }

        this.setState({ loading: false });
    }

    async signIn(credentials: LoginCredentials)
    {
        this.setState({ errors: [] });
        this.setState({ processing: true });

        try {
            const response = await this.authService.signIn(credentials);
            const { token, auth_user } = response.data;
            this.setState({ auth_user });

            api.defaults.headers.Authorization = `Bearer ${token}`;
            api.defaults.headers.user_id = auth_user.id;

            this.authService.setAuthUser(auth_user);
            this.authService.setAuthToken(token);
            this.setState({ processing: false });
        } catch (error: any) {
            if(error.response.data)
            {
                this.setState({ errors: error.response.data });
            }
            else
            {
                this.setState({ errors: ["Erro desconhecido!"] });
            }
            this.setState({ processing: false });
        }
    }

    signOut()
    {
        localStorage.clear();
        this.setState({ auth_user: null });
        window.location.reload();
    }

    render()
    {
        return(
            <AuthContext.Provider value={{
                loading: this.state.loading,
                processing: this.state.processing,
                auth_user: this.state.auth_user,
                authenticated: this.state.auth_user !== null,
                errors: this.state.errors,
                signIn: this.signIn,
                signOut: this.signOut,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;