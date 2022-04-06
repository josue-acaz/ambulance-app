import Customer from "../../../../../models/Customer";

interface EditCustomerFormProps {
    customer_name: string;
    onSaved(customer: Customer): void;
};

export type { EditCustomerFormProps }