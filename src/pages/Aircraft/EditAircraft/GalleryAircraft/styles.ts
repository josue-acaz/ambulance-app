import styled from "styled-components";

const GalleryAircraftView = styled.div``;

const GalleryThumbnailView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .seating_map:last-child {
        margin-left: 10px;
    }
`;

const GalleryImagesView = styled.div`
    margin-top: 10px;
`;

export {
    GalleryAircraftView,
    GalleryThumbnailView,
    GalleryImagesView,
};