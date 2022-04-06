import React from "react";

// components
import NavItem from "./NavItem";

// styles
import { SidebarView } from "./styles";

// types
import { SidebarProps } from "./types";

class Sidebar extends React.Component<SidebarProps>
{
    constructor(props: any)
    {
        super(props);
    }

    isActive = (to: string) => to === "";

    render()
    {
        return(
            <SidebarView {...this.props} minimized={this.props.minimized}>
                <ul>
                    {this.props.options.map((option, index) => (
                        <NavItem 
                            key={index} 
                            {...option} 
                            active={this.isActive(option.to)} 
                            onClick={this.props.onOptionClick}
                        />
                    ))}
                </ul>
            </SidebarView>
        );
    }
}

export default Sidebar;