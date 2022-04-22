import React from "react";

// types
import {MenuItemProps} from "./types";

// styles
import {
    MenuItemView,
    MenuItemLabel,
} from "./styles";

export default function MenuItem(props: MenuItemProps)
{
    const {label, onSelect} = props;

    return(
        <MenuItemView onClick={onSelect}>
            <MenuItemLabel>{label}</MenuItemLabel>
        </MenuItemView>
    );
}