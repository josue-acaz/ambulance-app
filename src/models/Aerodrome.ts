import BaseEntity from "./Base/BaseEntity";

class Aerodrome extends BaseEntity
{
    oaci_code: string = "";
    ciad: string = "";
    name: string = "";
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;
    length: number = 0;
    width: number = 0;
    operation: string = "VFR Diurno";
    designation: string = "";
    resistance: string = "";
    surface: string = "cascalho";
    type: string = "aerodrome";
    category: string = "I";
    access: string = "private";
    city_id: string = "";

    // Not Mapped
    city_name: string = "";
    city_full_name: string = "";
    full_name: string = "";
}

export default Aerodrome;