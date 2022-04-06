interface EditableListProps {
    title: string;
    onChange(items: Array<string>): void;
};

interface EditableListHeaderProps {
    activeSelection: boolean;
};

export type { EditableListProps, EditableListHeaderProps };