import React from "react";
import Switch from "@mui/material/Switch";
import { withRouter } from "react-router-dom";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { ambulance_type_of_transports } from "../../../shared/providers/type_of_transports";
import { PLACE_TYPES } from "../../../shared/providers/place_types";
import { numberToCurrencyBRL } from "../../../utils";

// models
import Location from "../../../models/Location";
import AmbulanceQuote from "../../../models/AmbulanceQuote";
import AdditionalInformation from "../../../models/AdditionalInformation";

// services
import AmbulanceQuoteService from "../../../services/ambulance-quote.service";
import LocationService from "../../../services/location.service";

// components
import CurrencyInput from "../../../components/form/CurrencyInput";
import Autocomplete from "../../../components/form/Autocomplete";
import EditableList from "../../../components/EditableList";
import Select from "../../../components/form/Select";
import RouteMap from "./RouteMap";

// styles
import { FormGroup, Label, Subtitle, SwitchHorizontalView } from "../../../design";
import { Row, Col } from "react-bootstrap";
import { EditAmbulanceQuoteView, LocationButton, RouteMapButton, LocationOptionView, LocationOptionTitle, LocationOptionSubtitle } from "./styles";

// icons
import MapIcon from "@mui/icons-material/Map";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

/**
 * <LocationButton type="button" onClick={() => this.handleOpenMap("destination_location_place")}>
        <MapIcon className="icon" />
    </LocationButton>
 */

class EditAmbulanceQuote extends BaseEditComponent<AmbulanceQuote> {
    title = "Nova cotação Ambulância";
    locationService: LocationService = new LocationService();

