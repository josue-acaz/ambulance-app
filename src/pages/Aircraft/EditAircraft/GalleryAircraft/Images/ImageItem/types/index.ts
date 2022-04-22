import AircraftImage from "../../../../../../../models/AircraftImage";

interface ImageItemProps {
    index: number;
    checked: boolean;
    loading?: boolean;
    data: AircraftImage;
    style?: React.CSSProperties;
    onCheck(index: number): void;
    onDoc(data: AircraftImage, checked: boolean): void;
};

export type {
    ImageItemProps,
};