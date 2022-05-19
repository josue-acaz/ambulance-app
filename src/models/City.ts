import BaseEntity from "./Base/BaseEntity";

class City extends BaseEntity {
    name: string = "";
    latitude: number = 0;
    longitude: number = 0;
    is_capital: boolean = false;
    state_id: string = "";
    timezone_id: string = "";
};

export default City;