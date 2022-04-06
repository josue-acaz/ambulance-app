import api from "../../api";
import AuthUser from "../../models/Auth/AuthUser";
import LoginCredentials from "../../viewModels/LoginCredentials";
import { setToLS, getFromLS } from "../../utils";

// types
import { AuthResponse } from "./types";

class AuthService {
    async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post("/AuthUsers/authenticate", credentials);
        return response.data;
    }

    setAuthToken(token: string)
    {
        setToLS("@RCAuth:token", token);
    }

    getAuthToken()
    {
        return getFromLS("@RCAuth:token");
    }

    setAuthUser(authUser: AuthUser)
    {
        setToLS("@RCAuth:user", JSON.stringify(authUser));
    }

    getAuthUser(): AuthUser
    {
        const storaged_user = getFromLS("@RCAuth:user");
        return storaged_user ? JSON.parse(storaged_user) : null;
    }
}

export default AuthService;