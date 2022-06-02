import BaseEntity from "./Base/BaseEntity";
import Ambulance from "./Ambulance";
import Location from "./Location";

class TransportSegment extends BaseEntity {
    code: number = 0;
    number: number = 0;
    type: string = "";
    title: string = "";
    distance: number = 0;
    transport_id: string = "";
    ambulance_id: string = "";
    origin_location_id: string = "";
    destination_location_id: string = "";
    ambulance: Ambulance = new Ambulance();
    origin_location: Location = new Location();
    destination_location: Location = new Location();
    
    // NOT MAPPED
    origin_city_id: string = "";
    origin_city_name: string = "";
    destination_city_id: string = "";
    destination_city_name: string = "";
    origin_location_name: string = "";
    destination_location_name: string = "";
    estimated_travel_time: number = 0;
};

export default TransportSegment;