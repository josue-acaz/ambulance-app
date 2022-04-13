import { EditableItemProps } from "../EditableListItem/types";

interface EditableListProps {
    title: string;
    value: Array<EditableItemProps>;
    onChange(items: Array<EditableItemProps>): void;
};

interface EditableListHeaderProps {
    activeSelection: boolean;
};

export type { EditableListProps, EditableListHeaderProps };