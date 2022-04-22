import styled from "styled-components";
import { Button } from "../../../../../design";
import { colors } from "../../../../../design/colors";

const ListImagesView = styled.div``;

const ListImagesContainer = styled.div`
    display: flex;
    align-items: center;
    overflow-x: auto;
`;

const ListImagesHeader = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const ListImagesTitle = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.BLACK};
`;

const AddImageBtn = styled(Button)``;

const SelectedItemsHeader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(255, 226, 236);
    padding-left: 5px;
    padding-right: 5px;
`;

const SelectedItemsTitle = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #f50057;
`;

const RemoveSelectedsBtn = styled.button`
    border: none;
    padding: none;
    background: transparent;

    .icon {
        color: #444444;
    }

    &:hover {
        cursor: pointer;

        .icon {
            color: #f50057;
        }
    }
`;

export {
    ListImagesView,
    ListImagesTitle,
    ListImagesHeader,
    ListImagesContainer,
    AddImageBtn,
    SelectedItemsHeader,
    SelectedItemsTitle,
    RemoveSelectedsBtn,
};