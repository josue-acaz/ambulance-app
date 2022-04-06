import BaseService from "./Base/base.service";
import Customer from "../models/Customer";

class CustomerService extends BaseService<Customer> {
    url = "/Customers";
};

export default CustomerService;