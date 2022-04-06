interface OptionProps {
    ref: React.MutableRefObject<any>;
    cursor: number;
    option: any;
    optionField: string;
    active: boolean;
    onSelect(option: any): void;
    RenderOption?(option: any): JSX.Element;
};

interface OptionViewProps {
    active: boolean;
};

export type {
    OptionProps,
    OptionViewProps,
};