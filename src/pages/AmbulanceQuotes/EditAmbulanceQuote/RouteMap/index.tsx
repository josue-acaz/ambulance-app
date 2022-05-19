import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Portal } from "react-portal";

// types
import { RouteMapProps } from "./types";

// view models
import Coordinate from "../../../../viewModels/Coordinate";

// styles
import { Button } from "../../../../design";
import { ModalView, RouteMapView, RouteMapCard, RouteMapCardHeader, RouteMapCardContent, RouteMapCardFooter, RouteMapActions } from "./styles";

export default function RouteMap(props: RouteMapProps) {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "";

    const [map, setMap] = useState(null);
    const defaultCenter: Coordinate = { lat: -1.45548, lng: -48.48078 };
    const [directionsService, setDirectionsService] = useState<any>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
    const [distance, setDistance] = useState(0);

    function handleLoadedMap(mapInstance: any)
    {
        const { map } = mapInstance;
        setMap(map);

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map,
            draggable: true,
            panel: document.getElementById("panel") as HTMLElement,
        });

        directionsRenderer.addListener("directions_changed", () => {
            const directions = directionsRenderer.getDirections();

            if (directions) {
                computeTotalDistance(directions);
            }
        });
        
        setDirectionsService(directionsService);
        setDirectionsRenderer(directionsRenderer);
    }

    function computeTotalDistance(result: google.maps.DirectionsResult) {
        let distance = 0;
        const route = result.routes[0];
      
        if (!route) {
          return;
        }
      
        for (let i = 0; i < route.legs.length; i++) {
            distance += route.legs[i]!.distance!.value;
        }
      
        distance = distance / 1000;
        setDistance(distance);
    }

    function displayRoute(origin: Coordinate, destination: Coordinate, service: google.maps.DirectionsService, display: google.maps.DirectionsRenderer) 
    {
        service.route({ origin, destination, waypoints: [], travelMode: google.maps.TravelMode.DRIVING, avoidTolls: true }, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
            if(result !== null)
            {
                display.setDirections(result);
            }
        });
    }

    /**
     * useEffect(() => {
        const origin = props.points[0];
        const destination = props.points[1];

        if(map && directionsRenderer && directionsService)
        {
            if(origin.geometry && destination.geometry)
            {
                displayRoute(origin.geometry.location, destination.geometry.location, directionsService, directionsRenderer);
            }
        }
    }, [props.points]);
     */

    return (
        <Portal>
            <ModalView open={props.modal_number === 2}>
                <RouteMapView>
                    <RouteMapCard>
                        <RouteMapCardHeader></RouteMapCardHeader>
                        <RouteMapCardContent>
                            {/**
                             * <GoogleMapReact
                                onGoogleApiLoaded={handleLoadedMap}
                                bootstrapURLKeys={{ key: googleMapsApiKey }}
                                defaultCenter={defaultCenter}
                                center={props.center.geometry.location}
                                defaultZoom={15}
                            >

                            </GoogleMapReact>
                             */}
                        </RouteMapCardContent>
                        <RouteMapCardFooter>
                            <p><strong>Distância: </strong>{distance} Km</p>
                            <RouteMapActions>
                                <Button type="button" onClick={props.onUpdate}>Alterar</Button>
                                <Button type="button" color="transparent" onClick={props.onCancel}>Cancelar</Button>
                            </RouteMapActions>
                        </RouteMapCardFooter>
                    </RouteMapCard>
                </RouteMapView>
            </ModalView>
        </Portal>
    );
}
