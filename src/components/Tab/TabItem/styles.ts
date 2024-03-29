import styled from "styled-components";
import { colors } from "../../../design/colors";
import { TabItemActiveBarProps } from "./types";

const TabItemView = styled.div<any>`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    padding-top: 5px;
    padding-bottom: 10px;
    &:hover {
        cursor: pointer;
        background-color: #eeeeee;
    }

    filter: opacity(${props => props.disabled ? '0.5' : '1'});
`;

const TabItemContent = styled.div`
    margin-top: 5px;
    margin-left: 10px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    margin-right: 5px;
`;

const Title = styled.p`
    font-size: 14px;
    color: #444444;
    font-weight: bold;

    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const Subtitle = styled.p`
    font-size: 16px;
    color: #666666;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const ActiveBar = styled.div<TabItemActiveBarProps>`
    position: absolute;
    height: 5px;
    width: 100%;
    bottom: 0px;
    background-color: ${props => props.active ? colors.PRIMARY : "#cccccc"};
`;

export {
    TabItemView, 
    TabItemContent,
    Title, 
    Subtitle,
    ActiveBar,
    Header,
    Icon,
};