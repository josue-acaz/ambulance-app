import BaseEntity from "./Base/BaseEntity";
import Aircraft from "./Aircraft";
import FlightSegment from "./FlightSegment";

class Flight extends BaseEntity
{
    code: number = 0;
    aircraft_id: string = "";
    aircraft_quote_id: string = "";
    aircraft: Aircraft = new Aircraft();
    flight_segments: Array<FlightSegment> = [];
    is_roundtrip: boolean = false;
}

export default Flight;