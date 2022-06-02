import AmbulanceImage from "../../../../../../models/AmbulanceImage";

interface ListImagesProps {
    title: string;
    ambulance_id: string;
    images: Array<AmbulanceImage>;
};

export type {
    ListImagesProps,
};