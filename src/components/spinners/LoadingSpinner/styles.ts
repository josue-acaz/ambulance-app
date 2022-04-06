import styled from "styled-components";
import { SpinnerProps } from "./types";

const LoadingView = styled.div<SpinnerProps>`
    display: inline-block;
    width: ${props => props.size ? props.size : 80}px;
    height: ${props => props.size ? props.size : 80}px;

    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid ${props => props.color ? props.color : "#fff"};
        border-color: ${props => props.color ? props.color : "#fff"} transparent ${props => props.color ? props.color : "#fff"} transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export { LoadingView };