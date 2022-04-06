import React from "react";

// types
import {ErrorComponentProps} from "./types";

// styles
import {
    ErrorComponentView,
    ErrorView,
    ErrorText,
} from "./styles";

export default function ErrorComponent(props: ErrorComponentProps) {
    const {errors} = props;

    return (
        <ErrorComponentView>
            {errors.length > 0 && (
                <ErrorView>
                    <ErrorText>
                        {errors.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </ErrorText>
                </ErrorView>
            )}
        </ErrorComponentView>
    )
}
