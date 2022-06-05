import React from "react";
import Switch from "@mui/material/Switch";
import { withRouter } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { ambulance_type_of_transports } from "../../../shared/providers/type_of_transports";
import { PLACE_TYPES } from "../../../shared/providers/place_types";
import { numberToCurrencyBRL, typecastRoutes } from "../../../utils";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FaceIcon from "@mui/icons-material/Face";

// models
import Location from "../../../models/Location";
import AmbulanceQuote from "../../../models/AmbulanceQuote";
import AdditionalInformation from "../../../models/AdditionalInformation";
import Coordinate from "../../../viewModels/Coordinate";

// services
import AmbulanceQuoteService from "../../../services/ambulance-quote.service";
import LocationService from "../../../services/location.service";

// components
import Modal from "../../../components/Modal";
import Segment from "../../../components/Segment";
import CurrencyInput from "../../../components/form/CurrencyInput";
import Autocomplete from "../../../components/form/Autocomplete";
import EditableList from "../../../components/EditableList";
import Select from "../../../components/form/Select";
import Generated from "../../../components/Generated";

// styles
import { FormGroup, Label, Subtitle, SwitchHorizontalView } from "../../../design";
import { colors } from "../../../design/colors";
import { Row, Col } from "react-bootstrap";
import { EditAmbulanceQuoteView, RouteMapView, RouteMapButton, LocationOptionView, LocationOptionTitle, LocationOptionSubtitle, AmbulanceOptionView, AmbulanceOptionName, AmbulanceOptionText } from "./styles";

// icons
import MapIcon from "@mui/icons-material/Map";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { faTruckMedical, faBedPulse, faHospital } from "@fortawesome/free-solid-svg-icons";
import Ambulance from "../../../models/Ambulance";

class EditAmbulanceQuote extends BaseEditComponent<AmbulanceQuote> {
    title = "Nova cotação Ambulância";
    locationService: LocationService = new LocationService();
    googleMapsApiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "";

    constructor(props: any)
    {
        super(props, new AmbulanceQuoteService(), new AmbulanceQuote());
        this.handleQuote = this.handleQuote.bind(this);
        this.handleChangeList = this.handleChangeList.bind(this);
        this.handleLoadedMap = this.handleLoadedMap.bind(this);
        this.renderDirections = this.renderDirections.bind(this);
        this.handleOpenMap = this.handleOpenMap.bind(this);
    }

