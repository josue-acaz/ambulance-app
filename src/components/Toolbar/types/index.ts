interface ToolbarActionProps {
    icon?: any;
    label?: string;
    onClick?(): void;
};

interface ToolbarRouteProps {
    path: string;
    label: string;
}

interface ToolbarProps {
    title?: string;
    action: string;
    routes?: Array<ToolbarRouteProps>;
    Custom?: any;
    actions?: Array<ToolbarActionProps>;
    onAdd?(): void;
    onGoBack?(): void;
};

export type {ToolbarProps, ToolbarRouteProps};