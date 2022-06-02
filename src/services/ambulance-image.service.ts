import BaseService from "./Base/base.service";
import AmbulanceImage from "../models/AmbulanceImage";
import HttpResponse from "../viewModels/HttpResponse";

class AmbulanceImageService extends BaseService<AmbulanceImage> {
    url = "/AmbulanceImages";

    async update(data: any): Promise<HttpResponse<AmbulanceImage>>
    {
        const response = await this.api.put(this.url, data);
        return response.data;
    }
};

export default AmbulanceImageService;