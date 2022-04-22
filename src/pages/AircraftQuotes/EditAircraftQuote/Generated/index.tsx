import React, { useState } from "react";
import { shareOnWhatsapp } from "../../../../utils";
import Quote from "../../../../viewModels/Quote";
import QuoteService from "../../../../services/quote.service";
import CircularProgress from "@mui/material/CircularProgress";

// icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// types
import { GeneratedProps } from "./types";

// styles
import { GeneratedView, GeneratedCard, GeneratedCardContent, GeneratedCardHeader, Title, Subtitle, GoBackButton, WhatsAppButton, GoBackView, DownloadButton } from "./styles";

export default function Generated(props: GeneratedProps) {
    const quoteService = new QuoteService();
    const [processing, setProcessing] = useState(false);

    const handleShareOnWhatsapp = async (id: string) =>
    {
        let quote: Quote = new Quote();
        quote.id = id;
        quote.type = "aircraft_quote";

        setProcessing(true);

        try {
            const response = await quoteService.share(quote);
            shareOnWhatsapp(response.data.download_url);
            setProcessing(false);
        } catch (error: any) {
            setProcessing(false);
            alert("Não foi possível compartilhar. Entre em contato com o suporte!");
        }
    }

    return (
        <GeneratedView>
            <GeneratedCard>
                <GeneratedCardHeader>
                    <GoBackView>
                        <GoBackButton onClick={props.onGoBack}>
                            <ArrowBackIcon className="icon" />
                        </GoBackButton>
                        <p>Voltar</p>
                    </GoBackView>
                    
                    <Title>Cotação gerada com sucesso</Title>
                    <Subtitle>Escolha uma ação abaixo</Subtitle>
                </GeneratedCardHeader>
                <GeneratedCardContent>
                    <WhatsAppButton onClick={() =>  handleShareOnWhatsapp(props.data.id)}>
                        {processing ? <CircularProgress size={24} color="inherit" /> : <WhatsAppIcon className="icon" />}
                    </WhatsAppButton>
                    <DownloadButton rel="noopener noreferrer" target="_blank" href={props.data.document_url}>
                        <DownloadIcon className="icon" />
                    </DownloadButton>
                </GeneratedCardContent>
            </GeneratedCard>
        </GeneratedView>
    );
}
