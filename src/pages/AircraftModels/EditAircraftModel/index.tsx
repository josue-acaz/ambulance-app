import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";
import { type_of_aircraft } from "../../../shared/providers/type_of_aircraft";
import { number_of_engines } from "../../../shared/providers/number_of_engines";
import { type_of_engines } from "../../../shared/providers/type_of_engines";
import { carrier_sizes } from "../../../shared/providers/carrier_sizes";

// models
import AircraftModel from "../../../models/AircraftModel";

// services
import AircraftModelService from "../../../services/aircraft-model.service";

// components
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Autocomplete from "../../../components/form/Autocomplete";

// styles
import { FormGroup, Label } from "../../../design";
import { Row, Col } from "react-bootstrap";

class EditAircraftModel extends BaseEditComponent<AircraftModel> {
    title = "Nova Modelo de Aeronave";

    constructor(props: any)
    {
        super(props, new AircraftModelService(), new AircraftModel());
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.name && inputs.type && inputs.manufacturer_id && inputs.number_of_engines && inputs.engine_type && inputs.carrier_size)
        {
            this.save(inputs);
        }
    }

    RenderComponent()
    {
        return(
            <Row>
                <Col sm="6">
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
                <Col sm="3">
                    <FormGroup>
                        <Label>Tipo</Label>
                        <Select 
                            name="type"
                            options={type_of_aircraft} 
                            value={this.state.inputs.type}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.type} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Fabricante</Label>
                        <Autocomplete
                            name="manufacturer_id"
                            optionField="name"
                            placeholder="Fabricante"
                            requestUrl="/Manufacturers/autocomplete"
                            value={this.state.inputs.manufacturer_name}
                            onOptionSelected={this.handleOptionSelected}
                            error={this.state.submitted && !this.state.inputs.manufacturer_id}
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Qtd. Motores</Label>
                        <Select 
                            name="number_of_engines" 
                            options={number_of_engines} 
                            value={this.state.inputs.number_of_engines}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.number_of_engines} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Tipo de motor</Label>
                        <Select 
                            name="engine_type" 
                            options={type_of_engines} 
                            value={this.state.inputs.engine_type}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.engine_type} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Tamanho Bagageiro</Label>
                        <Select 
                            name="carrier_size" 
                            options={carrier_sizes} 
                            value={this.state.inputs.carrier_size}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.carrier_size} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Dimensões do Bagageiro</Label>
                        <Input 
                            name="carrier_dimensions" 
                            value={this.state.inputs.carrier_dimensions} 
                            onChange={this.handleChange} 
                            placeholder="Ex.: 100cm x 80cm x 60cm"
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default withRouter(EditAircraftModel);