interface UploadProps {
    open: boolean;
    fileName: string;
    requestUrl: string;
    params?: object;
    onUploaded(): void;
    onCancel(): void;
};

export type { UploadProps };