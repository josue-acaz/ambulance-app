import styled from "styled-components";

const WarningComponentView = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WarningView = styled.div`
    width: 100%;        
    padding: 15px;
    border-radius: 5px;
    background-color: #f9e154;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
`;

const WarningText = styled.p`
    font-size: 12px;
    color: #333333;
`;

export {
    WarningComponentView,
    WarningView,
    WarningText,
};