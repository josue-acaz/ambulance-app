import BaseEntity from "./Base/BaseEntity";
import Flight from "./Flight";
import AdditionalInformation from "./AdditionalInformation";
import { TRIP_MODES } from "../shared/providers/trip_modes";
import { TYPE_OF_TRANSPORTS } from "../shared/providers/type_of_transports";
import FlightSegment from "./FlightSegment";

class AircraftQuote extends BaseEntity
{
    code: number = 0;
    final_price: number = 0;
    add_informations: boolean = false;
    aircraft_at_origin: boolean = false;
    ambulance_at_origin: boolean = false;
    provide_price_per_km: boolean = false;
    ambulance_at_destination: boolean = false;
    additional_informations: Array<AdditionalInformation> = [];
    custom_price_per_km: number = 0;
    aircraft_aerodrome_id: string = "";
    aircraft_aerodrome_name: string = "";
    customer_id: string = "";
    auth_user_id: string = "";
    flight: Flight = new Flight();
    type_of_transport: string = TYPE_OF_TRANSPORTS.AEROMEDICAL;
    
    // NOT MAPPED
    document_url: string = "";
    customer_name: string = "";
    total_distance: number = 0;
    estimated_price: number = 0;
    auth_user_name: string = "";
    is_roundtrip: boolean = false;
    trip_mode: string = TRIP_MODES.ONEWAY;
    price_per_km_based_on_final_price: number = 0;

    // USADO PARA EFETUAR AS ALTERAÇÕES NO FORMULÁRIO
    flight_segment: FlightSegment = new FlightSegment();
}

export default AircraftQuote;