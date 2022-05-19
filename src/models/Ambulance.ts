import BaseEntity from "./Base/BaseEntity";

class Ambulance extends BaseEntity {
    code: number = 0;
    name: string = "";
    price_per_km_uti: number = 0;
    price_per_km_basic: number = 0;
    thumbnail: string = "";
};

export default Ambulance;