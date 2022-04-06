import styled from "styled-components";

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444444;
`;

const Subtitle = styled.p`
    font-size: 14px;
    font-weight: normal;
    color: #777777;
`;

const AlertView = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AlertCard = styled.div`
    width: auto;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
`;

const AlertHeader = styled.div``;

const AlertContent = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const AlertActions = styled.div`
    display: flex;
    align-items: center;
`;

export { Title, Subtitle, AlertView, AlertCard, AlertHeader, AlertContent, AlertActions };