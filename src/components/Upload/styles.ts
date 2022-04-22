import styled from "styled-components";

const UploadView = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UploadCard = styled.div`
    width: 600px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;

    @media screen and (max-width: 1200px)
    {
        width: 100%;
    }
`;

const UploadActions = styled.div`
    margin-top: 10px;
    display: flex;
`;

export { UploadView, UploadActions, UploadCard };