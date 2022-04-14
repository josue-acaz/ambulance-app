import React from "react";
import Switch from "@mui/material/Switch";
import BaseEditComponent from "../../Base/BaseEditComponent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { withRouter } from "react-router-dom";
import { numberToCurrencyBRL } from "../../../utils";
import { trip_modes } from "../../../shared/providers/trip_modes";
import { type_of_transports } from "../../../shared/providers/type_of_transports";

// models
import Customer from "../../../models/Customer";
import AircraftQuote from "../../../models/AircraftQuote";
import AdditionalInformation from "../../../models/AdditionalInformation";

// services
import AircraftQuoteService from "../../../services/aircraft-quote.service";

// components
import Select from "../../../components/form/Select";
import DrawerForm from "../../../components/DrawerForm";
import Modal from "../../../components/Modal";
import EditableList from "../../../components/EditableList";
import Autocomplete from "../../../components/form/Autocomplete";
import CurrencyInput from "../../../components/form/CurrencyInput";
import EditCustomerForm from "../../Customers/EditCustomer/EditCustomerForm";
import Generated from "./Generated";

// views
import Leg from "../../../design/views/Leg";

// icons
import AdjustIcon from "@mui/icons-material/Adjust";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import RadarIcon from "@mui/icons-material/Radar";

// styles
import { Row, Col } from "react-bootstrap";
import { FormGroup, Label, Title, Subtitle, SwitchHorizontalView } from "../../../design";
import { SectionView, EditAircraftQuoteView, SectionHeader, SectionContent } from "./styles";

class EditAircraftQuote extends BaseEditComponent<AircraftQuote> {
    title = "Nova Cotação UTI Aérea";

    constructor(props: any)
    {
        super(props, new AircraftQuoteService(), new AircraftQuote());
        this.handleChangeList = this.handleChangeList.bind(this);
        this.handleSavedCustomer = this.handleSavedCustomer.bind(this);
    }

    onChange(name: string, inputs: AircraftQuote)
    {
        if(name === "final_price" || name === "custom_price_per_km") return;
        this.handleQuote(inputs);
        this.setErrors([]);
    }

    async handleQuote(data: AircraftQuote)
    {
        this.setWarnings([]);
        try {
            const response = await this.service.quote(data);
            this.setInputs(response.data);
            this.setWarnings(response.warnings);
        } catch (error: any) {
            this.setErrors(error.response.data);
        }
    }

    handleChangeList(items: Array<AdditionalInformation>)
    {
        let inputs = this.state.inputs;
        inputs.additional_informations = items;
        this.setInputs(inputs);
    }

    handleSave()
    {
        let inputs = this.state.inputs;
        if(inputs.aircraft_aerodrome_id === "")
        {
            inputs.aircraft_aerodrome_id = null; // Verificar isso aqui
        }

        if(inputs.final_price)
        {
            this.save(inputs);
        }
    }

    handleSavedCustomer(customer: Customer)
    {
        let inputs = this.state.inputs;
        inputs.customer_name = customer.name;
        inputs.customer_id = customer.id;

        this.setInputs(inputs);
        this.handleCloseEditForm();
    }

    async save(data: AircraftQuote)
    {
        this.setErrors([]);
        this.setWarnings([]);
        this.setProcessing(true);
        try {
            const response = await this.service.save(data);
            this.setWarnings(response.warnings);
            this.setInputs(response.data);
            this.setModalNumber(1);
        } catch (error: any) {
            this.setErrors(error.response.data);
        }
        this.setProcessing(false);
    }

