import TransportSegment from "../../../../../models/TransportSegment";

interface RouteMapProps {
    modal_number: number;
    transport_segments: Array<TransportSegment>;
    onUpdate(): void;
    onCancel(): void;
};

interface ModalViewProps {
    open: boolean;
};

export type { RouteMapProps, ModalViewProps };