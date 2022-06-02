import styled from "styled-components";

const GalleryAmbulanceView = styled.div``;

const GalleryThumbnailView = styled.div`
    display: flex;
    flex-direction: row;

    .seating_map {
        margin-left: 10px;
    }

    @media screen and (max-width: 1200px)
    {
        flex-direction: column;
        .seating_map {
            margin-left: 0px;
        }
    }
`;

const GalleryImagesView = styled.div`
    margin-top: 10px;
`;

export {
    GalleryAmbulanceView,
    GalleryThumbnailView,
    GalleryImagesView,
};