    RenderComponent()
    {
        return(
            <EditAircraftQuoteView>
                <Modal number={1} currentModalNumber={this.state.modalNumber}>
                    <Generated data={this.state.inputs} onGoBack={this.handleGoBack} />
                </Modal>
                <Row>
                    <Col sm="10">
                        <FormGroup>
                            <Label>Cliente</Label>
                            <Autocomplete
                                name="customer_id"
                                optionField="name"
                                placeholder="Nome do cliente"
                                requestUrl="/Customers/autocomplete"
                                value={this.state.inputs.customer_name}
                                onAdd={this.handleOpenEditForm}
                                onChange={(e) => {
                                    let inputs = this.state.inputs;
                                    inputs.customer_name = e.target.value;
                                    this.setInputs(inputs);
                                }}
                                onOptionSelected={this.handleOptionSelected}
                                error={this.state.submitted && !this.state.inputs.customer_id && !this.state.inputs.customer_name}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Tipo de Transporte</Label>
                            <Select name="type_of_transport" value={this.state.inputs.type_of_transport} options={type_of_transports} onChange={this.handleChangeOption}  />
                        </FormGroup>
                    </Col>
                </Row>
                <SectionView>
                    <SectionHeader>
                        <Title>Informações do Trecho</Title>
                    </SectionHeader>
                    <SectionContent>
                        <FormGroup>
                            <FormControl>
                                <RadioGroup
                                    row
                                    name="trip_mode"
                                    className="radio-group-horizontal"
                                >
                                    <FormControlLabel name="is_roundtrip" value={this.state.inputs.trip_mode} control={<Radio color="warning" checked={!this.state.inputs.is_roundtrip} onChange={(e, c) => this.handleChangeChecked(e, !c)} />} label={trip_modes[0].label} />
                                    <FormControlLabel name="is_roundtrip" value={this.state.inputs.trip_mode} control={<Radio color="warning" checked={this.state.inputs.is_roundtrip} onChange={(e, c) => this.handleChangeChecked(e, c)} />} label={trip_modes[1].label} />
                                </RadioGroup>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Subtitle>Origem</Subtitle>
                            <Row>
                                <Col sm="4">
                                    <FormGroup>
                                        <Autocomplete
                                            name="origin_city_id"
                                            optionField="full_name"
                                            placeholder="Cidade De Origem"
                                            requestUrl="/Cities/autocomplete"
                                            value={this.state.inputs.flight_segment.origin_city_name}
                                            onOptionSelected={this.handleOptionSelected}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="8">
                                    <FormGroup>
                                        <Autocomplete
                                            name="origin_aerodrome_id"
                                            optionField="full_name"
                                            icon={<AdjustIcon className="icon" />}
                                            placeholder="Aeródromo De Origem"
                                            requestUrl="/Aerodromes/autocomplete"
                                            value={this.state.inputs.flight_segment.origin_aerodrome_name}
                                            onOptionSelected={(e) => {
                                                let inputs = this.state.inputs;
                                                inputs.flight_segment.origin_city_name = e.value.city_full_name;
                                                
                                                this.setInputs(inputs);
                                                this.handleOptionSelected(e);
                                            }}
                                            params={{ city_id: this.state.inputs.flight_segment.origin_city_id }}
                                            error={this.state.submitted && !this.state.inputs.flight_segment.origin_aerodrome_id}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Subtitle>Destino</Subtitle>
                            <Row>
                                <Col sm="4">
                                    <FormGroup>
                                        <Autocomplete
                                            name="destination_city_id"
                                            optionField="full_name"
                                            placeholder="Cidade De Destino"
                                            requestUrl="/Cities/autocomplete"
                                            value={this.state.inputs.flight_segment.destination_city_name}
                                            onOptionSelected={this.handleOptionSelected}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="8">
                                    <FormGroup>
                                        <Autocomplete
                                            name="destination_aerodrome_id"
                                            optionField="full_name"
                                            icon={<LocationOnIcon className="icon" />}
                                            placeholder="Aeródromo De Destino"
                                            requestUrl="/Aerodromes/autocomplete"
                                            value={this.state.inputs.flight_segment.destination_aerodrome_name}
                                            onOptionSelected={(e) => {
                                                let inputs = this.state.inputs;
                                                inputs.flight_segment.destination_city_name = e.value.city_full_name;
                                                
                                                this.setInputs(inputs);
                                                this.handleOptionSelected(e);
                                            }}
                                            params={{ city_id: this.state.inputs.flight_segment.destination_city_id }}
                                            error={this.state.submitted && !this.state.inputs.flight_segment.destination_aerodrome_id}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <FormGroup>
                            {<p>Distância total: <strong>{this.state.inputs.total_distance} Km</strong></p>}
                            <Row>
                                {this.state.inputs.flight.flight_segments.map(flight_segment => (
                                    <Col sm="3">
                                        <FormGroup>
                                            <Leg type={flight_segment.type} title={flight_segment.title} origin={flight_segment.origin_aerodrome_name} destination={flight_segment.destination_aerodrome_name} distance={flight_segment.distance} />
                                        </FormGroup>
                                    </Col>
                                ))}
                            </Row>
                        </FormGroup>
                    </SectionContent>
                </SectionView>
                <SectionView>
                    <SectionHeader>
                        <Title>Informações Aeromédicas</Title>
                    </SectionHeader>
                    <SectionContent>
                        <SwitchHorizontalView>
                            <p>Ambulância na Origem? <strong>{this.state.inputs.ambulance_at_origin ? "SIM" : "NÃO"}</strong></p>
                            <Switch name="ambulance_at_origin" color="warning" checked={this.state.inputs.ambulance_at_origin} onChange={this.handleChangeChecked} />
                        </SwitchHorizontalView>
                        <SwitchHorizontalView>
                            <p>Ambulância no Destino? <strong>{this.state.inputs.ambulance_at_destination ? "SIM" : "NÃO"}</strong></p>
                            <Switch name="ambulance_at_destination" color="warning" checked={this.state.inputs.ambulance_at_destination} onChange={this.handleChangeChecked} />
                        </SwitchHorizontalView>
                    </SectionContent>
                </SectionView>
                <SectionView>
                    <SectionHeader>
                        <Title>Informações da Aeronave</Title>
                    </SectionHeader>
                    <SectionContent>
                        <SwitchHorizontalView>
                            <p>A aeronave está na origem? <strong>{this.state.inputs.aircraft_at_origin ? "SIM" : "NÃO"}</strong></p>
                            <Switch name="aircraft_at_origin" color="warning" checked={this.state.inputs.aircraft_at_origin} onChange={this.handleChangeChecked} />
                        </SwitchHorizontalView>
                        <Row>
                            <Col sm="4">
                                <FormGroup>
                                    <Autocomplete
                                        name="aircraft_id"
                                        optionField="full_name"
                                        icon={<AirplanemodeActiveIcon className="icon" />}
                                        placeholder="Escolha a aeronave"
                                        requestUrl="/Aircraft/autocomplete"
                                        value={this.state.inputs.flight_segment.aircraft.full_name}
                                        onOptionSelected={(e) => {
                                            let inputs = this.state.inputs;
                                            inputs.flight_segment.aircraft = e.value;
                                            
                                            this.setInputs(inputs);
                                            this.handleOptionSelected(e);
                                        }}
                                        error={this.state.submitted && !this.state.inputs.flight_segment.aircraft_id}
                                    />
                                </FormGroup>
                            </Col>
                            {!this.state.inputs.aircraft_at_origin && (
                                <Col sm="8">
                                    <FormGroup>
                                        <Autocomplete
                                            name="aircraft_aerodrome_id"
                                            optionField="full_name"
                                            icon={<RadarIcon className="icon" />}
                                            placeholder="Onde a Aeronave Está?"
                                            requestUrl="/Aerodromes/autocomplete"
                                            value={this.state.inputs.aircraft_aerodrome_name}
                                            onOptionSelected={(e) => {
                                                let inputs = this.state.inputs;
                                                inputs.aircraft_aerodrome_name = e.value.full_name;

                                                this.setInputs(inputs);
                                                this.handleOptionSelected(e);
                                            }}
                                            error={this.state.submitted && !this.state.inputs.aircraft_aerodrome_id}
                                        />
                                    </FormGroup>
                                </Col>
                            )}
                        </Row>
                    </SectionContent>
                </SectionView>

                <SectionView>
                    <SectionContent>
                        <FormGroup>
                            <SwitchHorizontalView>
                                <p>Adicionar informações extras? <strong>{this.state.inputs.add_informations ? "SIM" : "NÃO"}</strong></p>
                                <Switch name="add_informations" color="warning" checked={this.state.inputs.add_informations} onChange={this.handleChangeChecked} />
                            </SwitchHorizontalView>
                            {this.state.inputs.add_informations && <EditableList title="Adicionar Tópicos: " value={this.state.inputs.additional_informations} onChange={this.handleChangeList} />}
                        </FormGroup>
                        <FormGroup>
                            <SwitchHorizontalView>
                                <p>Fornecer preço do KM? <strong>{this.state.inputs.provide_price_per_km ? "SIM" : "NÃO"}</strong></p>
                                <Switch name="provide_price_per_km" color="warning" checked={this.state.inputs.provide_price_per_km} onChange={this.handleChangeChecked} />
                            </SwitchHorizontalView>
                            <Row>
                                {this.state.inputs.provide_price_per_km && (
                                    <Col sm="4">
                                        <FormGroup>
                                            <p>Preço do KM: {numberToCurrencyBRL(this.state.inputs.type_of_transport === "passengers" ? this.state.inputs.flight_segment.aircraft.price_per_km_passengers : this.state.inputs.flight_segment.aircraft.price_per_km_aeromedical)}</p>
                                            <CurrencyInput 
                                                name="custom_price_per_km" 
                                                value={this.state.inputs.custom_price_per_km} 
                                                onChange={this.handleChange} 
                                                onBlur={() => this.handleQuote(this.state.inputs)} 
                                            />
                                        </FormGroup>
                                    </Col>
                                )}
                                <Col sm={this.state.inputs.provide_price_per_km ? "8" : "4"}>
                                    <FormGroup>
                                        <p>Preço estimado: <strong>{numberToCurrencyBRL(this.state.inputs.estimated_price)}</strong></p>
                                        <CurrencyInput 
                                            name="final_price" 
                                            value={this.state.inputs.final_price} 
                                            onChange={this.handleChange} 
                                            onBlur={() => this.handleQuote(this.state.inputs)} 
                                        />
                                        <p>Preço do Km (com base no preço final): <strong>{numberToCurrencyBRL(this.state.inputs.price_per_km_based_on_final_price)}</strong></p>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                    </SectionContent>
                </SectionView>

                <DrawerForm
                    title="Novo Cliente"
                    open={this.state.open}
                    onClose={this.handleCloseEditForm}
                >
                    <EditCustomerForm customer_name={this.state.inputs.customer_name} onSaved={this.handleSavedCustomer} />
                </DrawerForm>
            </EditAircraftQuoteView>
        );
    }
}

export default withRouter(EditAircraftQuote);
