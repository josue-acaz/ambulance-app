import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";
import { maskPhoneNumber, onlyNumbers } from "../../../utils";

// models
import Customer from "../../../models/Customer";

// services
import CustomerService from "../../../services/customer.service";

// components
import Input from "../../../components/form/Input";

// styles
import { FormGroup, Label } from "../../../design";
import { Row, Col } from "react-bootstrap";

class EditCustomer extends BaseEditComponent<Customer> {
    title = "Novo Cliente";

    constructor(props: any)
    {
        super(props, new CustomerService(), new Customer());
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.name)
        {
            inputs.phone_number = onlyNumbers(inputs.phone_number);
            this.save(inputs);
        }
    }

    RenderComponent()
    {
        return(
            <Row>
                <Col sm="12">
                    <FormGroup>
                        <Label>Nome</Label>
                        <Input 
                            name="name" 
                            value={this.state.inputs.name} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.name}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label>Email</Label>
                        <Input 
                            name="email" 
                            value={this.state.inputs.email} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.email}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label>Telefone</Label>
                        <Input 
                            name="phone_number" 
                            maxLength={14}
                            value={this.state.inputs.phone_number} 
                            onChange={this.handleChange} 
                            onInput={maskPhoneNumber}
                            error={this.state.submitted && !this.state.inputs.phone_number}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default withRouter(EditCustomer);