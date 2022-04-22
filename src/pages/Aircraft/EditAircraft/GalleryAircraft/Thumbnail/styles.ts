import styled from "styled-components";
import { CircleButton } from "../../../../../design";
import { colors } from "../../../../../design/colors";

const ThumbnailView = styled.div`
    display: flex;
`;

const ThumbnailContent = styled.div``;

const ThumbnailTitle = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.BLACK};
    margin-bottom: 10px;
`;

const ThumbnailImageView = styled.div`
    display: flex;
    width: auto;
    position: relative;
`;

const ThumbnailImageActions = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 33;
`;

const ThumbnailImage = styled.img`
    width: 500px;
    height: 220px;
    object-fit: cover;
    border-radius: .5rem;
    z-index: 1;

    &:hover {
        filter: brightness(70%);
    }
`;

const ChangeThumbnailButton = styled(CircleButton)`
    background-color: white;
    color: ${colors.PRIMARY};
`;

export {
    ThumbnailView,
    ThumbnailContent,
    ThumbnailTitle,
    ThumbnailImageView,
    ThumbnailImageActions,
    ThumbnailImage,
    ChangeThumbnailButton,
};