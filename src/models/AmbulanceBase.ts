import BaseEntity from "./Base/BaseEntity";

class AmbulanceBase extends BaseEntity {
    name: string = "";
    latitude: number = 0;
    longitude: number = 0;
    city_id: string = "";
    city_full_name: string = "";
};

export default AmbulanceBase;