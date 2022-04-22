import styled from "styled-components";
import { colors } from "../../../../../../design/colors";

const ImageItemView = styled.div`
    width: auto;
    position: relative;
    margin-right: 10px;

    img {
        height: 220px;
        width: 500px;
        object-fit: cover;
        border-radius: 10px;
        z-index: 1;
    }

    img:hover {
        filter: brightness(70%);
    }
`;

const ImageItemCheck = styled.div`
    top: 5px;
    left: 5px;
    height: 35px;
    width: 35px;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 2000px;
    z-index: 30;
`;

const DocCheckView = styled.div`
    top: 5px;
    right: 5px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 2000px;
    z-index: 30;
`;

const DocCheckLabel = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: ${colors.BLACK};
`;

const ImageTypeLabel = styled.div`
    background-color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 2000px;
    position: absolute;
    bottom: 10px;
    right: 5px;
`;

export {
    ImageItemView,
    ImageItemCheck,
    DocCheckView,
    DocCheckLabel,
    ImageTypeLabel,
};