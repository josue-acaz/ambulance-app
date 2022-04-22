import React from "react";

// types
import { GalleryAircraftProps } from "./types";

// components
import Thumbnail from "./Thumbnail";
import Images from "./Images";

// styles
import {
    GalleryImagesView,
    GalleryAircraftView,
    GalleryThumbnailView,
} from "./styles";

export default function GalleryAircraft(props: GalleryAircraftProps) {
    return (
        <GalleryAircraftView>
            <GalleryThumbnailView>
                <Thumbnail 
                    type="thumbnail"
                    title="Foto Principal" 
                    url={props.aircraft.thumbnail} 
                    aircraft_id={props.aircraft.id} 
                    loading={false} 
                    onChange={() => {}} 
                />
                <Thumbnail 
                    type="seating_map"
                    className="seating_map"
                    title="Mapa de assentos" 
                    url={props.aircraft.seating_map} 
                    aircraft_id={props.aircraft.id} 
                    loading={false} 
                    onChange={() => {}} 
                />
            </GalleryThumbnailView>
            <GalleryImagesView>
                <Images type="passengers" title="Passageiros" aircraft_id={props.aircraft.id} images={props.aircraft.images} />
            </GalleryImagesView>
            <GalleryImagesView>
                <Images type="aeromedical" title="Aeromédico" aircraft_id={props.aircraft.id} images={props.aircraft.images} />
            </GalleryImagesView>
        </GalleryAircraftView>
    );
}
