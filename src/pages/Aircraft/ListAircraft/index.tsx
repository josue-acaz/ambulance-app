import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AircraftService from "../../../services/aircraft.service";
import Aircraft from "../../../models/Aircraft";
import { numberToCurrencyBRL } from "../../../utils";

// types
import { RowProps } from "../../../components/Task/types";

class ListAircraft extends BaseComponent<Aircraft>
{
    title = "Aeronaves";

    constructor(props: any)
    {
        super(props, new AircraftService());
    }

    head_labels = [
        {
            key: "prefix",
            value: "Prefixo",
        },
        {
            key: "model_name",
            value: "Modelo",
        },
        {
            key: "crew",
            value: "Qtd. Tripulação"
        },
        {
            key: "passengers",
            value: "Qtd. Passageiros"
        },
        {
            key: "autonomy",
            value: "Autonômia"
        },
        {
            key: "cruising_speed",
            value: "Vel. Cruzeiro"
        },
        {
            key: "price_per_km_passengers",
            value: "Preço Km (Passageiros)"
        },
        {
            key: "price_per_km_aeromedical",
            value: "Preço Km (Aeromédico)"
        },
        {
            key: "fixed_price_radius",
            value: "Raio preço fixo"
        },
        {
            key: "fixed_price_passengers",
            value: "Preço fixo (Passageiros)"
        },
        {
            key: "fixed_price_aeromedical",
            value: "Preço fixo (Aeromédico)"
        },
        {
            key: "operates_aeromedical_transport",
            value: "Opera Aeromédico?"
        },
    ];

    createRow(data: Aircraft)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.prefix,
                },
                {
                    value: data.model_name,
                },
                {
                    value: data.crew,
                },
                {
                    value: data.passengers,
                },
                {
                    value: data.autonomy,
                },
                {
                    value: data.cruising_speed,
                },
                {
                    value: numberToCurrencyBRL(data.price_per_km_passengers),
                },
                {
                    value: numberToCurrencyBRL(data.price_per_km_aeromedical),
                },
                {
                    value: data.fixed_price_radius
                },
                {
                    value: numberToCurrencyBRL(data.fixed_price_passengers),
                },
                {
                    value: numberToCurrencyBRL(data.fixed_price_aeromedical),
                },
                {
                    value: <strong>{data.operates_aeromedical_transport ? "SIM" : "NÃO"}</strong>
                },
            ]
        };

        return row;
    }
}

export default withRouter(ListAircraft);