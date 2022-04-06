interface AlertProps {
    open: boolean;
    title: string;
    subtitle?: string;
    theme: "default" | "success" | "error";
    onConfirm(): void;
    onCancel(): void;
};

export type { AlertProps };