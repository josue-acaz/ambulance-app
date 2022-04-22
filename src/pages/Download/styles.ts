import styled from "styled-components";
import { colors } from "../../design/colors";

const DownloadView = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DownloadCard = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 500px;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    padding: 14px;
    background-color: #ffffff;
`;

const DownloadCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.p`
    font-size: 12px;
    color: ${colors.BLACK};
`;

const DownloadCardBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const DownloadCardActions = styled.div`
`;

const LogoView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoImage = styled.img`
    width: 180px;
    height: auto;
    object-fit: contain;
`;

const DownloadButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.PRIMARY};
    color: ${colors.BLACK};
    width: auto;
    min-width: 140px;
    border: none;
    font-weight: normal;
    text-align: center;
    height: 35px;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0px;

    &:hover {
        filter: brightness(.9);
        cursor: pointer;
    }
`;

export { DownloadView, DownloadCard, DownloadCardHeader, DownloadCardBody, DownloadCardActions, LogoView, LogoImage, Title, DownloadButton };