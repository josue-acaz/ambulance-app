import React from "react";
import { isMobile } from "react-device-detect";

// components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

// styles
import { LayoutView } from "./styles";

// types
import { LayoutProps } from "./types";

class PropsType {
    minimized: boolean = false;
};

class Layout extends React.Component<LayoutProps, PropsType>
{
    state: PropsType = new PropsType();

    constructor(props: any)
    {
        super(props);
        this.toggleMinimized = this.toggleMinimized.bind(this);
    }

    componentDidMount()
    {
        if(isMobile)
        {
            this.setState({ minimized: true });
        }
    }

    toggleMinimized()
    {
        this.setState({ minimized: !this.state.minimized });
    }

    render()
    {
        return(
            <LayoutView minimized={this.state.minimized}>
                <Navbar auth_user={this.props.auth_user} onCollapse={this.toggleMinimized} onSettings={this.props.onSettings} />
                <Content>
                    {this.props.children}
                </Content>
                <Sidebar 
                    minimized={this.state.minimized} 
                    options={this.props.sidebarOptions} 
                    onOptionClick={() => {
                        if(isMobile) {
                            this.toggleMinimized();
                        }
                    }} 
                />
            </LayoutView>
        );
    }
}

export default Layout;