import React, { useEffect, useState } from "react";
import { useQueryParam, StringParam } from "use-query-params";
import logo from "../../assets/img/logo.png";
import DownloadIcon from "@mui/icons-material/Download";
import ProcessingLoader from "../../components/spinners/ProcessingLoader";
import Quote from "../../viewModels/Quote";
import QuoteService from "../../services/quote.service";
import ErrorComponent from "../../components/ErrorComponent";

// styles
import { DownloadView, DownloadCard, DownloadCardHeader, DownloadCardBody, DownloadCardActions, LogoView, LogoImage, Title, DownloadButton } from "./styles";

export default function Download() {
    const [processing, setProcessing] = useState(true);
    const [token, ] = useQueryParam("token", StringParam);
    const [inputs, setInputs] = useState<Quote>(new Quote());
    const [errors, setErrors] = useState<Array<string>>([]);

    const quoteService = new QuoteService();

    async function show(token: string) {
        setErrors([]);
        try {
            const response = await quoteService.getByToken(token);
            setInputs(response.data);
            setProcessing(false);
        } catch (error: any) {
            setErrors(error.response.data);
            setProcessing(false);
        }
    }

    useEffect(() => {
        if(token)
        {
            show(token);
        }
    }, []);

    return (
        <DownloadView>
            {processing ? <ProcessingLoader title="Estamos trazendo suas informações..." msg="Por favor, aguarde!" /> : (
                <DownloadCard>
                    <DownloadCardHeader>
                        <div>
                            <LogoView>
                                <LogoImage src={logo} alt="AMB SAÚDE" />
                            </LogoView>
                            {errors.length === 0 && (<Title>Olá <strong>{inputs.customer_name}</strong>, acesse sua cotação logo abaixo!</Title>)}
                        </div>
                    </DownloadCardHeader>
                    <DownloadCardBody>
                        {errors.length === 0 && (
                            <DownloadButton href={inputs.document_url} target="_blank" rel="noopener noreferrer">
                                <DownloadIcon className="icon" />
                            </DownloadButton>
                        )}
                    </DownloadCardBody>
                    <DownloadCardActions>
                        {errors.length > 0 && <ErrorComponent errors={errors} />}
                    </DownloadCardActions>
                </DownloadCard>
            )}
        </DownloadView>
    );
}
