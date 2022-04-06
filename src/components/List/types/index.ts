interface ListItemProps {
    text: string;
    icon?: any;
    route?: string;
    onClick?(): void;
};

interface ListProps {
    options: Array<ListItemProps>;
};

export type {
    ListItemProps,
    ListProps,
};