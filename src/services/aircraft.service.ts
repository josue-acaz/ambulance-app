import BaseService from "./Base/base.service";
import Aircraft from "../models/Aircraft";

class AircraftService extends BaseService<Aircraft> {
    url = "/Aircraft";
};

export default AircraftService;