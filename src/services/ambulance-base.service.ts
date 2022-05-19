import BaseService from "./Base/base.service";
import AmbulanceBase from "../models/AmbulanceBase";

class AmbulanceBaseService extends BaseService<AmbulanceBase> {
    url = "/AmbulanceBases";
};

export default AmbulanceBaseService;