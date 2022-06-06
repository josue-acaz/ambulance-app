import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";
import { aerodrome_operations } from "../../../shared/providers/aerodrome_operations";
import { aerodrome_surfaces } from "../../../shared/providers/aerodrome_surfaces";
import { aerodrome_types } from "../../../shared/providers/aerodrome_types";
import { type_of_aerodromes } from "../../../shared/providers/type_of_aerodromes";
import { aerodrome_categories } from "../../../shared/providers/aerodrome_categories";

// models
import Aerodrome from "../../../models/Aerodrome";

// services
import AerodromeService from "../../../services/aerodrome.service";

// components
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Autocomplete from "../../../components/form/Autocomplete";

// styles
import { FormGroup, Label } from "../../../design";
import { Row, Col } from "react-bootstrap";

class EditAircraftModel extends BaseEditComponent<Aerodrome> {
    title = "Nova Aeródromo";

    constructor(props: any)
    {
        super(props, new AerodromeService(), new Aerodrome());
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.name)
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
                        <Label>CIAD</Label>
                        <Input 
                            name="ciad" 
                            value={this.state.inputs.ciad} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.ciad}
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>OACI</Label>
                        <Input 
                            name="oaci_code" 
                            value={this.state.inputs.oaci_code} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.oaci_code}
                        />
                    </FormGroup>
                </Col>
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
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="4">
                    <FormGroup>
                        <Label>Altitude</Label>
                        <Input 
                            name="altitude" 
                            type="number"
                            min={0}
                            value={this.state.inputs.altitude} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.altitude}
                            adormentPosition="end"
                            adorment={<p>m</p>}
                        />
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label>Comprimento da Pista</Label>
                        <Input 
                            name="length" 
                            type="number"
                            min={0}
                            value={this.state.inputs.length} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.length}
                            adormentPosition="end"
                            adorment={<p>m</p>}
                        />
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label>Largura da Pista</Label>
                        <Input 
                            name="width" 
                            type="number"
                            min={0}
                            value={this.state.inputs.width} 
                            onChange={this.handleChange} 
                            error={this.state.submitted && !this.state.inputs.width}
                            adormentPosition="end"
                            adorment={<p>m</p>}
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Operação</Label>
                        <Select 
                            name="operation"
                            options={aerodrome_operations} 
                            value={this.state.inputs.operation}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.operation} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Classificação</Label>
                        <Select 
                            name="type"
                            options={aerodrome_types} 
                            value={this.state.inputs.type}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.type} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Tipo de Pista</Label>
                        <Select 
                            name="surface"
                            options={aerodrome_surfaces} 
                            value={this.state.inputs.surface}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.surface} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Tipo</Label>
                        <Select 
                            name="access"
                            options={type_of_aerodromes} 
                            value={this.state.inputs.access}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.access} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Categoria</Label>
                        <Select 
                            name="category"
                            options={aerodrome_categories} 
                            value={this.state.inputs.category}
                            onChange={this.handleChangeOption} 
                            error={this.state.submitted && !this.state.inputs.category} 
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Resistência</Label>
                        <Input 
                            name="resistance" 
                            value={this.state.inputs.resistance} 
                            onChange={this.handleChange} 
                            placeholder="Ex.: PCN 33/F/B/X/T"
                            error={this.state.submitted && !this.state.inputs.resistance}
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label>Designação</Label>
                        <Input 
                            name="designation" 
                            value={this.state.inputs.designation} 
                            onChange={this.handleChange} 
                            placeholder="Ex.: 06/24"
                            error={this.state.submitted && !this.state.inputs.designation}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default withRouter(EditAircraftModel);