import BaseEntity from "./Base/BaseEntity";
import TransportSegment from "./TransportSegment";
import AdditionalInformation from "./AdditionalInformation";
import AmbulanceBase from "./AmbulanceBase";
import Transport from "./Transport";
import Location from "./Location";
import DirectionsResponse from "../viewModels/DirectionsReponse";

class AmbulanceQuote extends BaseEntity {
    code: number = 0;
    final_price: number = 0;
    provide_price_per_km: boolean = false;
    custom_price_per_km: number = 0;
    type_of_transport: string = "basic";
    add_informations: boolean = false;
    auth_user_id: string = "";
    customer_id: string = "";
    ambulance_at_base: boolean = true;
    is_intercity_removal: boolean = false;
    additional_informations: Array<AdditionalInformation> = [];
    
    ambulance_base_id: string = "";
    ambulance_base_name: string = "";
    ambulance_location_id: string = ""; // NOT MAPPED
    ambulance_location_name: string = ""; // NOT MAPPED
    ambulance_base: AmbulanceBase = new AmbulanceBase();
    ambulance_location: Location = new Location(); // NOT MAPPED

    customer_name: string = "";
    auth_user_name: string = "";
    total_distance: number = 0;
    estimated_price: number = 0;

    transport: Transport = new Transport();
    transport_segment: TransportSegment = new TransportSegment();
    price_per_km_based_on_final_price: number = 0;
    current_date: Date | null = null;
    document_url: string = "";
    directions: DirectionsResponse = new DirectionsResponse();
};

export default AmbulanceQuote;