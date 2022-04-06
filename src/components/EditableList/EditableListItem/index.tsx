import React from "react";
import Checkbox from "@mui/material/Checkbox";

// types
import { EditableListItemProps } from "./types";

// styles
import { EditableListItemView, Input, ItemView, ItemCheckbox, ItemInputView } from "./styles";

export default function EditableListItem(props: EditableListItemProps)
{
    let { item, selected, onChange, onChangeChecked, onBlur } = props;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        item.value = event.target.value;
        onChange(item);
    }

    function handleChangeChecked(event: React.ChangeEvent<HTMLInputElement>, checked: boolean)
    {
        onChangeChecked(item, checked);
    }

    return(
        <EditableListItemView>
            <ItemView>
                <ItemCheckbox>
                    <Checkbox color="warning" checked={selected} onChange={handleChangeChecked} />
                </ItemCheckbox>
                <ItemInputView>
                    <Input onChange={handleChange} placeholder="Escreva o texto aqui..." onBlur={(e) => onBlur()} />
                </ItemInputView>
            </ItemView>
        </EditableListItemView>
    );
}
