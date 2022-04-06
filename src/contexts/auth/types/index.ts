import AuthUser from "../../../models/Auth/AuthUser";
import LoginCredentials from "../../../viewModels/LoginCredentials";

interface AuthResponse {
    token: string;
    auth_user: AuthUser;
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