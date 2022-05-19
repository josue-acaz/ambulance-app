import BaseEntity from "./Base/BaseEntity";

class AmbulanceImage extends BaseEntity {
    view: string = "";
    position: number = 0;
    use_in_document: boolean = false;
    ambulance_id: string = "";
    url: string = "";
};

export default AmbulanceImage;