import React from "react";
import { colors } from "../../../design/colors";

// components
import ProcessingSpinner from "../ProcessingSpinner";

// types
import { ProcessingProps } from "./types";

// styles
import {
    ProcessingView, 
    ProcessingContent,
    Feedback, 
    Title, 
    Message,
    Spinner,
} from "./styles";

const ProcessingLoader = (props: ProcessingProps) => (
    <ProcessingView>
        <ProcessingContent>
            <Spinner>
                <ProcessingSpinner size={50} color={colors.PRIMARY} />
            </Spinner>
            <Feedback>
                <Title>{props.title}</Title>
                <Message>{props.msg}</Message>
            </Feedback>
        </ProcessingContent>
    </ProcessingView>
);

export default ProcessingLoader;