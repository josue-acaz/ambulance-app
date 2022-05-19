import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AmbulanceService from "../../../services/ambulance.service";
import Ambulance from "../../../models/Ambulance";
import { numberToCurrencyBRL } from "../../../utils";

// types
import { RowProps } from "../../../components/Task/types";

class ListAmbulance extends BaseComponent<Ambulance>
{
    title = "Ambulâncias";

    constructor(props: any)
    {
        super(props, new AmbulanceService());
    }

    head_labels = [
        {
            key: "code",
            value: "Código",
        },
        {
            key: "price_per_km_uti",
            value: "Preço do Km UTI",
        },
        {
            key: "price_per_km_basic",
            value: "Preço do Km Básica",
        },
    ];

    createRow(data: Ambulance)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.code,
                },
                {
                    value: numberToCurrencyBRL(data.price_per_km_uti),
                },
                {
                    value: numberToCurrencyBRL(data.price_per_km_basic),
                },
            ]
        };

        return row;
    }
}

export default withRouter(ListAmbulance);