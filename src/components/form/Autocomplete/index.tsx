import React, {useState, useEffect} from "react";
import api from "../../../api";

// types
import {OptionProps} from "./core/Option/types";
import {AutocompleteProps, AutocompleteRequestProps, OnOptionSelectedEvent} from "./types";

// components
import AutocompleteCore from "./core";

export default function Autocomplete(props: AutocompleteProps) {
    const {
        name, 
        value, 
        requestUrl, 
        optionField, 
        placeholder, 
        color,
        icon, 
        error, 
        params, 
        headers,
        coreViewStyle,
        inputViewStyle, 
        inputStyle,
        onInit,
        onAdd,
        onBlur,
        onFocus,
        onChange,
        onOptionSelected,
        RenderOption, 
    } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [initializing, setInitializing] = useState<boolean>(true);

    const [autocomplete, setAutocomplete] = useState<AutocompleteRequestProps>({
        page_number: 10,
        page_size: 1,
        text: "",
        ...params,
    });

    const [_value, setValue] = useState<string>(value);
    const [options, setOptions] = useState<Array<OptionProps>>([]);
    const [visible, setVisible] = useState<boolean>(false);

    async function init()
    {
        try {
            const response = await api.get(requestUrl, {
                params: autocomplete,
            });

            const options = response.data.data;
            const id = autocomplete.id;

            if(id)
            {
                const option = options[0];

                // Configurar valor da opção
                const initEvent: OnOptionSelectedEvent = {
                    name,
                    value: {
                        option,
                        cursor: 0,
                        optionField,
                    },
                };

                if(onInit)
                {
                    onInit(initEvent);
                    if(optionField)
                    {
                        setValue(option[optionField]);
                    }
                }

                // Remover inicialização com id
                autocomplete.id = "";
                setAutocomplete(autocomplete);
            }

            setInitializing(false);
        } catch (error) {
            // Remover inicialização com id
            autocomplete.id = "";
            setAutocomplete(autocomplete);
            
            setInitializing(false);
            console.error(error);
        }
    }

    async function index(value: string)
    {
        setLoading(true);

        try {
            let autocomplete_params = autocomplete;
            autocomplete_params.text = value.trim();

            if(params !== undefined && params !== null)
            {
                Object.keys(params).forEach(key => {
                    autocomplete_params[key] = params[key];
                });
            }

            const response = await api.get(requestUrl, { params: autocomplete });
            const options = response.data.data;
            setOptions(options);

            setLoading(false);
            setVisible(true);
        } catch (error) {
            setLoading(false);
            setVisible(true);
            console.error(error);
        }
    }

    async function handleClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>)
    {
        const value = "";

        if(_value)
        {
            setValue(value);
            
            let event: OnOptionSelectedEvent = {
                name,
                value,
            };

            onOptionSelected(event);
        }

        setVisible(true);
        
        if(requestUrl)
        {
            await index(value);
        }
    }

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        const {value} = event.target;
        setValue(value);
        
        if(requestUrl)
        {
            await index(value);
        }

        if(onChange)
        {
            onChange(event);
        }
    }

    function handleChangeVisible(visible: boolean)
    {
        setVisible(visible);
    }

    function handleOptionSelected(option: any)
    {
        if(optionField)
        {
            const text = option[optionField];
            setValue(text);
        }

        let event: OnOptionSelectedEvent = {
            name,
            value: option,
        };

        onOptionSelected(event);
        setVisible(false);
    }

    function handleAdd()
    {
        setVisible(false);
        
        if(onAdd)
        {
            onAdd();
        }
    }

    useEffect(() => {init()}, []);

    useEffect(() => {
        if(value)
        {
            setValue(value);
        }
    }, [value]);

    return (
        <AutocompleteCore
            icon={icon}
            color={color}
            error={error}
            value={_value}
            visible={visible}
            options={options}
            loading={loading}
            optionField={optionField}
            placeholder={placeholder}
            initializing={initializing}
            coreViewStyle={coreViewStyle}
            inputViewStyle={inputViewStyle}
            inputStyle={inputStyle}
            onBlur={onBlur}
            onFocus={onFocus}
            onAdd={handleAdd}
            onClick={handleClick}
            onChange={handleChange}
            RenderOption={RenderOption}
            onChangeVisible={handleChangeVisible}
            onOptionSelected={handleOptionSelected}
        />
    )
}
