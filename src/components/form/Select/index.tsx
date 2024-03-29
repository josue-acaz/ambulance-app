import React, {useState, useEffect} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Option from "./Option";

// types
import {SelectProps, OptionProps} from "./types";

// icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// styles
import {
    SelectView,
    SelectInput,
    Span,
    CollapseView,
    CollapseOptions,
    InputElement,
    ErrorText,
    SkeletonLoader,
} from "./styles";

export default function Select(props: SelectProps) {
    const {name, value, error, options, initializing=false, style} = props;
    const [cursor, setCursor] = useState(0);
    const [open, setOpen] = useState(false);

    const currentOption = options.find(op => op.value === value);
    const [selectedOption, setSelectedOption] = useState<OptionProps>(currentOption ? currentOption : options[0]);

    function toggleOpen() {
        setOpen(!open);
    }

    function handleSelectedOption(option: OptionProps) {
        toggleOpen();
        props.onChange({target: {name, value: option}});
        setSelectedOption(option);
    }

    function handleKeyUp(e: any) {
        const current_option = options[cursor];

        if(!open) {
            props.onChange({target: {name, value: current_option}});
            setSelectedOption(current_option);
        }

        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor - 1);
        } else if (e.keyCode === 40 && cursor < options.length - 1) {
            setCursor(cursor + 1);
        }

        if(e.key === "Enter") {
            handleSelectedOption(current_option);
        }
    }

    return(
        <OutsideClickHandler onOutsideClick={() => {
            if(open) {
                setOpen(false);
            }
        }}>
            <SelectView>
                <SelectInput>
                    {initializing ? <SkeletonLoader variant="rectangular" animation="wave" /> : (
                        <InputElement 
                            style={style}
                            name={props.name} 
                            value={selectedOption ? selectedOption.label : ""} 
                            onClick={toggleOpen} 
                            onKeyUp={handleKeyUp} 
                            placeholder="Selecione..."
                            onChange={() => {}}
                        />
                    )}
                </SelectInput>
                <Span onClick={() => {
                    if(!initializing) {
                        toggleOpen();
                    }
                }}>
                    <ArrowDropDownIcon className="icon" />
                </Span>
                {open && options.length > 0 && (
                    <CollapseView>
                        <CollapseOptions>
                            {options.map((option, index) => (
                                <Option 
                                    key={index} 
                                    index={index}
                                    cursor={cursor}
                                    {...option} 
                                    onSelected={handleSelectedOption}
                                />
                            ))}
                        </CollapseOptions>
                    </CollapseView>
                )}
            </SelectView>
            {error && <ErrorText>Este campo é obrigatório.</ErrorText>}
        </OutsideClickHandler>
    );
}
