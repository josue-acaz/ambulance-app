import styled from "styled-components";

const ErrorComponentView = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ErrorView = styled.div`
    width: 100%;        
    padding: 15px;
    border-radius: 5px;
    background-color: red;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: white;
`;

export {
    ErrorComponentView,
    ErrorView,
    ErrorText,
};