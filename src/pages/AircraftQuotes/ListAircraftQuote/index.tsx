import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AircraftQuote from "../../../models/AircraftQuote";
import AircraftQuoteService from "../../../services/aircraft-quote.service";
import { formatDatetime, numberToCurrencyBRL } from "../../../utils";
import { type_of_transport_labels } from "../../../shared/providers/type_of_transports";
import { ENUM_DATETIME_FORMATS } from "../../../constants";

// types
import { RowProps } from "../../../components/Task/types";

class ListAircraftQuote extends BaseComponent<AircraftQuote>
{
    title = "UTI Aérea";

    constructor(props: any)
    {
        super(props, new AircraftQuoteService());
    }

    head_labels = [
        {
            key: "code",
            value: "Código",
        },
        {
            key: "customer_name",
            value: "Cliente",
        },
        {
            key: "type_of_transport",
            value: "Tipo",
        },
        {
            key: "final_price",
            value: "Preço Cotado"
        },
        {
            key: "created_at",
            value: "Criado Em"
        },
        {
            key: "updated_at",
            value: "Última Atualização"
        }
    ];

    createRow(data: AircraftQuote)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.code,
                },
                {
                    value: data.customer_name,
                },
                {
                    value: type_of_transport_labels[data.type_of_transport],
                },
                {
                    value: numberToCurrencyBRL(data.final_price),
                },
                {
                    value: formatDatetime(data.created_at, ENUM_DATETIME_FORMATS.READABLE_V1),
                },
                {
                    value: data.updated_at ? formatDatetime(data.updated_at, ENUM_DATETIME_FORMATS.READABLE_V1) : "Nenhuma",
                }
            ]
        };

        return row;
    }
}

export default withRouter(ListAircraftQuote);