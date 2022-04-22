interface TabItemProps {
    icon?: any;
    title: string;
    subtitle?: string;
    activeColor?: string;
};

interface TabProps {
    selected: number;
    tabs: Array<TabItemProps>;
    onChange(tab: number): void;
};

export type {
    TabProps, 
    TabItemProps,
};