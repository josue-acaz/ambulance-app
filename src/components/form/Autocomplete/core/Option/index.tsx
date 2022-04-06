import React, {useEffect, useRef} from "react";

// types
import {OptionProps} from "./types";

// styles
import {
    OptionView,
    RenderOptionView,
    OptionText,
} from "./styles";

export default function Option(props: OptionProps) {
    const {ref, active, option, optionField, onSelect, RenderOption} = props;

    useEffect(() => {
        if(ref)
        {
            if(ref.current)
            {
                if(active)
                {
                    ref.current.focus();
                    ref.current.scrollIntoView({
                        behavior: "smooth", 
                        block: "nearest", 
                        inline: "start",
                    });
                }
                else
                {
                    ref.current.blur();
                }
            }
        }
    }, [ref]);
    
    return (
        <OptionView active={active} onClick={() => onSelect(option)}>
            <RenderOptionView>
                {RenderOption ? <RenderOption /> : <OptionText>{option[optionField]}</OptionText>}
            </RenderOptionView>
        </OptionView>
    )
}
