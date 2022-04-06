import styled from "styled-components";
import { SpinnerProps } from "./types";

/**
 * Circular Progress
 */
const CircularView = styled.div<SpinnerProps>`
    box-sizing: border-box;
    width: ${props => props.size ? props.size : 50}px;
    height: ${props => props.size ? props.size : 50}px;
    border-radius: 100%;
    position: relative;
`;

const CircleOne = styled.div<SpinnerProps>`
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(48px / 10) solid transparent;
    border-top-color: ${props => props.color ? props.color : "#ffffff"};
    animation: half-circle-spinner-animation 1s infinite;

    @keyframes half-circle-spinner-animation {
      0% {
        transform: rotate(0deg);

      }
      100%{
        transform: rotate(360deg);
      }
    }
`;

const CircleTwo = styled.div<SpinnerProps>`
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(48px / 10) solid transparent;
    border-bottom-color: ${props => props.color ? props.color : "#ffffff"};
    animation: half-circle-spinner-animation 1s infinite;

    @keyframes half-circle-spinner-animation {
      0% {
        transform: rotate(0deg);

      }
      100%{
        transform: rotate(360deg);
      }
    }
`;

export {
    CircleOne,
    CircleTwo,
    CircularView,
};