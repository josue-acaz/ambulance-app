import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import AmbulanceQuoteService from "../../../services/ambulance-quote.service";
import AmbulanceQuote from "../../../models/AmbulanceQuote";
import Quote from "../../../viewModels/Quote";
import QuoteService from "../../../services/quote.service";
import { ambulance_type_of_transport_labels } from "../../../shared/providers/type_of_transports";
import CircularProgress from "@mui/material/CircularProgress";
import { formatDatetime, numberToCurrencyBRL, shareOnWhatsapp } from "../../../utils";
import { ENUM_DATETIME_FORMATS } from "../../../constants";

// icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/Download";

// types
import { RowProps } from "../../../components/Task/types";

class ListAmbulanceQuotes extends BaseComponent<AmbulanceQuote>
{
    title = "Ambulância";
    quoteService: QuoteService = new QuoteService();

    constructor(props: any)
    {
        super(props, new AmbulanceQuoteService());
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
            key: "origin_location_id",
            value: "Origem"
        },
        {
            key: "destination_location_id",
            value: "Destino"
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
            value: "Atualizado Em"
        }
    ];

    handleShareOnWhatsapp = async (id: string) =>
    {
        this.setCurrentId(id);
        let quote: Quote = new Quote();
        quote.id = id;
        quote.type = "ambulance_quote";

        this.setProcessing(true);

        try {
            const response = await this.quoteService.share(quote);
            const data: Quote = response.data;
            shareOnWhatsapp(data.download_url);

            this.setProcessing(false);
        } catch (error: any) {
            console.error(error.response);
            this.setProcessing(false);
        }
    }

    createRow(data: AmbulanceQuote)
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
                    value: ambulance_type_of_transport_labels[data.type_of_transport],
                },
                {
                    value: (
                        <div>
                            <strong>{data.transport_segment.origin_location_name}</strong>
                            <p>{data.transport_segment.origin_city_name}</p>
                        </div>
                    )
                },
                {
                    value: (
                        <div>
                            <strong>{data.transport_segment.destination_location_name}</strong>
                            <p>{data.transport_segment.destination_city_name}</p>
                        </div>
                    )
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
            ],
            actions: [
                {
                    icon: (this.state.processing && this.state.current_id === data.id) ? <CircularProgress size={24} color="inherit" /> : <WhatsAppIcon className="icon" />,
                    label: "Compartilhar no WhatsApp",
                    className: "whatsapp-btn",
                    onClick: () => this.handleShareOnWhatsapp(data.id),
                },
                {
                    icon: <DownloadIcon className="icon" />,
                    label: "Baixar esta cotação",
                    className: "download-btn",
                    href: data.document_url,
                    target: "_blank",
                    rel: "noopener noreferrer"
                }
            ]
        };

        return row;
    }
}

export default withRouter(ListAmbulanceQuotes);