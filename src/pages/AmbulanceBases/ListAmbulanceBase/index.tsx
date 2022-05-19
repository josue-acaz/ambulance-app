import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AmbulanceBaseService from "../../../services/ambulance-base.service";
import AmbulanceBase from "../../../models/AmbulanceBase";
import { numberToCurrencyBRL } from "../../../utils";

// types
import { RowProps } from "../../../components/Task/types";

class ListAmbulanceBase extends BaseComponent<AmbulanceBase>
{
    title = "Bases das Ambulâncias";

    constructor(props: any)
    {
        super(props, new AmbulanceBaseService());
    }

    head_labels = [
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
    ];

    createRow(data: AmbulanceBase)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.name,
                },
                {
                    value: data.latitude,
                },
                {
                    value: data.longitude,
                },
            ]
        };

        return row;
    }
}

export default withRouter(ListAmbulanceBase);