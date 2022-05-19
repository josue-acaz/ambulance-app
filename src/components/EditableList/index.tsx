import React, { useState, useEffect } from "react";

// types
import { EditableListProps } from "./types";
import { EditableItemProps } from "./EditableListItem/types";

// components
import Tooltip from "@mui/material/Tooltip";
import EditableListItem from "./EditableListItem";

// icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// styles
import { EditableListView, EditableListHeader, EditableListContent, Title, AddButton, DeleteButton } from "./styles";

export default function EditableList(props: EditableListProps)
{
    const [items, setItems] = useState<Array<EditableItemProps>>(props.value ? props.value : []);
    const [selecteds, setSelecteds] = useState<Array<number>>([]);

    const activeSelection = selecteds.length > 0;

    function handleAdd(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();
        setItems(items => [...items, { text: "", index: items.length, checked: false }]);
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();
        let _items = items;

        for (let index = 0; index < selecteds.length; index++) {
            const selectedIndex = selecteds[index];
            _items = _items.filter(item => item.index !== selectedIndex);
        }

        setItems(_items);
        setSelecteds([]);
    }

    function handleChange(item: EditableItemProps)
    {
        let _items = items;
        _items[item.index].text = item.text;
        setItems(_items);
    }

    function handleChangeChecked(item: EditableItemProps, checked: boolean)
    {
        if(checked)
        {
            setSelecteds(selecteds => [...selecteds, item.index]);
        }
        else
        {
            setSelecteds(selecteds.filter(i => i !== item.index));
        }
    }

    function handleBlur()
    {
        props.onChange(items);
    }

    const isSelected = (index: number) => selecteds.findIndex(i => i === index) !== -1;

    return(
        <EditableListView>
            <EditableListHeader activeSelection={activeSelection}>
                <Title>{props.title + items.length}</Title>
                
                {activeSelection ? (
                    <Tooltip title="Remover selecionado(s)">
                        <DeleteButton onClick={handleDelete}>
                            <DeleteIcon className="icon" />
                        </DeleteButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Adicionar">
                        <AddButton onClick={handleAdd}>
                            <AddIcon className="icon" />
                        </AddButton>
                    </Tooltip>
                )}

            </EditableListHeader>
            <EditableListContent>
                {items.map((item) => <EditableListItem key={item.index} item={item} selected={isSelected(item.index)} onChange={handleChange} onChangeChecked={handleChangeChecked} onBlur={handleBlur} />)}
            </EditableListContent>
        </EditableListView>
    );
}