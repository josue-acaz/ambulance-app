import BaseEntity from "./Base/BaseEntity";

class Customer extends BaseEntity {
    name: string = "";
    email: string = "";
    phone_number: string = "";
};

export default Customer;