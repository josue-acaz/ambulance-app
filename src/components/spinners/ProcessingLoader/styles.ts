import styled from "styled-components";

const ProcessingView = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Spinner = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProcessingContent = styled.div`
    text-align: center;
    width: auto;
    position: relative;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 1rem;
`;

const Feedback = styled.div`
    margin-top: 15px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444444;
`;

const Message = styled.p`
    font-size: 14px;
    color: #666666;
`;

export {
    ProcessingView, 
    ProcessingContent,
    Feedback,
    Title,
    Spinner,
    Message,
};