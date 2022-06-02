import AmbulanceImage from "../../../../../../../models/AmbulanceImage";

interface ImageItemProps {
    index: number;
    checked: boolean;
    loading?: boolean;
    data: AmbulanceImage;
    style?: React.CSSProperties;
    onCheck(index: number): void;
    onDoc(data: AmbulanceImage, checked: boolean): void;
};

export type {
    ImageItemProps,
};