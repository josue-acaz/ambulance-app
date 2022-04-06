interface OptionProps {
    label: string;
    value: any;
};

interface OnChangeEventProps {
    target: {
        name: string, 
        value: OptionProps,
    }
};

interface SelectProps {
    name: string;
    value: string;
    error?: boolean;
    style?: React.CSSProperties;
    options: Array<OptionProps>;
    initializing?: boolean;
    onChange(event: OnChangeEventProps): void;
};

export type {SelectProps, OptionProps};