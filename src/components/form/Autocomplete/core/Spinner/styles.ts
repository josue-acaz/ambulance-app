import styled from "styled-components";

const SpinnerView = styled.div`
    margin: auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: .3em solid rgba(255, 255, 255, 0.2);
    border-right: .3em solid rgba(255, 255, 255, 0.2);
    border-bottom: .3em solid rgba(255, 255, 255, 0.2);
    border-left: .3em solid #666666;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;

    &:after {
        border-radius: 50%;
        width: 2em;
        height: 2em;
    }

    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
        @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`;

export {
    SpinnerView,
};