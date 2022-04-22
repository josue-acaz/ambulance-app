import BaseService from "./Base/base.service";
import AircraftImage from "../models/AircraftImage";
import HttpResponse from "../viewModels/HttpResponse";

class AircraftImageService extends BaseService<AircraftImage> {
    url = "/AircraftImages";

    async update(data: any): Promise<HttpResponse<AircraftImage>>
    {
        const response = await this.api.put(this.url, data);
        return response.data;
    }
};

export default AircraftImageService;