import BaseService from "./Base/base.service";
import AmbulanceQuote from "../models/AmbulanceQuote";

class AmbulanceQuoteService extends BaseService<AmbulanceQuote> {
    url = "/AmbulanceQuotes";

    async quote(data: AmbulanceQuote): Promise<AmbulanceQuote>
    {
        const response = await this.api.post(this.url + "/quote", data);
        return response.data;
    }
};

export default AmbulanceQuoteService;
