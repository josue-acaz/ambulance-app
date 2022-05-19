import BaseEntity from "./Base/BaseEntity";
import TransportSegment from "./TransportSegment";
import AdditionalInformation from "./AdditionalInformation";
import AmbulanceBase from "./AmbulanceBase";
import Transport from "./Transport";

class AmbulanceQuote extends BaseEntity {
    code: number = 0;
    final_price: number = 0;
    provide_price_per_km: boolean = false;
    custom_price_per_km: number = 0;
    type_of_transport: string = "";
    add_informations: boolean = false;
    auth_user_id: string = "";
    customer_id: string = "";
    is_intercity_removal: boolean = false;
    additional_informations: Array<AdditionalInformation> = [];
    
    ambulance_base_id: string = "";
    ambulance_base_name: string = "";

    customer_name: string = "";
    auth_user_name: string = "";
    total_distance: number = 0;
    estimated_price: number = 0;

    transport: Transport = new Transport();
    transport_segment: TransportSegment = new TransportSegment();
    price_per_km_based_on_final_price: number = 0;
    current_date: Date | null = null;
    document_url: string = "";
};

export default AmbulanceQuote;