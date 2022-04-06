import Api from "../../api";

// models
import HttpResponse from "../../viewModels/HttpResponse";
import PaginationResult from "../../viewModels/PaginationResult";

abstract class BaseService<T> {
    url = "";
    api = Api;

    [key: string]: any;

    async save(data: any): Promise<HttpResponse<T>>
    {
        const response = await this.api.post(this.url, data);
        return response.data;
    }

    async getById(id: string): Promise<HttpResponse<T>>
    {
        const response = await this.api.get(`${this.url}/${id}`);
        return response.data;
    }

    async pagination(params: any): Promise<HttpResponse<PaginationResult>> {
        const response = await this.api.get(this.url, {
            params,
        });
        
        return response.data;
    }

    async delete(id: string): Promise<void>
    {
        await this.api.delete(`${this.url}/${id}`);
    }
};

export default BaseService;