import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";

// models
import Ambulance from "../../../models/Ambulance";

// services
import AmbulanceService from "../../../services/ambulance.service";

// components
import CurrencyInput from "../../../components/form/CurrencyInput";

// styles
import { FormGroup, Label } from "../../../design";
import { Row, Col } from "react-bootstrap";

class EditAmbulance extends BaseEditComponent<Ambulance> {
    title = "Nova Ambulância";

    constructor(props: any)
    {
        super(props, new AmbulanceService(), new Ambulance());
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.price_per_km_basic && inputs.price_per_km_uti)
        {
            this.save(inputs);
        }
    }

    RenderComponent()
    {
        return(
            <Row>
                <Col sm="3">
                    <FormGroup>
                        <Label>Preço do Km (UTI)</Label>
                        <CurrencyInput 
                            name="price_per_km_uti"
                            placeholder="Preço por Km UTI"
                            onChange={this.handleChange} 
                            value={this.state.inputs.price_per_km_uti}
                            error={this.state.submitted && !this.state.inputs.price_per_km_uti}
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Preço do Km (Básica)</Label>
                        <CurrencyInput 
                            name="price_per_km_basic"
                            placeholder="Preço por Km Básica"
                            onChange={this.handleChange} 
                            value={this.state.inputs.price_per_km_basic}
                            error={this.state.submitted && !this.state.inputs.price_per_km_basic}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default withRouter(EditAmbulance);