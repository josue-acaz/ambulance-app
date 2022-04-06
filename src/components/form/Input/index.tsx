import React, {useEffect} from "react";

// types
import {InputProps} from "./types";

// styles
import {
    InputView, 
    InputElement,
    Adorment,
    ErrorText,
} from "./styles";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & InputProps) {
    const {adorment, adormentPosition = "end", error, onAdormentClick} = props;
    const hover = !!onAdormentClick;

    return(
        <InputView>
            {adorment && (
                <Adorment className="adorment" hover={hover} position={adormentPosition} onClick={() => {
                    if(onAdormentClick) {
                        onAdormentClick();
                    }
                }}>
                    {adorment}
                </Adorment>
            )}
            <InputElement className="input" {...props} />
            {error && <ErrorText>Este campo é obrigatório.</ErrorText>}
        </InputView>
    );
}
