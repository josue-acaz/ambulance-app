import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

// types
import { EditableListItemProps } from "./types";

// styles
import { EditableListItemView, Input, ItemView, ItemCheckbox, ItemInputView } from "./styles";

export default function EditableListItem(props: EditableListItemProps)
{
    let { item, selected, onChange, onChangeChecked, onBlur } = props;
    const [value, setValue] = useState(item.text ? item.text : "");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        item.text = event.target.value;
        setValue(item.text);
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
                    <Input value={value} onChange={handleChange} placeholder="Escreva o texto aqui..." onBlur={(e) => onBlur()} />
                </ItemInputView>
            </ItemView>
        </EditableListItemView>
    );
}
