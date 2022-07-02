import React, { ReactNode } from "react";
import AuthUser from "../../models/Auth/AuthUser";

interface LayoutViewProps {
    minimized: boolean;
};

interface SidebarOption {
    to: string;
    icon: JSX.Element;
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