import styled from "styled-components";
import { colors } from "../../../design/colors";

const EditableListItemView = styled.div`
    background-color: ${colors.PAPER};
    border-top: 1px solid #cccccc;
    padding-right: 10px;
`;

const ItemInputView = styled.div`
    width: 100%;
    height: 100%;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    background-color: ${colors.PAPER};
    color: ${colors.BLACK};

    &:focus{
        outline: none;
    }
`;

const ItemView = styled.div`
    display: flex;
    align-items: center;
`;

const ItemCheckbox = styled.div``;

export { EditableListItemView, Input, ItemView, ItemCheckbox, ItemInputView };