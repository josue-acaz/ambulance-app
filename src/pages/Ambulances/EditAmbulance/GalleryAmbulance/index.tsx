import React from "react";

// types
import { GalleryAmbulanceProps } from "./types";

// components
import Thumbnail from "./Thumbnail";
import Images from "./Images";

// styles
import {
    GalleryImagesView,
    GalleryAmbulanceView,
    GalleryThumbnailView,
} from "./styles";

export default function GalleryAmbulance(props: GalleryAmbulanceProps) {
    return (
        <GalleryAmbulanceView>
            <GalleryThumbnailView>
                <Thumbnail 
                    type="thumbnail"
                    title="Foto Principal" 
                    url={props.ambulance.thumbnail} 
                    aircraft_id={props.ambulance.id} 
                    loading={false} 
                    onChange={() => {}} 
                />
            </GalleryThumbnailView>
            <GalleryImagesView>
                <Images title="Fotos da ambulância" ambulance_id={props.ambulance.id} images={props.ambulance.images} />
            </GalleryImagesView>
        </GalleryAmbulanceView>
    );
}
