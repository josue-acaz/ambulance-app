import React, {useState} from "react";

// types
import {CollapsibleMenuProps} from "./types";

// components
import MenuItem from "./MenuItem";

// styles
import {
    CollapsibleMenuView,
    CollapsibleMenuItems,
    CollapseMenuBtn,
} from "./styles";

export default function CollapsibleMenu(props: CollapsibleMenuProps)
{
    const {label, options} = props;

    const [open, setOpen] = useState(false);

    function toggleOpen()
    {
        setOpen(!open);
    }

    return(
        <CollapsibleMenuView>
            <CollapseMenuBtn onClick={toggleOpen}>{label}</CollapseMenuBtn>
            {open && (
                <CollapsibleMenuItems>
                    {options.map((option, index) => (
                        <MenuItem 
                            key={index}
                            {...option} 
                            onSelect={() => {
                                option.onSelect();
                                toggleOpen();
                            }} 
                        />
                    ))}
                </CollapsibleMenuItems>
            )}
        </CollapsibleMenuView>
    );
}