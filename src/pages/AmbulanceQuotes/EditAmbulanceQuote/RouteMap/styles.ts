import styled from "styled-components";
import { ModalViewProps } from "./types";

const ModalView = styled.div<ModalViewProps>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;

    display: ${props => props.open ? "block" : "none"};
`;

const RouteMapView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 10px;
`;

const RouteMapCard = styled.div`
    width: 1200px;
    height: 600px;
    display: grid;
    padding: 10px;
    position: relative;
    border-radius: 5px;
    grid-template-columns: 100%;
    box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);
    transition: 2s;
    overflow: hidden;
    grid-template-rows: 0px auto 50px;
    grid-template-areas: "header"
                         "content"
                         "footer";
    background-color: #ffffff;

    @media screen and (max-width: 1200px)
    {
        width: 100%;
        height: 100%;
    }
`;

const RouteMapCardHeader = styled.div`
    grid-area: "header";
    background-color: red;
`;

const RouteMapCardContent = styled.div` // O mapa está absoluto com relação a esse elemento, então colocar "padding: 10px;" não vai mostrar a borda, pois a mesma está sobreposta pelo mapa, lembre-se o mapa está com o estilo "top: 0; left: 0; bottom: 0; right: 0; position: absolute;"
    grid-area: "content";
    background-color: blue;
    position: relative;
`;

const RouteMapCardFooter = styled.div`
    grid-area: "footer";
`;

const RouteMapActions = styled.div`
    display: flex;
    align-items: center;
`;

export { ModalView, RouteMapView, RouteMapCard, RouteMapCardHeader, RouteMapCardContent, RouteMapCardFooter, RouteMapActions };