    async save(data: AmbulanceQuote)
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

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.final_price)
        {
            this.save(inputs);
        }
    }

    handleChangeList(items: Array<AdditionalInformation>)
    {
        let inputs = this.state.inputs;
        inputs.additional_informations = items;
        this.setInputs(inputs);
    }

    async handleQuote(data: AmbulanceQuote, refresh_map: boolean = true)
    {
        this.setErrors([]);
        this.setWarnings([]);
        this.renderDirections = this.renderDirections.bind(this);
        console.log(data);
        try {
            const response = await this.service.quote(data);
            this.setInputs(response.data);
            
            this.setWarnings(response.warnings);
            this.renderDirections(this.state.map, this.state.directions_renderer, response.data, refresh_map);
        } catch (error: any) {
            console.error(error);
            this.setErrors(error.response.data);
        }
    }

    onChange(name: string, inputs: AmbulanceQuote)
    {
        this.handleQuote = this.handleQuote.bind(this);

        if(name !== "custom_price_per_km" && name !== "final_price" && name !== "provide_price_per_km" && name !== "add_informations")
        {
            this.handleQuote(inputs, name !== "type_of_transport" && name !== "customer_id");
        }
    }

    handleLoadedMap(mapInstance: any)
    {
        const { map } = mapInstance;
        var directions_renderer = new google.maps.DirectionsRenderer();

        this.setState({ map });
        this.setState({ directions_renderer });

        if(this.id !== "0" && this.state.inputs.directions)
        {
            this.renderDirections(map, directions_renderer, this.state.inputs);
        }
    }

    renderDirections(map: google.maps.Map, directions_renderer: any, ambulance_quote: AmbulanceQuote, refresh_map: boolean = true)
    {
        if(!ambulance_quote.directions)
        {
            return;
        }

        if(ambulance_quote.directions.routes.length > 0 && refresh_map)
        {
            if(this.state.markers.length > 0)
            {
                this.clearMarkers();
            }
            
            var directions = ambulance_quote.directions;
            var transport_segments = ambulance_quote.transport.transport_segments;
            typecastRoutes(directions.routes);
            
            directions_renderer.setOptions({
                directions: { routes: directions.routes, request: directions.request },
                suppressMarkers: true,
                map: map
            });

            const transferSegment = transport_segments[0];
            const tripSegment = transport_segments[1];
            const returnSegment = transport_segments[2];

            const center: Coordinate = new Coordinate();
            center.lat = transferSegment.origin_location.latitude;
            center.lng = transferSegment.origin_location.longitude;
            this.setState({ center });

            const ambulanceLocation: Coordinate = new Coordinate();
            ambulanceLocation.lat = transferSegment.origin_location.latitude;
            ambulanceLocation.lng = transferSegment.origin_location.longitude;

            const ambulanceMarker = new google.maps.Marker({
                position: ambulanceLocation,
                map,
                label: "A",
                title: "Onde a ambulâcia está!"
            });

            const ambulanceInfoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <p><strong>${transferSegment.origin_location_name}</strong></p>
                        <p>${transferSegment.origin_location.description}</p>
                    </div>
                `,
            });

            ambulanceInfoWindow.open({
                anchor: ambulanceMarker,
                map,
                shouldFocus: false
            });

            const patientLocation: Coordinate = new Coordinate();
            patientLocation.lat = tripSegment.origin_location.latitude;
            patientLocation.lng = tripSegment.origin_location.longitude;

            const patientMarker = new google.maps.Marker({
                position: patientLocation,
                map,
                label: "B",
                title: "Onde o paciente está!"
            });

            const patientInfoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <p><strong>${tripSegment.origin_location_name}</strong></p>
                        <p>${tripSegment.origin_location.description}</p>
                    </div>
                `,
            });

            patientInfoWindow.open({
                anchor: patientMarker,
                map,
                shouldFocus: false
            });

            const hospitalLocation: Coordinate = new Coordinate();
            hospitalLocation.lat = tripSegment.destination_location.latitude;
            hospitalLocation.lng = tripSegment.destination_location.longitude;

            const hospitalMarker = new google.maps.Marker({
                position: hospitalLocation,
                map,
                label: "C",
                title: "Para onde será transportado!"
            });

            const hospitalInfoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <p><strong>${tripSegment.destination_location_name}</strong></p>
                        <p>${tripSegment.destination_location.description}</p>
                    </div>
                `,
            });

            hospitalInfoWindow.open({
                anchor: hospitalMarker,
                map,
                shouldFocus: false,
            });

            var markers = [ambulanceMarker, patientMarker, hospitalMarker];

            var baseLocation: Coordinate = new Coordinate();
            baseLocation.lat = returnSegment.destination_location.latitude;
            baseLocation.lng = returnSegment.destination_location.longitude;

            const baseMarker = new google.maps.Marker({
                position: baseLocation,
                map,
                label: "D",
                title: "Base Para onde Irá retornar!"
            });

            const baseInfoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <p><strong>${returnSegment.destination_location_name}</strong></p>
                        <p>${returnSegment.destination_location.description}</p>
                    </div>
                `,
            });

            baseInfoWindow.open({
                anchor: baseMarker,
                map,
                shouldFocus: false,
            });

            markers.push(baseMarker);

            this.setState({ markers });
            this.setState({ zoom: 15 });
        }
    }

    handleOpenMap()
    {
        this.setOpen(!this.state.open);
                        
        if(!this.state.open)
        {
            if(this.state.inputs.directions)
            {
                if(this.state.inputs.directions.routes.length > 0)
                {
                    this.state.map.fitBounds(this.state.inputs.directions.routes[0].bounds);
                    this.state.map.setZoom(12);
                }
            }
        }
    }
    
    RenderComponent()
    {
        return(
            <EditAmbulanceQuoteView>
                <Modal number={1} currentModalNumber={this.state.modalNumber}>
                    <Generated type="ambulance_quote" data={this.state.inputs} onGoBack={this.handleGoBack} />
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
                    <Subtitle>Informações do trajeto</Subtitle>

                    <SwitchHorizontalView>
                        <p>Remoção intermunicipal? <strong>{this.state.inputs.is_intercity_removal ? "SIM" : "NÃO"}</strong></p>
                        <Switch name="is_intercity_removal" color="warning" checked={this.state.inputs.is_intercity_removal} onChange={this.handleChangeChecked} />
                    </SwitchHorizontalView>

                    <Row>
                        <Col sm="4">
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
                        <Col sm={this.state.inputs.is_intercity_removal ? "8" : "4"}>
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
                                <p><strong>{this.state.inputs.transport_segment.origin_location.city ? this.state.inputs.transport_segment.origin_location.city.id !== this.state.inputs.transport_segment.origin_city_id ? this.state.inputs.transport_segment.origin_location.city.full_name : "" : ""}</strong></p>
                            </FormGroup>
                        </Col>
                        {this.state.inputs.is_intercity_removal && (
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
                        )}
                        <Col sm={this.state.inputs.is_intercity_removal ? "8" : "4"}>
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
                                    params={{ place_type: PLACE_TYPES.ESTABLISHMENT, city_id: this.state.inputs.is_intercity_removal ? this.state.inputs.transport_segment.destination_city_id : this.state.inputs.transport_segment.origin_city_id }}
                                    error={this.state.submitted && (!this.state.inputs.transport_segment.destination_location_id && !this.state.inputs.transport_segment.destination_location)}
                                />
                                <p><strong>{this.state.inputs.transport_segment.destination_location.city ? this.state.inputs.transport_segment.destination_location.city.id !== (this.state.inputs.is_intercity_removal ? this.state.inputs.transport_segment.destination_city_id : this.state.inputs.transport_segment.origin_city_id) ? this.state.inputs.transport_segment.destination_location.city.full_name : "" : ""}</strong></p>
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Subtitle>Informações da ambulância</Subtitle>
                    <SwitchHorizontalView>
                        <p>Ambulância na base? <strong>{this.state.inputs.ambulance_at_base ? "SIM" : "NÃO"}</strong></p>
                        <Switch name="ambulance_at_base" color="warning" checked={this.state.inputs.ambulance_at_base} onChange={this.handleChangeChecked} />
                    </SwitchHorizontalView>
                    <Row>
                        <Col sm="4">
                            <FormGroup>
                                <Autocomplete
                                    name="ambulance_id"
                                    optionField="code"
                                    icon={<DirectionsCarIcon className="icon" />}
                                    placeholder="Escolha a ambulância"
                                    requestUrl="/Ambulances/autocomplete"
                                    value={this.state.inputs.transport_segment.ambulance.code.toString()}
                                    RenderOption={(option: Ambulance) => (
                                        <AmbulanceOptionView>
                                            <AmbulanceOptionName>{option.code}</AmbulanceOptionName>
                                            <AmbulanceOptionText>Básica: {numberToCurrencyBRL(option.price_per_km_basic)}</AmbulanceOptionText>
                                            <AmbulanceOptionText>UTI: {numberToCurrencyBRL(option.price_per_km_uti)}</AmbulanceOptionText>
                                        </AmbulanceOptionView>
                                    )}
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
                        <Col sm={this.state.inputs.ambulance_at_base ? "8" : "4"}>
                            <FormGroup>
                                <Autocomplete
                                    name="ambulance_base_id"
                                    optionField="name"
                                    placeholder={this.state.inputs.ambulance_at_base ? "Base onde a ambulância está" : "Base para Onde A Ambulância deve voltar"}
                                    requestUrl="/AmbulanceBases/autocomplete"
                                    value={this.state.inputs.ambulance_base_name}
                                    onOptionSelected={(e) => {
                                        let inputs = this.state.inputs;

                                        if(e.value)
                                        {
                                            inputs.ambulance_base = e.value;
                                            this.setInputs(inputs);
                                        }

                                        this.handleOptionSelected(e);
                                    }}
                                    error={this.state.submitted && !this.state.inputs.ambulance_base_id}
                                />
                            </FormGroup>
                        </Col>
                        {!this.state.inputs.ambulance_at_base && (
                            <Col sm="4">
                                <FormGroup>
                                    <Autocomplete
                                        name="ambulance_location_id"
                                        optionField="name"
                                        placeholder="Local Onde A Ambulância Está"
                                        requestUrl="/Locations/autocomplete"
                                        value={this.state.inputs.ambulance_location_name}
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
                                                inputs.ambulance_location = e.value;
                                                this.setInputs(inputs);
                                            }

                                            this.handleOptionSelected(e);
                                        }}
                                        params={{ place_type: PLACE_TYPES.ESTABLISHMENT }}
                                        error={this.state.submitted && (!this.state.inputs.ambulance_location_id && !this.state.inputs.ambulance_location)}
                                    />
                                    <p><strong>{this.state.inputs.ambulance_location.city ? this.state.inputs.ambulance_location.city_id !== this.state.inputs.ambulance_location.city.id ? this.state.inputs.ambulance_location.city.full_name : "" : ""}</strong></p>
                                </FormGroup>
                            </Col>
                        )}
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row>
                        {this.state.inputs.transport.transport_segments.map(segment => (
                            <Col sm="3">
                                <FormGroup>
                                    <Segment type={segment.type} title={segment.title} origin={segment.origin_location_name} destination={segment.destination_location_name} distance={0} />
                                </FormGroup>
                            </Col>
                        ))}
                    </Row>
                    <p><strong>Distância: </strong>{this.state.inputs.total_distance.toFixed(2).toString().replace(".", ",")} Km</p>
                </FormGroup>

                <FormGroup>
                    <RouteMapButton disabled={(!this.state.inputs.transport_segment.origin_location_id && !this.state.inputs.transport_segment.origin_location) || (!this.state.inputs.transport_segment.destination_location_id && !this.state.inputs.transport_segment.destination_location)} type="button" onClick={this.handleOpenMap}>
                        <MapIcon className="icon" />
                        <p>{this.state.open ? "Ocultar rota" : "Mostrar rota"}</p>
                    </RouteMapButton>
                    <RouteMapView open={this.state.open}>
                        <GoogleMapReact
                            zoom={this.state.zoom}
                            defaultCenter={{ lat: 59.95, lng: 30.33 }}
                            onGoogleApiLoaded={this.handleLoadedMap}
                            bootstrapURLKeys={{ key: this.googleMapsApiKey, libraries: ["geometry"] }}
                            yesIWantToUseGoogleMapApiInternals={true}
                        >

                        </GoogleMapReact>
                    </RouteMapView>
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
                                        onBlur={() => this.handleQuote(this.state.inputs, false)} 
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
                                    onBlur={() => this.handleQuote(this.state.inputs, false)} 
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
