import React, { useState, useEffect } from "react";
import Customer from "../../../../models/Customer";
import CustomerService from "../../../../services/customer.service";
import { maskPhoneNumber } from "../../../../utils";

// types
import { EditCustomerFormProps } from "./types";

// components
import Input from "../../../../components/form/Input";
import ErrorComponent from "../../../../components/ErrorComponent";
import CircularProgress from "@mui/material/CircularProgress";

// styles
import { Row, Col } from "react-bootstrap";
import { FormGroup, Label, Button } from "../../../../design";
import { DrawerFormContent, DrawerFormActions } from "./styles";

export default function EditCustomerForm(props: EditCustomerFormProps)
{
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [inputs, setInputs] = useState<Customer>(new Customer());
    const [errors, setErrors] = useState<Array<string>>([]);

    const customerService: CustomerService = new CustomerService();

    function handleChange(event: any) 
    {
        let { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSave()
    {
        setSubmitted(true);
        if(inputs.name)
        {
            save(inputs);
        }
    }

    async function save(inputs: Customer)
    {
        setProcessing(true);
        try {
            const response = await customerService.save(inputs);
            setProcessing(false);
            props.onSaved(response.data);
        } catch (error: any) {
            if(error.response.data)
            {
                setErrors(error.response.data);
            }
            setProcessing(false);
        }
    }

    useEffect(() => {
        handleChange({ target: { name: "name", value: props.customer_name } });
    }, [props.customer_name])

    return(
        <React.Fragment>
            <DrawerFormContent>
                <Row>
                    <Col sm="12">
                        <FormGroup>
                            <Label>Nome</Label>
                            <Input 
                                name="name" 
                                value={inputs.name} 
                                onChange={handleChange} 
                                error={submitted && !inputs.name}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label>Email</Label>
                            <Input 
                                name="email" 
                                value={inputs.email} 
                                onChange={handleChange} 
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label>Telefone</Label>
                            <Input 
                                name="phone_number" 
                                maxLength={14}
                                value={inputs.phone_number} 
                                onChange={handleChange} 
                                onInput={maskPhoneNumber}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </DrawerFormContent>
            <DrawerFormActions>
                <ErrorComponent errors={errors} />
                <Button onClick={handleSave}>{processing ? <CircularProgress size={24} color="inherit" /> : "Salvar"}</Button>
            </DrawerFormActions>
        </React.Fragment>
    );
}