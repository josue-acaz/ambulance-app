class GeocodedWaypoint
{
    geocoder_status: string = "";
    place_id: string = "";
    types: Array<string> = [];
}

class TextValueObject {
    text: string = ""; 
    value: number = 0; 
};

class TimeZoneTextValueObject 
{
    text: string = ""; 
    time_zone: string = "";
    value: number = 0; 
}

class LatLngLiteral {
    lat: number = 0; 
    lng: number = 0; 
};

class DirectionsStep {
    travel_mode: string = ""; 
    distance: TextValueObject = new TextValueObject(); 
    duration: TextValueObject = new TextValueObject(); 
    end_location: LatLngLiteral = new LatLngLiteral(); 
    start_location: LatLngLiteral = new LatLngLiteral();
    html_instructions: string = ""; 
    polyline: DirectionsPolyline = new DirectionsPolyline(); 
};

class DirectionsTrafficSpeedEntry
{
    offset_meters: number = 0; 
    speed_category: string = ""; 
}

class DirectionsViaWaypoint 
{
    location: LatLngLiteral = new LatLngLiteral(); 
    step_index: number = 0; 
    step_interpolation: number = 0; 
}

class DirectionsLeg
{
    end_address: string = ""; 
    end_location: LatLngLiteral = new LatLngLiteral(); 
    start_address: string = ""; 
    start_location: LatLngLiteral = new LatLngLiteral();
    steps: Array<DirectionsStep> = []; 
    arrival_time: TimeZoneTextValueObject = new TimeZoneTextValueObject();
    departure_time: TimeZoneTextValueObject = new TimeZoneTextValueObject();
    distance: TextValueObject = new TextValueObject();
    duration: TextValueObject = new TextValueObject();
    duration_in_traffic: TextValueObject = new TextValueObject();
    traffic_speed_entry: Array<DirectionsTrafficSpeedEntry> = [];
    via_waypoint: Array<DirectionsViaWaypoint> = [];
}

class Bounds {
    northeast: LatLngLiteral = new LatLngLiteral(); 
    southwest: LatLngLiteral = new LatLngLiteral(); 
};

class DirectionsPolyline {
    points: string = ""; 
};

class DirectionsRoute {
    bounds: Bounds = new Bounds();
    copyrights: string = "";
    legs: Array<DirectionsLeg> = []; 
    overview_polyline: DirectionsPolyline = new DirectionsPolyline();
    summary: string = ""; 
    warnings: Array<string> = [];
    waypoint_order: Array<number> = []; 
};

class DirectionsLocation 
{
    location: LatLngLiteral = new LatLngLiteral();
};

class DirectionsRequest
{
    avoidTolls: boolean = true;
    origin: DirectionsLocation = new DirectionsLocation();
    destination: DirectionsLocation = new DirectionsLocation();
    travelMode: string = "DRIVING";
    waypoints: Array<GeocodedWaypoint> = [];
};

class DirectionsReponse
{
    status: string = "";
    routes: Array<DirectionsRoute> = [];
    geocoded_waypoints: Array<GeocodedWaypoint> = [];
    request: DirectionsRequest = new DirectionsRequest();
}

export default DirectionsReponse;