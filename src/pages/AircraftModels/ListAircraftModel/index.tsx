import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AircraftModelService from "../../../services/aircraft-model.service";
import AircraftModel from "../../../models/AircraftModel";
import { type_of_aircraft_labels } from "../../../shared/providers/type_of_aircraft";
import { number_of_engine_labels } from "../../../shared/providers/number_of_engines";
import { type_of_engine_labels } from "../../../shared/providers/type_of_engines";
import { carrier_size_labels } from "../../../shared/providers/carrier_sizes";

// types
import { RowProps } from "../../../components/Task/types";

class ListAircraftModel extends BaseComponent<AircraftModel>
{
    title = "Modelos de Aeronaves";

    constructor(props: any)
    {
        super(props, new AircraftModelService());
    }

    head_labels = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "type",
            value: "Tipo",
        },
        {
            key: "number_of_engines",
            value: "Qtd. Motores",
        },
        {
            key: "engine_type",
            value: "Tipo de Motor",
        },
        {
            key: "carrier_size",
            value: "Tamanho Bagageiro",
        },
        {
            key: "carrier_dimensions",
            value: "Dimensões do Bagageiro",
        },
        {
            key: "manufacturer_name",
            value: "Fabricante",
        },
    ];

    createRow(data: AircraftModel)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.name,
                },
                {
                    value: type_of_aircraft_labels[data.type],
                },
                {
                    value: number_of_engine_labels[data.number_of_engines],
                },
                {
                    value: type_of_engine_labels[data.engine_type],
                },
                {
                    value: carrier_size_labels[data.carrier_size],
                },
                {
                    value: data.carrier_dimensions,
                },
                {
                    value: data.manufacturer_name,
                }
            ]
        };

        return row;
    }
}

export default withRouter(ListAircraftModel);