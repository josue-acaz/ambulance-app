import React, { useState } from "react";

// components
import Input from "../Input";

// types
import { CurrencyInputProps, ChangeEvent } from "./types";

// functions
function maskCurrency(event: any) {
    event.target.value = event.target.value.toString();
    event.target.value = event.target.value.replace(/\D/g,'');
    event.target.value = (Number(event.target.value)/100).toFixed(2) + '';
    event.target.value = event.target.value.replace(".", ",");
    event.target.value = event.target.value.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    event.target.value = event.target.value.replace(/(\d)(\d{3}),/g, "$1.$2,");
}

function currencyToNumber(currency: string) {
    return Number(currency.split(".").join("").replace(",", "."));
}

function numberToCurrency(number: number) {
    return number.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}

function numberToCurrencyBRL(number: number) {
    return number.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' });
}

export default function CurrencyInput(props: CurrencyInputProps) {
    const [value, setValue] = useState(props.value ? numberToCurrency(props.value): "0,00");
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(event.target.value);

        var changeEvent: ChangeEvent = {
            target: { 
                name: event.target.name, 
                value: currencyToNumber(event.target.value),
            }
        };

        props.onChange(changeEvent);
    }
    
    return (
        <Input 
            value={value} 
            name={props.name} 
            placeholder={props.placeholder} 
            adorment="R$"
            adormentPosition="start"
            onChange={handleChange}
            onBlur={props.onBlur}
            onInput={maskCurrency}
            error={props.error}
        />
    );
}
