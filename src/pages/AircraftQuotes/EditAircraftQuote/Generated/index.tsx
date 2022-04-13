import React from "react";
import { shareOnWhatsapp } from "../../../../utils";

// icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// types
import { GeneratedProps } from "./types";

// styles
import { GeneratedView, GeneratedCard, GeneratedCardContent, GeneratedCardHeader, Title, Subtitle, GoBackButton, WhatsAppButton, GoBackView, DownloadButton } from "./styles";

export default function Generated(props: GeneratedProps) {
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
                    <WhatsAppButton onClick={() =>  shareOnWhatsapp("https://fretamento.netlify.app/pedidos/" + props.data.id + "/pdf")}>
                        <WhatsAppIcon className="icon" />
                    </WhatsAppButton>
                    <DownloadButton rel="noopener noreferrer" target="_blank" href={props.data.document_url}>
                        <DownloadIcon className="icon" />
                    </DownloadButton>
                </GeneratedCardContent>
            </GeneratedCard>
        </GeneratedView>
    )
}
