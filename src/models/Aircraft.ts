import BaseEntity from "./Base/BaseEntity";
import AircraftImage from "./AircraftImage";

class Aircraft extends BaseEntity
{
    prefix: string = "";
    year: number = 0;
    crew: number = 0;
    passengers: number = 0;
    empty_weight: number = 0;
    autonomy: number = 0;
    maximum_takeoff_weight: number = 0;
    maximum_speed: number = 0;
    cruising_speed: number = 0;
    range: number = 0;
    fixed_price_radius: number = 0;
    price_per_km_passengers: number = 0;
    fixed_price_passengers: number = 0;
    price_per_km_aeromedical: number = 0;
    fixed_price_aeromedical: number = 0;
    description: string = "";
    pressurized: boolean = false;
    operates_aeromedical_transport: boolean = false;
    aircraft_model_id: string = "";
    images: Array<AircraftImage> = [];

    // Not Mapped
    full_name: string = "";
    model_name: string = "";
    thumbnail: string = "";
    seating_map: string = "";
}

export default Aircraft;