    constructor(props: any)
    {
        super(props, new AmbulanceQuoteService(), new AmbulanceQuote());
        this.handleOpenRouteMap = this.handleOpenRouteMap.bind(this);
        this.handleCloseRouteMap = this.handleCloseRouteMap.bind(this);
        this.handleChangeList = this.handleChangeList.bind(this);
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.final_price)
        {
            console.log(inputs);
            //this.save(inputs);
        }
    }

    handleChangeList(items: Array<AdditionalInformation>)
    {
        let inputs = this.state.inputs;
        inputs.additional_informations = items;
        this.setInputs(inputs);
    }

    handleOpenRouteMap()
    {
        this.setModalNumber = this.setModalNumber.bind(this);
        this.setModalNumber(2);
    }

    handleCloseRouteMap()
    {
        this.setModalNumber = this.setModalNumber.bind(this);
        this.setModalNumber(0);
    }

    async handleQuote(data: AmbulanceQuote)
    {
        this.setWarnings([]);
        try {
            const response = await this.service.quote(data);
            this.setInputs(response.data);
            this.setWarnings(response.warnings);
        } catch (error: any) {
            console.log(error);
            //this.setErrors(error.response.data);
        }
    }
    
    RenderComponent()
    {
        return(
            <EditAmbulanceQuoteView>
                <RouteMap 
                    modal_number={this.state.modalNumber} 
                    transport_segments={this.state.inputs.transport.transport_segments}
                    onCancel={() => this.handleCloseRouteMap()} 
                    onUpdate={() => this.handleCloseRouteMap()} 
                />
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
                                    
                                    if(e.target.value)
                                    {
                                        inputs.customer_name = e.target.value;
                                        this.setInputs(inputs);
                                    }
                                }}
                                onOptionSelected={this.handleOptionSelected}
                                error={this.state.submitted && !this.state.inputs.customer_id && !this.state.inputs.customer_name}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Tipo de Transporte</Label>
                            <Select name="type_of_transport" value={this.state.inputs.type_of_transport} options={ambulance_type_of_transports} onChange={this.handleChangeOption}  />
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Subtitle>Informações da ambulância</Subtitle>
                    <Row>
                        <Col sm="4">
                            <FormGroup>
                                <Autocomplete
                                    name="ambulance_id"
                                    optionField="code"
                                    icon={<DirectionsCarIcon className="icon" />}
                                    placeholder="Escolha a ambulância"
                                    requestUrl="/Ambulances/autocomplete"
                                    value={this.state.inputs.transport_segment.ambulance.name}
                                    onOptionSelected={(e) => {
                                        let inputs = this.state.inputs;
                                        
                                        if(e.value)
                                        {
                                            inputs.transport_segment.ambulance = e.value;
                                        
                                            this.setInputs(inputs);
                                            this.handleOptionSelected(e);
                                        }
                                    }}
                                    error={this.state.submitted && !this.state.inputs.transport_segment.ambulance_id}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm="8">
                            <FormGroup>
                                <Autocomplete
                                    name="ambulance_base_id"
                                    optionField="name"
                                    icon={<LocationOnIcon className="icon" />}
                                    placeholder="Base onde a ambulância está"
                                    requestUrl="/AmbulanceBases/autocomplete"
                                    value={this.state.inputs.ambulance_base_name}
                                    onOptionSelected={this.handleOptionSelected}
                                    error={this.state.submitted && !this.state.inputs.ambulance_base_id}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
                
                <SwitchHorizontalView>
                    <p>Remoção intermunicipal? <strong>{this.state.inputs.is_intercity_removal ? "SIM" : "NÃO"}</strong></p>
                    <Switch name="is_intercity_removal" color="warning" checked={this.state.inputs.is_intercity_removal} onChange={this.handleChangeChecked} />
                </SwitchHorizontalView>
                <FormGroup>
                    <Subtitle>{this.state.inputs.is_intercity_removal ? "Origem" : "Cidade"}</Subtitle>
                    <Row>
                        <Col sm={this.state.inputs.is_intercity_removal ? "4" : "12"}>
                            <FormGroup>
                                <Autocomplete
                                    name="origin_city_id"
                                    optionField="full_name"
                                    requestUrl="/Cities/autocomplete"
                                    placeholder={this.state.inputs.is_intercity_removal ? "Cidade de Origem" : "Escolha uma cidade"}
                                    value={this.state.inputs.transport_segment.origin_city_name}
                                    onOptionSelected={this.handleOptionSelected}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={this.state.inputs.is_intercity_removal ? "8" : "6"}>
                            <FormGroup>
                                <Autocomplete
                                    name="origin_location_id"
                                    optionField="name"
                                    icon={<AdjustIcon className="icon" />}
                                    placeholder="Local De Origem"
                                    requestUrl="/Locations/autocomplete"
                                    value={this.state.inputs.transport_segment.origin_location_name}
                                    RenderOption={(option: Location) => (
                                        <LocationOptionView>
                                            <LocationOptionTitle>{option.name}</LocationOptionTitle>
                                            <LocationOptionSubtitle>{option.description}</LocationOptionSubtitle>
                                        </LocationOptionView>
                                    )}
                                    onOptionSelected={(e) => {
                                        let inputs = this.state.inputs;
                                        
                                        if(e.value)
                                        {
                                            inputs.transport_segment.origin_location = e.value;
                                            this.setInputs(inputs);
                                        }

                                        this.handleOptionSelected(e);
                                    }}
                                    params={{ place_type: PLACE_TYPES.ESTABLISHMENT, city_id: this.state.inputs.transport_segment.origin_city_id }}
                                    error={this.state.submitted && (!this.state.inputs.transport_segment.origin_location_id && !this.state.inputs.transport_segment.origin_location)}
                                />
                            </FormGroup>
                        </Col>
                        {!this.state.inputs.is_intercity_removal && (
                            <Col sm="6">
                                <FormGroup>
                                    <Autocomplete
                                        name="destination_location_id"
                                        optionField="name"
                                        icon={<LocationOnIcon className="icon" />}
                                        placeholder="Local De Destino"
                                        requestUrl="/Locations/autocomplete"
                                        RenderOption={(option: Location) => (
                                            <LocationOptionView>
                                                <LocationOptionTitle>{option.name}</LocationOptionTitle>
                                                <LocationOptionSubtitle>{option.description}</LocationOptionSubtitle>
                                            </LocationOptionView>
                                        )}
                                        value={this.state.inputs.transport_segment.destination_location_name}
                                        onOptionSelected={(e) => {
                                            let inputs = this.state.inputs;
                                            
                                            if(e.value)
                                            {
                                                inputs.transport_segment.destination_location = e.value;
                                                this.setInputs(inputs);
                                            }
    
                                            this.handleOptionSelected(e);
                                        }}
                                        params={{ place_type: PLACE_TYPES.ESTABLISHMENT, city_id: this.state.inputs.transport_segment.origin_city_id }}
                                        error={this.state.submitted && (!this.state.inputs.transport_segment.destination_location_id && !this.state.inputs.transport_segment.destination_location)}
                                    />
                                </FormGroup>
                            </Col>
                        )}
                    </Row>
                    {!this.state.inputs.is_intercity_removal && <p><strong>Distância: </strong>{this.state.inputs.transport_segment.distance} Km</p>}
                </FormGroup>
                {this.state.inputs.is_intercity_removal && (
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
                                        value={this.state.inputs.transport_segment.destination_city_name}
                                        onOptionSelected={this.handleOptionSelected}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="8">
                                <FormGroup>
                                    <Autocomplete
                                        name="destination_location_id"
                                        optionField="name"
                                        icon={<LocationOnIcon className="icon" />}
                                        placeholder="Local De Destino"
                                        requestUrl="/Locations/autocomplete"
                                        value={this.state.inputs.transport_segment.destination_location_name}
                                        RenderOption={(option: Location) => (
                                            <LocationOptionView>
                                                <LocationOptionTitle>{option.name}</LocationOptionTitle>
                                                <LocationOptionSubtitle>{option.description}</LocationOptionSubtitle>
                                            </LocationOptionView>
                                        )}
                                        onOptionSelected={(e) => {
                                            let inputs = this.state.inputs;
                                            
                                            if(e.value)
                                            {
                                                inputs.transport_segment.destination_location = e.value;
                                                this.setInputs(inputs);
                                            }
    
                                            this.handleOptionSelected(e);
                                        }}
                                        params={{ place_type: PLACE_TYPES.ESTABLISHMENT, city_id: this.state.inputs.transport_segment.destination_city_id }}
                                        error={this.state.submitted && (!this.state.inputs.transport_segment.destination_location_id && !this.state.inputs.transport_segment.destination_location)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <p><strong>Distância: </strong>{this.state.inputs.transport_segment.distance} Km</p>
                    </FormGroup>          
                )}

                <FormGroup>
                    <RouteMapButton disabled={!this.state.inputs.transport_segment.origin_location_id || !this.state.inputs.transport_segment.destination_location_id} type="button" onClick={this.handleOpenRouteMap}>
                        <MapIcon className="icon" />
                        <p>Ver rota</p>
                    </RouteMapButton>
                </FormGroup>

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
                                    <p>Preço do KM: {numberToCurrencyBRL(this.state.inputs.type_of_transport === "basic" ? this.state.inputs.transport_segment.ambulance.price_per_km_basic : this.state.inputs.transport_segment.ambulance.price_per_km_uti)}</p>
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
                                    onBlur={() => {/**this.handleQuote(this.state.inputs) */}} 
                                />
                                <p>Preço do Km (com base no preço final): <strong>{numberToCurrencyBRL(this.state.inputs.price_per_km_based_on_final_price)}</strong></p>
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
            </EditAmbulanceQuoteView>
        );
    }
}

export default withRouter(EditAmbulanceQuote);