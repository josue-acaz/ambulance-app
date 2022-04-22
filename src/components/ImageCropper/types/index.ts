interface ImageCropperProps {
    src: string;
    onChange(cropper: any): void;
    onCrop(): void;
};

export type { ImageCropperProps };