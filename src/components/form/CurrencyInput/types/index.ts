interface EventTarget {
    name: string;
    value: number;
};

interface ChangeEvent {
    target: EventTarget;
};

interface CurrencyInputProps {
    name: string;
    value: number;
    placeholder?: string;
    error?: boolean;
    onChange(event: ChangeEvent): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement, Element>): void;
};

export type { CurrencyInputProps, ChangeEvent };