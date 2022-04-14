import AuthUser from "../../../models/Auth/AuthUser";
import LoginCredentials from "../../../viewModels/LoginCredentials";

interface AuthData {
    token: string;
    auth_user: AuthUser;
}

interface AuthResponse {
    data: AuthData;
};

interface AuthContextData {
    loading: boolean;
    processing: boolean;
    authenticated: boolean;
    auth_user: AuthUser | null;
    errors: Array<string>;
    signIn(credentials: LoginCredentials): Promise<void>;
    signOut(): void;
};

export type {
    AuthContextData, 
    AuthResponse,
};