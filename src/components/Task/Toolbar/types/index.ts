interface ToolbarProps {
    title: string;
    subtitle?: string;
    padding?: string;
    numSelected: number;
    rowCount?: number;
    onAdd?(): void;
    onDelete?(): void;
    onSearch?(text: string): void;
    onSelectAllClick?(event: any): void;
};

interface ToolbarViewProps {
    activeSelection: boolean;
    padding?: string;
};

export type {ToolbarProps, ToolbarViewProps};