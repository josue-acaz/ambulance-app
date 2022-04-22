import BaseService from "./Base/base.service";
import AircraftModel from "../models/AircraftModel";

class AircraftModelService extends BaseService<AircraftModel> {
    url = "/AircraftModels";
};

export default AircraftModelService;