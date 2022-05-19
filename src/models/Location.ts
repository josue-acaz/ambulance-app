import BaseEntity from "./Base/BaseEntity";

class Location extends BaseEntity {
    name: string = "";
    latitude: number = 0;
    longitude: number = 0;
    city_id: string = "";
    description: string = "";

    // NOT MAPPED
    place_id: string = ""; // For google places
};

export default Location;