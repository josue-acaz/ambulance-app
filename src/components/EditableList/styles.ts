import styled from "styled-components";
import { colors } from "../../design/colors";
import { EditableListHeaderProps } from "./types";

const EditableListView = styled.div`
    
`;

const Title = styled.p`
    font-size: 14px;
    font-weight: bold;
`;

const EditableListHeader = styled.div<EditableListHeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: ${props => props.activeSelection ? "rgb(255, 226, 236)" : colors.PAPER};

    ${Title}{
        color: ${props => props.activeSelection ? "#f50057" : colors.BLACK};
    }
`;

const EditableListContent = styled.div`
`;

const AddButton = styled.button`
    border: none;
    height: auto;
    width: 50px;
    padding: 5px;
    background-color: #ebebeb;
    border-radius: .2rem;
    font-size: 14px;
    color: #444444;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
        color: #666666;
        font-size: 20px;
    }

    &:hover {
        cursor: pointer;
        background-color: #aaaaaa;
    }

    @media screen and (max-width: 1200px)
    {
        width: auto;
    }
`;

const DeleteButton = styled.button`
    border: none;
    height: auto;
    width: 60px;
    padding: 5px;
    background-color: transparent;
    border-radius: .2rem;
    font-size: 14px;
    color: #444444;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background-color: rgb(252, 207, 223);
    }

    .icon {
        font-size: 20px;
        color: #666666;
    }
    
    &:hover {
        cursor: pointer;
        .icon {
            color: ${colors.ERROR};
        }
    }

    @media screen and (max-width: 1200px)
    {
        width: auto;
    }
`;

export { EditableListView, EditableListHeader, EditableListContent, AddButton, DeleteButton, Title };