import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AerodromeService from "../../../services/aerodrome.service";
import Aerodrome from "../../../models/Aerodrome";
import { type_of_aerodrome_labels } from "../../../shared/providers/type_of_aerodromes";

// types
import { RowProps } from "../../../components/Task/types";

class ListAerodrome extends BaseComponent<Aerodrome>
{
    title = "Aeródromos";

    constructor(props: any)
    {
        super(props, new AerodromeService());
    }

    head_labels = [
        {
            key: "oaci_code",
            value: "OACI",
        },
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "latitude",
            value: "Latitude",
        },
        {
            key: "longitude",
            value: "Longitude",
        },
        {
            key: "city_full_name",
            value: "Cidade",
        },
        {
            key: "access",
            value: "Tipo"
        }
    ];

    createRow(data: Aerodrome)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.oaci_code,
                },
                {
                    value: data.name,
                },
                {
                    value: data.latitude,
                },
                {
                    value: data.longitude,
                },
                {
                    value: data.city_full_name
                },
                {
                    value: type_of_aerodrome_labels[data.access]
                }
            ]
        };

        return row;
    }
}

export default withRouter(ListAerodrome);