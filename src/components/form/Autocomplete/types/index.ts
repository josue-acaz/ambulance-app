import {OptionProps} from "../core/Option/types";

interface ParamsProps {
    [key: string]: any;
};

interface OnOptionSelectedEvent {
    name: string;
    value: any;
};

interface AutocompleteRequestProps {
    [key: string]: any;
    page_size: number;
    page_number: number;
    text: string;
};

interface AutocompleteProps {
    name: string;
    value: string;
    requestUrl: string;
    optionField: string;
    placeholder?: string;
    icon?: any;
    error?: boolean;
    color?: string;
    params?: ParamsProps;
    headers?: any;
    coreViewStyle?: React.CSSProperties;
    inputViewStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    onInit?(event: OnOptionSelectedEvent): void;
    onAdd?(): void;
    onBlur?(event: any): void;
    onFocus?(event: any): void;
    onChange?(event: any): void;
    onOptionSelected(event: OnOptionSelectedEvent): void;
    RenderOption?(option: OptionProps): JSX.Element;
};

export type {
    AutocompleteProps,
    OnOptionSelectedEvent,
    AutocompleteRequestProps,
};