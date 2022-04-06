import styled from "styled-components";

const DrawerFormView = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DrawerFormHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const DrawerFormBody = styled.div`
`;

const DrawerFormContent = styled.div`
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444444;
`;

export { DrawerFormView, DrawerFormHeader, DrawerFormBody, DrawerFormContent, Title };