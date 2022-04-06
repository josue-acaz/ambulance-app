import React from "react";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../Base/BaseComponent";
import CustomerService from "../../../services/customer.service";
import Customer from "../../../models/Customer";
import { toPhoneNumber } from "../../../utils";

// types
import { RowProps } from "../../../components/Task/types";

class ListCustomer extends BaseComponent<Customer>
{
    title = "Clientes";

    constructor(props: any)
    {
        super(props, new CustomerService());
    }

    head_labels = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "email",
            value: "Email",
        },
        {
            key: "phone_number",
            value: "Telefone",
        },
    ];

    createRow(data: Customer)
    {
        const row: RowProps = {
            id: data.id,
            cells: [
                {
                    value: data.name,
                },
                {
                    value: data.email,
                },
                {
                    value: toPhoneNumber(data.phone_number),
                },
            ]
        };

        return row;
    }
}

export default withRouter(ListCustomer);