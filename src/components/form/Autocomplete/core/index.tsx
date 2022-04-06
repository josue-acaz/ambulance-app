import React, {useState, useRef} from "react";

// types
import {AutocompleteCoreProps} from "./types";
import {OptionProps} from "./Option/types";

// hooks
import {useOutsideAutocomplete} from "./hooks/use-outside-autocomplete";

// components
import Option from "./Option";
import Spinner from "./Spinner";
import Skeleton from "./Skeleton";

// icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// styles
import {
    AutocompleteCoreView,
    AutocompleteCoreInputView,
    AutocompleteCoreInput,
    AutocompleteCoreIcon,
    CollapseOptionsButton,
    AutocompleteCollapseView,
    AutocompleteCoreOptions,
    NoResultsView,
    NoResultsText,
    AddNewBtn,
} from "./styles";

export default function AutocompleteCore(props: AutocompleteCoreProps) {
    const {value, visible, options, initializing, optionField, loading, placeholder, icon, color='#FFFFFF', error, coreViewStyle, inputViewStyle, inputStyle, onChange, onClick, onAdd, onBlur, onFocus, onOptionSelected, onChangeVisible, RenderOption} = props;

    const ref = useRef(null);
    const [cursor, setCursor] = useState<number>(0);

    const text = value ? value.toString().trim() : "";

    function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>)
    {
        const {key, code} = event;

        const last_index = options.length - 1;

        if(code === "ArrowUp" && cursor > 0)
        {
            setCursor(cursor - 1);
        } else if(code === "ArrowDown" && cursor < last_index)
        {
            setCursor(cursor + 1);
        }

        if(key === "Enter")
        {
            onOptionSelected(options[cursor]);
        }
    }

    useOutsideAutocomplete(ref, (isOutside: boolean) => {
        if(isOutside)
        {
            if(visible)
            {
                onChangeVisible(false);
            }
        }
    });

    return (
        <AutocompleteCoreView style={coreViewStyle} ref={ref}>
            <AutocompleteCoreInputView style={inputViewStyle}>
                {initializing ? <Skeleton /> : (
                    <AutocompleteCoreInput 
                        type="text" 
                        value={value} 
                        visible={visible}
                        onClick={onClick}
                        onChange={onChange}
                        onKeyUp={handleKeyUp}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        placeholder={placeholder}
                        style={inputStyle}
                        withIcon={!!icon}
                    />    
                )}
                {error && <span className="error">Este campo é obrigatório.</span>}
                {icon && (
                    <AutocompleteCoreIcon position="start">
                        {icon}
                    </AutocompleteCoreIcon>
                )}
                <CollapseOptionsButton>
                    {loading ? <Spinner /> : <ArrowDropDownIcon className="icon" />}
                </CollapseOptionsButton>
            </AutocompleteCoreInputView>
            {visible && (
                <AutocompleteCollapseView style={{backgroundColor: color}}>
                    <AutocompleteCoreOptions style={{backgroundColor: color}}>
                        {options.length > 0 ? (
                            options.map((option, index) => {

                                const isActive = cursor === index;

                                const optionProps: OptionProps = {
                                    ref: ref,
                                    cursor: cursor, 
                                    option: option,
                                    active: isActive, 
                                    optionField: optionField,
                                    onSelect: (option: OptionProps) => {
                                        onChangeVisible(false);
                                        onOptionSelected(option);
                                    },
                                    RenderOption: RenderOption,
                                };

                                return <Option key={index} {...optionProps} />;
                            })
                        ) : (
                            <NoResultsView>
                                <AddNewBtn onClick={onAdd}>Adicionar novo</AddNewBtn>
                                <NoResultsText>Nenhum resultado encontrado para "{text}"</NoResultsText>
                            </NoResultsView>
                        )}
                    </AutocompleteCoreOptions>
                </AutocompleteCollapseView>
            )}
        </AutocompleteCoreView>
    )
}
