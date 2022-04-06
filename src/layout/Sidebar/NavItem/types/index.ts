interface NavItemProps {
    to: string;
    icon: any;
    label: string;
    childs: Array<any>;
    active?: boolean;
    onClick(): void;
}

interface NavItemViewProps {
    active: boolean;
};

export type {
    NavItemProps,
    NavItemViewProps,
};