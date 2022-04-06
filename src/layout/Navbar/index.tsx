import React from "react";
import { AuthContext } from "../../contexts/auth/auth.context";

// images
import logo from "../../assets/img/logo.png";
import user from "../../assets/img/user.png";

// components
import List from "../../components/List";
import Drawer from "@mui/material/Drawer";

// styles
import {
    Logo,
    Title,
    Profile,
    NavItem,
    UserName,
    NavbarView, 
    CollapseButton,
    DrawerContent,
    ProfileCircle,
    ProfileHeader,
    ProfilePhotoView,
    ProfilePhotoImage
} from "./styles";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// types
import { NavbarProps } from "./types";
import { ListItemProps } from "../../components/List/types";

class PropsType {
    open: boolean = false;
};

class Navbar extends React.Component<NavbarProps, PropsType>
{
    state: PropsType = new PropsType();
    static contextType = AuthContext;

    constructor(props: any)
    {
        super(props);
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    options: Array<ListItemProps> = [
        {
            text: "Preferências",
            icon: <SettingsIcon className="icon" />,
            onClick: () => {},
        },
        {
            text: "Sair",
            icon: <ExitToAppIcon className="icon" />,
            onClick: () => this.context.signOut(),
        }
    ];

    toggleOpen()
    {
        this.setState({ open: !this.state.open });
    }

    render()
    {
        return(
            <NavbarView>
                <NavItem>
                    <CollapseButton onClick={this.props.onCollapse}>
                        <MenuIcon className="icon" />
                    </CollapseButton>
                    <Logo src={logo} alt="logo" />
                </NavItem>
                <ProfilePhotoView onClick={this.toggleOpen}>
                    <ProfilePhotoImage src={user} />
                </ProfilePhotoView>
                <Drawer anchor="right" open={this.state.open} onClose={this.toggleOpen}>
                    <DrawerContent>
                        <Profile>
                            <ProfileHeader>
                                <ProfileCircle>
                                    <UserName>{this.props.auth_user.name_initials}</UserName>
                                </ProfileCircle>
                            </ProfileHeader>
                            <Title>Sistema de Cotações v1.0</Title>
                        </Profile>
                        <List options={this.options} />
                    </DrawerContent>
                </Drawer>
            </NavbarView>
        );
    }
}

export default Navbar;