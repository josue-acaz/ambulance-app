import React from "react";

// types
import { LegProps } from "./types";

// styles
import { LegView, Title, OriginText, DestinationText, DistanceText } from "./styles";

export default function Leg(props: LegProps) {
    const { type, title, origin, destination, distance } = props;

    return (
        <LegView type={type}>
            <Title>{title}</Title>
            <OriginText>{origin}</OriginText>
            <DestinationText>{destination}</DestinationText>
            <DistanceText>{distance} Km</DistanceText>
        </LegView>
    )
}
