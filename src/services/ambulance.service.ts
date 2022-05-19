import BaseService from "./Base/base.service";
import Ambulance from "../models/Ambulance";

class AmbulanceService extends BaseService<Ambulance> {
    url = "/Ambulances";
};

export default AmbulanceService;