import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// components
import IconButton from "@mui/material/IconButton";

// styles
import { 
    NavItemLink,
    NavItemView,
    NavItemLeft,
    NavItemSubmenuView,
} from "./styles";

// icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// types
import { NavItemProps } from "./types";

const NavItemAction: React.FC<NavItemProps> = (props) => (
    props.childs.length > 0 ? <div className="nav-item-action">{props.children}</div> : <NavItemLink to={props.to} onClick={props.onClick}>{props.children}</NavItemLink>
);

export default function NavItem(props: NavItemProps)
{
    const location = useLocation();
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }
    
    const expansive = props.childs.length > 0;
    const isActive = (to: string) => to === location.pathname;

    return(
        <NavItemAction {...props}>
            <NavItemView active={false} onClick={toggleOpen}>
                <NavItemLeft>
                    <div className="col-item">
                        <div className="to-center">
                            {props.icon}
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="to-center">
                            <p className="label">{props.label}</p>
                        </div>
                    </div>
                </NavItemLeft>
                {expansive && (
                    <div className="right">
                        <IconButton size="small" onClick={toggleOpen}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </div>
                )}
            </NavItemView>
            {expansive && open && (
                <NavItemSubmenuView>
                    {props.childs.map((option, index) => <NavItem key={index} {...option} active={isActive(option.to)} onClick={props.onClick} />)}
                </NavItemSubmenuView>
            )}
        </NavItemAction>
    );
}