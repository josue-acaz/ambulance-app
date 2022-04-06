import React from "react";

// types
import {ListProps} from "./types";

// styles
import {
    ListView, 
    ListItemView,
    ListItemText,
    ListItemIcon,
    ListItemViewLink,
} from "./styles";

export default function List(props: ListProps) {
    const {options} = props;

    return(
        <ListView>
            {options.map(option => (
                option.route ? (
                    <ListItemViewLink to={option.route}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText>{option.text}</ListItemText>
                    </ListItemViewLink>
                ) : (
                    <ListItemView onClick={option.onClick}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText>{option.text}</ListItemText>
                    </ListItemView>
                )
            ))}
        </ListView>
    );
}