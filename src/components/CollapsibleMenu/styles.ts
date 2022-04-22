import styled from "styled-components";
import { Button } from "../../design";

const CollapsibleMenuView = styled.div`
    position: relative;
    z-index: 999999999;
`;

const CollapseMenuBtn = styled(Button)``;

const CollapsibleMenuItems = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 5px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.06);
`;

export {
    CollapsibleMenuView,
    CollapseMenuBtn,
    CollapsibleMenuItems,
};