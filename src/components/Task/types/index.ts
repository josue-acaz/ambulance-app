interface ActionProps {
    icon: any;
    label: string;
    rel?: string;
    target?: string;
    href?: string;
    className?: string;
    onClick?(id: string): void;
};

interface RenderComponentProps {
    value: any;
    name?: string;
    onBlur(event: any): void;
    onFocus(event: any): void;
    onChange?(event: any): void;
};

interface CellProps {
    value: any;
    name?: string;
    align?: string;
    color?: string;
    editable?: boolean;
    style?: React.CSSProperties;
    onChange?(event: any): void;
    RenderComponent?(props: RenderComponentProps): JSX.Element;
};

interface RowProps {
    id: string;
    cells: Array<CellProps>;
    hoverTitle?: string;
    disable_select?: boolean;
    hoverSelected?: boolean;
    actions?: Array<ActionProps>;
    onHoverClick?(): void;
};

interface TableHeadProps {
    key: string;
    value: string;
    color?: string;
    textColor?: string;
};

interface TableCellProps {
    padding?: string;
    align?: string;
};

interface TableRowProps {
    selected?: boolean;
};

interface TableHeadCellProps {
    textColor?: string;
    align?: string;
    padding?: string;
    fixedHeader?: boolean;
};

interface TableProps {
    color?: string;
    headStyle?: React.CSSProperties;
    rows: Array<RowProps>;
    selectable?: boolean;
    fixedHeader?: boolean;
    selecteds: Array<string>;
    withActions?: boolean;
    headLabels: Array<TableHeadProps>;
    onEditRow?(id: string): void;
    onChangeSelecteds(selecteds: Array<string>): void;
};

interface TableHeadComponentProps {
    color?: string;
    style?: React.CSSProperties;
    rowCount: number;
    selectable: boolean;
    numSelected: number;
    fixedHeader?: boolean;
    withActions?: boolean;
    headLabels: Array<TableHeadProps>;
    onSelectAllClick(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void;
};

interface TableRowComponentProps {
    row: RowProps;
    selected: boolean;
    selectable: boolean;
    withActions?: boolean;
    hoverTitle?: string;
    hoverSelected?: boolean;
    disable_select?: boolean;
    actions?: Array<ActionProps>;
    onEdit?(id: string): void;
    onClick(event: any, id: string): void;
    onHoverClick?(): void;
};

interface TableRowViewProps {
    selected?: boolean;
    enableHover?: boolean;
    hoverSelected?: boolean;
};

interface EditableCellProps {
    value: any;
    name?: string;
    editable?: boolean;
    onChange?(event: any): void;
    RenderComponent?(props: RenderComponentProps): JSX.Element;
};

interface EditableCellViewProps {
    editing: boolean;
    isCustomComponent: boolean;
};

export type {
    RowProps,
    TableProps, 
    TableRowProps,
    TableHeadProps,
    TableCellProps, 
    TableRowViewProps,
    TableHeadCellProps,
    TableRowComponentProps,
    TableHeadComponentProps,
    EditableCellProps,
    EditableCellViewProps,
};