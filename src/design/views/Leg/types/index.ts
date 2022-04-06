interface LegProps {
    type: string;
    title: string;
    origin: string;
    destination: string;
    distance: number;
};

interface LegViewProps {
    type: string;
};

export type { LegProps, LegViewProps };