import styled from "styled-components";

const ToolbarView = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
`;

const AddButton = styled.button`
    border: none;
    height: 40px;
    width: 80px;
    background-color: #ebebeb;
    border-radius: .2rem;
    font-size: 14px;
    color: #444444;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }

    &:hover {
        cursor: pointer;
        background-color: #aaaaaa;
    }
`;

const Title = styled.p`
    color: #444444;
    font-size: 18px;

    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const RightActions = styled.div``;

const LeftActions = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const History = styled.div`
    display: flex;
    align-items: center;
    color: #505050; 

    a {
        margin-left: .5rem;
        font-size: 16px;
        text-decoration: none;
        color: #505050;
    }

    a:hover {text-decoration: underline;}

    .icon {
        font-size: 14px;
        margin-left: .5rem;
    }
`;

const HistoryText = styled.div`
    margin-left: .5rem;
    font-size: 16px;
    color: #505050;

    @media screen and (max-width: 1200px) {
        font-size: 13px;
    }
`;

const HistorySpan = styled.span`
    display: flex;
    align-items: center;
    @media screen and (max-width: 1200px) {
        .link {
            font-size: 13px;
        }
    }
`;

const ActionsView = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ToolbarActionView = styled.div`
    width: auto;
    border: none;

    p {
        font-size: 12px;
        color: blue;
        text-decoration: underline;
    }

    &:hover {
        cursor: pointer;
    }
`;

export {
    ToolbarView, 
    AddButton, 
    Title,
    LeftActions,
    RightActions,
    History,
    HistorySpan,
    HistoryText,
    ActionsView,
    ToolbarActionView,
};