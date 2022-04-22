import styled from "styled-components";
import { TabContentViewProps } from "./types";

const TabContentView = styled.div<TabContentViewProps>`
    padding: ${props => props.padding ? `${props.padding}px` : "10px"};
`;

const TabContainer = styled.div``;

export { TabContentView, TabContainer };