import BaseEntity from "./Base/BaseEntity";

class AmbulanceBase extends BaseEntity {
    name: string = "";
    latitude: number = 0;
    longitude: number = 0;
};

export default AmbulanceBase;