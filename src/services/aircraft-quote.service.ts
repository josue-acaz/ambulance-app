import BaseService from "./Base/base.service";
import AircraftQuote from "../models/AircraftQuote";

class AircraftQuoteService extends BaseService<AircraftQuote> {
    url = "/AircraftQuotes";

    async quote(data: AircraftQuote): Promise<AircraftQuote>
    {
        const response = await this.api.post(this.url + "/quote", data);
        return response.data;
    }
};

export default AircraftQuoteService;