import BaseService from "./Base/base.service";
import Aircraft from "../models/Aircraft";

class AircraftService extends BaseService<Aircraft> {
    url = "/Aircraft";

    async getThumbnail(params: object)
    {
        const response = await this.api.get("/Aircraft/thumbnail", { params });
        return response.data;
    }
};

export default AircraftService;