import styled from "styled-components";
import { colors } from "../../design/colors";
import { SegmentViewProps } from "./types";

const SegmentView = styled.div<SegmentViewProps>`
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 10px;
    background-color: #ffffff;
    opacity: ${props => props.type === "trip" ? 1 : 0.65};
`;

const Title = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: ${colors.BLACK};
`;

const OriginText = styled.p`
    font-size: 10px;
    color: #777777;
`;

const DestinationText = styled.p`
    font-size: 12px;
    color: #444444;
    font-weight: bold;
`;

const DistanceText = styled.p`
    color: ${colors.CHECK};
`;

export { SegmentView, Title, OriginText, DestinationText, DistanceText };