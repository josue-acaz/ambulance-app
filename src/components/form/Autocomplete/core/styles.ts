import styled from "styled-components";
import { AutocompleteCoreIconProps, AutocompleteCoreInputProps } from "./types";
import { colors } from "../../../../design/colors";

const AutocompleteCoreView = styled.div`
    position: relative;

    span.error {
        font-size: 12px;
        color: #f74d4d;
    }

    input[type="text"], [type="number"] { 
        outline: none;
    }
`;

const AutocompleteCoreInputView = styled.div`
    position: relative;

    /**Alterar dimensões do skeleton aqui */
    .input-skeleton {
        height: 100%;
    }
`;

const AutocompleteCoreInput = styled.input<AutocompleteCoreInputProps>`
    width: 100%;
    font-size: 14px;
    color: #444444;
    border: 1px solid #c0c0c0;
    border-radius: 0rem;
    cursor: pointer;
    background-color: transparent;
    transition: .2s;
    z-index: 1;
    height: 40px;
    padding-left: ${props => props.withIcon ? "35px" : "10px"};
    padding-right: 2.2rem;
    text-transform: capitalize;

    ${props => props.visible ? `
        border-bottom-color: #ffffff;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    ` : ``};
`;

const AutocompleteCoreIcon = styled.span<AutocompleteCoreIconProps>`
    position: absolute;
    top: 10px;

    ${props => props.position === "start" ? "left: 10px;" : "right: 0;"}

    .icon {
        color: #444444;
        font-size: 20px;
    }
`;

const CollapseOptionsButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const AutocompleteCollapseView = styled.span`
    position: absolute;
    transition: .2s;
    height: auto;
    background-color: #ffffff;
    width: 100%;
    border: 1px solid #c0c0c0;
    border-top: none;
    top: 39px;
    transition: .2s;
    z-index: 55;
    padding-bottom: 5px;
    padding-top: 5px;
`;

const AutocompleteCoreOptions = styled.ul`
    height: auto;
    max-height: 400px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    &::-webkit-scrollbar-thumb {
        background: #888; 
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`;

const NoResultsView = styled.div`
    margin-left: 10px;
`;

const NoResultsText = styled.p`
    font-size: 14px;
    color: #bebebe;
`;

const AddNewBtn = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.BLUE};

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export {
    AutocompleteCoreView,
    AutocompleteCoreInputView,
    AutocompleteCoreInput,
    AutocompleteCoreIcon,
    CollapseOptionsButton,
    AutocompleteCollapseView,
    AutocompleteCoreOptions,
    NoResultsView,
    NoResultsText,
    AddNewBtn,
};