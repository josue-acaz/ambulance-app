interface EditableItemProps {
    index: number;
    text: string;
};

interface EditableListItemProps {
    selected: boolean;
    item: EditableItemProps;
    onChange(item: EditableItemProps): void;
    onChangeChecked(item: EditableItemProps, checked: boolean): void;
    onBlur(): void;
};

export type { EditableListItemProps, EditableItemProps };