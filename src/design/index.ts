import styled from "styled-components";
import { PageViewProps, ButtonProps, ButtonTextProps } from "./types";
import { colors } from "../design/colors";

const Label = styled.label`
    font-size: 12px;
    font-weight: bold;
    color: #333333;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.BLACK};
`;

const Subtitle = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: ${colors.BLACK};
`;

const Button = styled.button<ButtonProps>`
    width: auto;
    min-width: 100px;
    border: none;
    background-color: ${props => props.disabled ? colors.DISABLED : props.color ? props.color : colors.PRIMARY};
    color: ${props => props.textColor ? props.textColor : colors.BLACK};
    font-weight: normal;
    text-align: center;
    height: 35px;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        filter: brightness(.9);
        cursor: pointer;
    }

    @media screen and (max-width: 1200px)
    {
        width: 100%;
    }
`;

const ButtonText = styled.p<ButtonTextProps>`
    font-size: 14px;
    color: ${props => props.color ? props.color : colors.BLACK};
`;

const GoBackButton = styled.button`
    border: none;
    background-color: transparent;
    background-color: #ebebeb;
    border-radius: .5rem;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background-color: #cfcfcf;
    }

    .icon {
        color: #444444;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 10px;
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: #f74d4d;
`;

const PageView = styled.div<PageViewProps>`
    background-color: #ffffff;
    box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);
    transition: box-shadow 1s;
    border-radius: 0px;
    height: auto;
    padding: ${props => props.padding ? props.padding : 0}px;

    @media screen and (max-width: 1200px)
    {
        padding-bottom: 80px;
    }
`;

const SwitchHorizontalView = styled.div`
    display: flex;
    align-items: center;
`;

const PopUpCloseButton = styled.button`
    border: none;
    padding: 0;
    font-size: 12px;
    color: #444444;
    background-color: transparent;
    text-decoration: underline;
    cursor: pointer;
`;

export {
    Label,
    Title,
    Button,
    FormGroup,
    ErrorText,
    PageView,
    GoBackButton,
    ButtonText,
    Subtitle,
    SwitchHorizontalView,
    PopUpCloseButton,
};