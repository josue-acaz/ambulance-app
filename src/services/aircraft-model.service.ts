import BaseService from "./Base/base.service";
import AircraftModel from "../models/AircraftModel";

class AircraftModelsService extends BaseService<AircraftModel> {
    url = "/AircraftModels";
};

export default AircraftModelsService;