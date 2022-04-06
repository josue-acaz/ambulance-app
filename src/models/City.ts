import BaseEntity from "./Base/BaseEntity";

class City extends BaseEntity {
    name: string = "";
    prefix: string = "";
    state_id: string = "";
    timezone_id: string = "";
};

export default City;