import styled from "styled-components";
import {OptionViewProps} from "./types";

const OptionView = styled.li<OptionViewProps>`
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    transition: .2s;

    background-color: ${props => props.active ? '#e0e0e0' : 'transparent'};

    &:hover {
        cursor: pointer;
        background-color: #e0e0e0;
    }
`;

const RenderOptionView = styled.div``;

const OptionText = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #444444;
    text-transform: capitalize;
`;

export {
    OptionView,
    RenderOptionView,
    OptionText,
};