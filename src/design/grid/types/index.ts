interface GridContainerTSCProps {
    sidenavVisible: boolean;
};

interface GridContainerSidenavViewProps {
    toolbar?: boolean;
};

interface GridContentProps {
    isEditPage?: boolean;
    horizontalScrollView?: boolean; /**Usado nas listagens */
};

export type {
    GridContentProps,
    GridContainerTSCProps,
    GridContainerSidenavViewProps,
};