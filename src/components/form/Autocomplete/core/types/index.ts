import {OptionProps} from "../Option/types";

interface AutocompleteCoreProps {
    value: string;
    visible: boolean;
    optionField: string;
    options: Array<OptionProps>;
    icon?: any;
    error?: boolean;
    loading?: boolean;
    color?: string;
    placeholder?: string;
    initializing?: boolean;
    coreViewStyle?: React.CSSProperties;
    inputViewStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    onOptionSelected(option: any): void;
    onChangeVisible(visible: boolean): void;
    onBlur?(event: any): void;
    onFocus?(event: any): void;
    onAdd?(): void;
    RenderOption?(option: OptionProps): JSX.Element;
};

interface AutocompleteCoreInputProps {
    visible: boolean;
    withIcon?: boolean;
};

interface AutocompleteCoreIconProps {
    position: "start" | "end";
};

export type {
    AutocompleteCoreProps,
    AutocompleteCoreIconProps,
    AutocompleteCoreInputProps,
};