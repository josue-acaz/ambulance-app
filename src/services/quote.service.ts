import BaseService from "./Base/base.service";
import Quote from "../viewModels/Quote";
import HttpResponse from "../viewModels/HttpResponse";

class QuoteService extends BaseService<Quote> {
    url = "/Quotes";

    async getByToken(token: string): Promise<HttpResponse<Quote>>
    {
        const response = await this.api.get(`${this.url}/${token}`);
        return response.data;
    }

    async share(data: Quote): Promise<HttpResponse<Quote>>
    {
        const response = await this.api.post(this.url + "/share", data);
        return response.data;
    }
};

export default QuoteService;