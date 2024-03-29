import BaseEntity from "./Base/BaseEntity";

class AircraftImage extends BaseEntity {
    type: string = "";
    view: string = "";
    position: number = 0;
    use_in_document: boolean = false;
    aircraft_id: string = "";
    url: string = "";
};

export default AircraftImage;