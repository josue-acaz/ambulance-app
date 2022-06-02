interface SegmentProps {
    type: string;
    title: string;
    origin: string;
    destination: string;
    distance: number;
};

interface SegmentViewProps {
    type: string;
};

export type { SegmentProps, SegmentViewProps };