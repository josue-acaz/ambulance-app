interface GridContainerTSCProps {
    sidenavVisible: boolean;
};

interface GridContainerSidenavViewProps {
    toolbar?: boolean;
};

interface GridContentProps {
    horizontalScrollView?: boolean; /**Usado nas listagens */
};

export type {
    GridContentProps,
    GridContainerTSCProps,
    GridContainerSidenavViewProps,
};