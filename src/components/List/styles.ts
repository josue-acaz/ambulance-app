import styled from "styled-components";
import {Link} from "react-router-dom";

const ListView = styled.div`
    width: 100%;
`;

const ListItemView = styled.div`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        cursor: pointer;
        background-color: #f2f2f2;
    }
`;

const ListItemViewLink = styled(Link)`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        background-color: #f2f2f2;
    }
`;

const ListItemText = styled.p`
    font-size: 12px;
    color: #444444;
`;

const ListItemIcon = styled.div`
    .icon {
        font-size: 20px;
        color: #444444;
    }
    display: flex;
    align-items: center;
    margin-right: 5px;
`;

export {
    ListView,
    ListItemView,
    ListItemText,
    ListItemIcon,
    ListItemViewLink,
};