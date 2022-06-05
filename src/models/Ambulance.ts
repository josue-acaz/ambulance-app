import BaseEntity from "./Base/BaseEntity";
import AmbulanceImage from "./AmbulanceImage";

class Ambulance extends BaseEntity {
    code: number = 0;
    fixed_price_uti: number = 0;
    price_per_km_uti: number = 0;
    fixed_price_basic: number = 0;
    price_per_km_basic: number = 0;
    thumbnail: string = "";

    images: Array<AmbulanceImage> = [];
};

export default Ambulance;