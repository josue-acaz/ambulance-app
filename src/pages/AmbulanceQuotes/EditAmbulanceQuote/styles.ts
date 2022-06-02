import styled from "styled-components";

const EditAmbulanceQuoteView = styled.div``;

const LocationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const RouteMapButton = styled.button<any>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    border: 2px dashed ${props => props.disabled ? "#999999" : "#666666"};
    height: 35px;
    min-width: 100px;

    &:hover {
        cursor: pointer;
    }

    .icon {
        color: ${props => props.disabled ? "#999999" : "#444444"};
    }

    p {
        font-size: 14px;
        color: ${props => props.disabled ? "#999999" : "#444444"};
    }

    @media screen and (max-width: 1200px)
    {
        width: 100%;
    }
`;

const LocationOptionView = styled.div``;

const LocationOptionTitle = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #333333;
`;

const LocationOptionSubtitle = styled.p`    
    font-size: 12px;
    color: #666666;
`;

const RouteMapView = styled.div<any>`
    height: 400px;
    width: 100%;
    position: relative;
    display: ${props => props.open ? "block" : "none"};
`;

const AmbulanceOptionView = styled.div`
    display: flex;
    align-items: center;
`;

const AmbulanceOptionName = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #333333;
    margin-right: 5px;
`;

const AmbulanceOptionText = styled.p`    
    font-size: 12px;
    color: #666666;
    margin-right: 5px;
`;

export {
    EditAmbulanceQuoteView,
    LocationButton,
    RouteMapButton,
    LocationOptionView,
    LocationOptionTitle,
    LocationOptionSubtitle,
    RouteMapView,
    AmbulanceOptionView,
    AmbulanceOptionName,
    AmbulanceOptionText
};