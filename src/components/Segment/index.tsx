import React from "react";

// types
import { SegmentProps } from "./types";

// styles
import { SegmentView, Title, OriginText, DestinationText, DistanceText } from "./styles";

export default function Segment(props: SegmentProps) {
    const { type, title, origin, destination, distance } = props;

    return (
        <SegmentView type={type}>
            <Title>{title}</Title>
            <OriginText>{origin}</OriginText>
            <DestinationText>{destination}</DestinationText>
            <DistanceText>{distance === 0 ? "-" : distance} Km</DistanceText>
        </SegmentView>
    )
}
