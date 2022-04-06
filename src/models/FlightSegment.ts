import BaseEntity from "./Base/BaseEntity";
import Aircraft from "./Aircraft";

class FlightSegment extends BaseEntity
{
    type: string = "";
    code: number = 0;
    number: number = 0;
    title: string = "";
    flight_id: string = "";
    aircraft_id: string = "";
    origin_aerodrome_id: string = "";
    destination_aerodrome_id: string = "";
    arrival_datetime: Date | null = null;
    departure_datetime: Date | null = null;
    aircraft: Aircraft = new Aircraft();

    // NOT MAPPED
    distance: number = 0;
    flight_time: number = 0;
    origin_city_id: string = "";
    origin_city_name: string = "";
    destination_city_id: string = "";
    destination_city_name: string = "";
    origin_aerodrome_name: string = "";
    destination_aerodrome_name: string = "";
    estimated_arrival_datetime: Date | null = null;
    estimated_flight_time: number = 0;
}

export default FlightSegment;