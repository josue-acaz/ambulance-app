import styled from "styled-components";
import { DropzoneLabelProps } from "./types";

const DropzoneView = styled.div`
    width: 100%;
    display: flex;
    min-height: 400px;
    position: relative;

    @media screen and (max-width: 1200px)
    {
        min-height: 200px;
    }
`;

const DropzoneLabel = styled.label<DropzoneLabelProps>`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    color: #616161;
    border: ${props => props.active ? '3px dashed blue' : '3px dashed rgb(129, 129, 129)'};
    ${props => props.error ? `border: 3px dashed red` : ''};
    background-color: #ffffff;
    z-index: 10;

    .text-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.error ? 'red' : '#444444'};
    }   
`;

const DropzoneInput = styled.input`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    opacity: 0;// 0
    display: block;
    background-color: red;
    z-index: 5;
`;

export { DropzoneView, DropzoneLabel, DropzoneInput };