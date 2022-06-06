import styled from "styled-components";
import {OptionViewProps} from "./types";

const OptionView = styled.li<OptionViewProps>`
    height: 45px;
    display: flex;
    align-items: center;
    background-color: ${props => props.active ? "#f2f2f2" : "#ffffff"};
    padding-left: 15px;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }
`;

const OptionText = styled.p`
    font-size: 12px;
    color: #444444;

    @media screen and (max-width: 1200px) {
        font-size: 10px;
    }
`;

export {OptionView, OptionText};