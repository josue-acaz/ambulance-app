import React from "react";

// types
import {WarningComponentProps} from "./types";

// styles
import {
    WarningComponentView,
    WarningView,
    WarningText,
} from "./styles";

export default function WarningComponent(props: WarningComponentProps) {
    const { warnings } = props;

    return (
        <WarningComponentView>
            {warnings.length > 0 && (
                <WarningView>
                    <WarningText>
                        {warnings.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </WarningText>
                </WarningView>
            )}
        </WarningComponentView>
    )
}
