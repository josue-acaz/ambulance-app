import React from "react";
import { SpinnerProps } from "./types";

import {
    CircleOne,
    CircleTwo,
    CircularView,
} from "./styles";

const ProcessingSpinner = (props: SpinnerProps) => (
    <CircularView size={props.size}>
        <CircleOne color={props.color} />
        <CircleTwo color={props.color} />
    </CircularView>
);

export default ProcessingSpinner;