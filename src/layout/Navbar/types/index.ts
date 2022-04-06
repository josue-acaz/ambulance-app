import AuthUser from "../../../models/Auth/AuthUser";

interface NavbarProps {
    auth_user: AuthUser;
    onCollapse(): void;
    onSettings(): void;
};

export type {
    NavbarProps,
};