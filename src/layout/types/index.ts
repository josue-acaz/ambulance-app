import AuthUser from "../../models/Auth/AuthUser";

interface LayoutViewProps {
    minimized: boolean;
};

interface SidebarOption {
    to: string;
    icon: any;
    label: string;
    childs: Array<SidebarOption>;
};

interface LayoutProps {
    auth_user: AuthUser;
    sidebarOptions: Array<SidebarOption>;
    onSettings(): void;
};

export type {
    LayoutViewProps,
    LayoutProps,
    SidebarOption,
};