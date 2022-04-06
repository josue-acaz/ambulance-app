import styled from "styled-components";
import { colors } from "../../design/colors";

const NavbarView = styled.header`
    background: #ffffff;
    grid-area: header;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
`;

const CollapseButton = styled.button`
    border: none;
    height: 30px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }

    .icon {
        font-size: 25px;
        color: #444444;
    }
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    height: 50px;
    width: 50px;
    object-fit: contain;
    margin-left: 5px;
`;

const DrawerContent = styled.div`
    width: 350px;
`;

const Profile = styled.div`
    width: 100%;
    height: auto;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileCircle = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee;
`;

const UserName = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: ${colors.PRIMARY};
`;

const Title = styled.p`
    font-size: 16px;
    color: #444444;
    font-weight: bold;
`;

const ProfilePhotoView = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
`;

const ProfilePhotoImage = styled.img`
    height: 35px;
    width: 35px;
    object-fit: cover;
`;

export {
    Logo,
    Title,
    NavItem,
    Profile,
    UserName,
    NavbarView,
    DrawerContent,
    ProfileHeader,
    ProfileCircle,
    CollapseButton,
    ProfilePhotoView,
    ProfilePhotoImage
};
