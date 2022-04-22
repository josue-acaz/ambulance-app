import styled from "styled-components";
import { colors } from "../../../../design/colors";

const GeneratedView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    @media screen and (max-width: 1200px)
    {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const GeneratedCard = styled.div`
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);
    border-radius: 5px;
    width: 250px;

    @media screen and (max-width: 1200px)
    {
        width: 100%;
    }
`;

const GeneratedCardHeader = styled.div``;

const GeneratedCardContent = styled.div``;

const Title = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #444444;
`;

const Subtitle = styled.p`
    font-size: 12px;
    color: #666666;
`;

const WhatsAppButton = styled.a`
    width: 100%;
    border: none;
    background-color: #25d366;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #ffffff;
    
    .icon {
        color: #ffffff;
    }
`;

const DownloadButton = styled.a`
    width: 100%;
    border: none;
    background-color: ${colors.PRIMARY};
    padding: 4px;
    margin-top: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    
    .icon {
        color: ${colors.BLACK};
    }
`;

const GoBackButton = styled.button`
    border: none;
    background-color: transparent;
    background-color: #ebebeb;
    border-radius: .5rem;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background-color: #cfcfcf;
    }

    .icon {
        color: #444444;
    }
`;

const GoBackView = styled.div`
    display: flex;
    align-items: center;

    p {
        margin-left: 5px;
        color: ${colors.BLACK};
    }
`;

export { GeneratedView, GeneratedCard, GeneratedCardContent, GeneratedCardHeader, Title, Subtitle, WhatsAppButton, DownloadButton, GoBackButton, GoBackView };