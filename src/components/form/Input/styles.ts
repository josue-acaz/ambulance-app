import styled from "styled-components";
import {AdormentProps, InputProps} from "./types";
import {colors} from "../../../design/colors";

const InputView = styled.div`
    position: relative;
`;

const MaskedValueView = styled.div`
    background-color: red;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const InputElement = styled.input<React.InputHTMLAttributes<HTMLInputElement> & InputProps>`
    height: 40px;
    width: 100%;
    color: #444444;
    z-index: 1;
    font-size: 14px;
    border: none;
    outline: none;
    border: 1px solid #c0c0c0;
    padding-left: ${props => props.adormentPosition === "start" ? "35px" : "10px"};
    padding-right: ${props => props.adormentPosition === "end" ? "35px" : "10px"};

    input[type="date"] {
        align-items: center;
        display: -webkit-inline-flex;
        font-family: monospace;
        padding-inline-start: 1px;
        cursor: default;
        overflow: hidden;
        padding: 0px;
    }

    ::-webkit-datetime-edit {}
    ::-webkit-datetime-edit-fields-wrapper {}
    ::-webkit-datetime-edit-text {}
    ::-webkit-datetime-edit-month-field {}
    ::-webkit-datetime-edit-day-field {}
    ::-webkit-datetime-edit-year-field {}
    ::-webkit-inner-spin-button {}
    ::-webkit-calendar-picker-indicator {
        font-size: 16px;
        color: #444444;
    }

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const Adorment = styled.span<AdormentProps>`
    position: absolute;
    top: 10px;
    ${props => props.position === "start" ? "left: 10px" : "right: 10px"};

    .icon {
        font-size: 24px;
        color: #444444;
    }

    &:hover {
        cursor: ${props => props.hover ? "pointer" : "default"};
    }
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: ${colors.ERROR};
`;

export {
    InputView, 
    InputElement, 
    MaskedValueView,
    Adorment, 
    ErrorText,
};