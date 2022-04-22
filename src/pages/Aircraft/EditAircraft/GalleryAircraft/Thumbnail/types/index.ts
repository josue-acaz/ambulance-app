interface ThumbnailProps {
    url?: string;
    title: string;
    loading: boolean;
    aircraft_id: string;
    className?: string;
    type: "thumbnail" | "seating_map";
    onChange(): void;
};

export type {
    ThumbnailProps,
};