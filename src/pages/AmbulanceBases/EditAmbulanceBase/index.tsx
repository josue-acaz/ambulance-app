import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";

// models
import AmbulanceBase from "../../../models/AmbulanceBase";

// services
import AmbulanceBaseService from "../../../services/ambulance-base.service";

// components
import Input from "../../../components/form/Input";
import Autocomplete from "../../../components/form/Autocomplete";

// styles
import { FormGroup, Label } from "../../../design";
import { Row, Col } from "react-bootstrap";

class EditAmbulanceBase extends BaseEditComponent<AmbulanceBase> {
    title = "Nova Base Ambulância";

    constructor(props: any)
    {
        super(props, new AmbulanceBaseService(), new AmbulanceBase());
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.name && inputs.latitude && inputs.longitude)
        {
            this.save(inputs);
        }
    }

    RenderComponent()
    {
        return(
            <Row>
                <Col sm="8">
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
                <Col sm="4">
                    <FormGroup>
                        <Label>Cidade</Label>
                        <Autocomplete
                            name="city_id"
                            optionField="full_name"
                            placeholder="Cidade"
                            requestUrl="/Cities/autocomplete"
                            value={this.state.inputs.city_full_name}
                            onOptionSelected={this.handleOptionSelected}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label>Latitude</Label>
                        <Input 
                            name="latitude" 
                            value={this.state.inputs.latitude} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.latitude}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label>Longitude</Label>
                        <Input 
                            name="longitude" 
                            value={this.state.inputs.longitude} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.longitude}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default withRouter(EditAmbulanceBase);