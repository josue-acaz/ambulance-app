import AircraftImage from "../../../../../../models/AircraftImage";

interface ListImagesProps {
    type: string;
    title: string;
    aircraft_id: string;
    images: Array<AircraftImage>;
};

export type {
    ListImagesProps,
};