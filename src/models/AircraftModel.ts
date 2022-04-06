import BaseEntity from "./Base/BaseEntity";

class AircraftModel extends BaseEntity
{
    name: string = "";
    type: string = "";
    carrier_size: string = "";
    number_of_engines: string = "";
    engine_type: string = "";
    carrier_dimensions: string = "";
    manufacturer_id: string = "";
    manufacturer_name: string = "";
}

export default AircraftModel;