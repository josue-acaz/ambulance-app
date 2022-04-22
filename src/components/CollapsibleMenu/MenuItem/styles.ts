import styled from "styled-components";

const MenuItemView = styled.button`
    min-width: 200px;
    border: none;
    background-color: transparent;
    text-align: left;
    font-size: 14px;
    color: #444444;
    padding: 10px;

    &:hover {
        cursor: pointer;
        background-color: #f2f2f2;
    }
`;

const MenuItemLabel = styled.p``;

export {
    MenuItemView,
    MenuItemLabel,
};