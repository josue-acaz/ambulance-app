interface onChangeEvent {
    name?: string;
    file: File;
    url: string;
};

interface DropzoneProps {
    name?: string;
    file: File | null;
    onChange(event: onChangeEvent): void;
};

interface DropzoneLabelProps {
    active: boolean;
    error?: boolean;
};

export type { DropzoneProps, DropzoneLabelProps };