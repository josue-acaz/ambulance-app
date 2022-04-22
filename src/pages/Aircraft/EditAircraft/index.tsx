import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";
import { ENUM_ACTIONS } from "../../../constants";
import { colors } from "../../../design/colors";

// models
import Aircraft from "../../../models/Aircraft";

// services
import AircraftService from "../../../services/aircraft.service";

// components
import Switch from "@mui/material/Switch";
import Input from "../../../components/form/Input";
import CurrencyInput from "../../../components/form/CurrencyInput";
import Autocomplete from "../../../components/form/Autocomplete";
import TextArea from "../../../components/form/TextArea";
import Toolbar from "../../../components/Toolbar";
import ErrorComponent from "../../../components/ErrorComponent";
import WarningComponent from "../../../components/WarningComponent";
import Tab from "../../../components/Tab";
import TabContent from "../../../components/Tab/TabContent";
import ProcessingLoader from "../../../components/spinners/ProcessingLoader";
import LoadingSpinner from "../../../components/spinners/LoadingSpinner";
import GalleryAircraft from "./GalleryAircraft";

// styles
import { GridContainerTC, GridToolbar, GridContent } from "../../../design/grid";
import { FormGroup, Label, SwitchHorizontalView, PageView, Button } from "../../../design";
import { Row, Col } from "react-bootstrap";

class EditAircraft extends BaseEditComponent<Aircraft> {
    title = "Nova Aeronave";

    tabs = [
        {
            title: "Informações",
            icon: <></>
        },
        {
            title: "Imagens",
            icon: <></>
        }
    ];

    constructor(props: any)
    {
        super(props, new AircraftService(), new Aircraft());
    }

    handleSave()
    {
        let inputs = this.state.inputs;

        if(inputs.prefix && inputs.aircraft_model_id && inputs.year && inputs.crew && inputs.passengers && inputs.empty_weight && inputs.autonomy && inputs.maximum_takeoff_weight && inputs.maximum_speed && inputs.cruising_speed && inputs.range && inputs.fixed_price_passengers && inputs.fixed_price_aeromedical && inputs.fixed_price_radius && inputs.price_per_km_passengers && inputs.price_per_km_aeromedical)
        {
            inputs.year = Number(inputs.year);
            inputs.crew = Number(inputs.crew);
            inputs.passengers = Number(inputs.passengers);
            inputs.empty_weight = Number(inputs.empty_weight);
            inputs.autonomy = Number(inputs.autonomy);
            inputs.maximum_takeoff_weight = Number(inputs.maximum_takeoff_weight);
            inputs.maximum_speed = Number(inputs.maximum_speed);
            inputs.cruising_speed = Number(inputs.cruising_speed);
            inputs.range = Number(inputs.range);
            inputs.fixed_price_radius = Number(inputs.fixed_price_radius);
        
            this.save(inputs);
        }
    }

    render()
    {
        return(
            <GridContainerTC>
                <GridToolbar>
                    <Toolbar 
                        action={ENUM_ACTIONS.ADD}  
                        routes={this.state.history_actions}
                        onGoBack={this.handleGoBack}
                    />
                </GridToolbar>
                <GridContent isEditPage={true}>
                    {this.state.loading ? <LoadingSpinner color={colors.PRIMARY} /> : (
                        this.state.processing ? <ProcessingLoader title="Processando..." msg="Por favor, aguarde!" /> : (
                            <PageView padding="0">
                                <Tab tabs={this.tabs} selected={this.state.tab} onChange={this.setTab} />
                                <TabContent index={0} selected={this.state.tab}>
                                    <form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Prefixo</Label>
                                                    <Input 
                                                        name="prefix"
                                                        value={this.state.inputs.prefix} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Prefixo da aeronave"
                                                        error={this.state.submitted && !this.state.inputs.prefix}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Modelo</Label>
                                                    <Autocomplete
                                                        name="aircraft_model_id"
                                                        optionField="name"
                                                        value={this.state.inputs.model_name}
                                                        requestUrl="/AircraftModels/autocomplete"
                                                        onOptionSelected={this.handleOptionSelected}
                                                        placeholder="Modelo da Aeronave"
                                                        error={this.state.submitted && !this.state.inputs.aircraft_model_id}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Ano</Label>
                                                    <Input 
                                                        name="year"
                                                        type="number"
                                                        value={this.state.inputs.year} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Ano da aeronave"
                                                        error={this.state.submitted && !this.state.inputs.year}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Tripulação</Label>
                                                    <Input 
                                                        name="crew"
                                                        type="number"
                                                        value={this.state.inputs.crew} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Qtd. Tripulantes"
                                                        error={this.state.submitted && !this.state.inputs.crew}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Passageiros</Label>
                                                    <Input 
                                                        name="passengers"
                                                        type="number"
                                                        value={this.state.inputs.passengers} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Qtd. Passageiros"
                                                        error={this.state.submitted && !this.state.inputs.passengers}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Peso da Aeronave Vazia</Label>
                                                    <Input 
                                                        name="empty_weight"
                                                        type="number"
                                                        value={this.state.inputs.empty_weight} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Peso da Aeronave Vazia"
                                                        adorment="Kg"
                                                        adormentPosition="end"
                                                        error={this.state.submitted && !this.state.inputs.empty_weight}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Peso Máximo para Decolagem</Label>
                                                    <Input 
                                                        name="maximum_takeoff_weight"
                                                        type="number"
                                                        value={this.state.inputs.maximum_takeoff_weight} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Peso máximo de decolagem"
                                                        adorment="Kg"
                                                        adormentPosition="end"
                                                        error={this.state.submitted && !this.state.inputs.maximum_takeoff_weight}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Autonomia</Label>
                                                    <Input 
                                                        name="autonomy"
                                                        type="number"
                                                        value={this.state.inputs.autonomy} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Autonomia da aeronave em horas"
                                                        adorment="h"
                                                        adormentPosition="end"
                                                        error={this.state.submitted && !this.state.inputs.autonomy}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Velocidade Máxima</Label>
                                                    <Input 
                                                        name="maximum_speed"
                                                        type="number"
                                                        value={this.state.inputs.maximum_speed} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Velocidade máxima da aeronave"
                                                        adorment="Km/h"
                                                        adormentPosition="end"
                                                        error={this.state.submitted && !this.state.inputs.maximum_speed}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Velocidade de Cruzeiro</Label>
                                                    <Input 
                                                        name="cruising_speed"
                                                        type="number"
                                                        value={this.state.inputs.cruising_speed} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Velocidade de cruzeiro da aeronave"
                                                        adorment="Km/h"
                                                        adormentPosition="end"
                                                        error={this.state.submitted && !this.state.inputs.cruising_speed}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Alcance</Label>
                                                    <Input 
                                                        name="range"
                                                        type="number"
                                                        value={this.state.inputs.range} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Alcance da aeronave em Km"
                                                        adorment="Km"
                                                        adormentPosition="end"
                                                        error={this.state.submitted && !this.state.inputs.range}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Preço do Km (Passageiros)</Label>
                                                    <CurrencyInput 
                                                        name="price_per_km_passengers"
                                                        placeholder="Preço por Km voado passageiros"
                                                        onChange={this.handleChange} 
                                                        value={this.state.inputs.price_per_km_passengers}
                                                        error={this.state.submitted && !this.state.inputs.price_per_km_passengers}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Raio do preço fixo</Label>
                                                    <Input 
                                                        adorment="Km"
                                                        adormentPosition="end"
                                                        name="fixed_price_radius"
                                                        placeholder="Kms para o preço fixo"
                                                        onChange={this.handleChange} 
                                                        value={this.state.inputs.fixed_price_radius} 
                                                        error={this.state.submitted && !this.state.inputs.fixed_price_radius}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                                <FormGroup>
                                                    <Label>Preço Fixo (Passageiros)</Label>
                                                    <CurrencyInput 
                                                        name="fixed_price_passengers"
                                                        placeholder="Preço fixo passageiros"
                                                        onChange={this.handleChange} 
                                                        value={this.state.inputs.fixed_price_passengers} 
                                                        error={this.state.submitted && !this.state.inputs.fixed_price_passengers}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12">
                                                <FormGroup>
                                                    <SwitchHorizontalView>
                                                        <p>Opera Aeromédico? <strong>{this.state.inputs.operates_aeromedical_transport ? "SIM" : "NÃO"}</strong></p>
                                                        <Switch name="operates_aeromedical_transport" color="warning" checked={this.state.inputs.operates_aeromedical_transport} onChange={this.handleChangeChecked} />
                                                    </SwitchHorizontalView>
                                                </FormGroup>
                                            </Col>
                                            {this.state.inputs.operates_aeromedical_transport && (
                                                <React.Fragment>
                                                    <Col sm="3">
                                                        <FormGroup>
                                                            <Label>Preço Fixo (Aeromédico)</Label>
                                                            <CurrencyInput 
                                                                name="fixed_price_aeromedical"
                                                                placeholder="Preço fixo aeromédico"
                                                                onChange={this.handleChange} 
                                                                value={this.state.inputs.fixed_price_aeromedical} 
                                                                error={this.state.submitted && !this.state.inputs.fixed_price_aeromedical}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="3">
                                                        <FormGroup>
                                                            <Label>Preço do Km (Aeromédico)</Label>
                                                            <CurrencyInput 
                                                                name="price_per_km_aeromedical"
                                                                placeholder="Preço por Km voado aeromédico"
                                                                onChange={this.handleChange} 
                                                                value={this.state.inputs.price_per_km_aeromedical}
                                                                error={this.state.submitted && !this.state.inputs.price_per_km_aeromedical}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </React.Fragment>
                                            )}
                                            <Col sm="12">
                                                <FormGroup>
                                                    <SwitchHorizontalView>
                                                        <p>Pressurizada? <strong>{this.state.inputs.pressurized ? "SIM" : "NÃO"}</strong></p>
                                                        <Switch name="pressurized" color="warning" checked={this.state.inputs.pressurized} onChange={this.handleChangeChecked} />
                                                    </SwitchHorizontalView>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12">
                                                <FormGroup>
                                                    <Label>Descrição</Label>
                                                    <TextArea 
                                                        name="description" 
                                                        value={this.state.inputs.description} 
                                                        onChange={this.handleChange} 
                                                        placeholder="Forneça uma descrição" 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {this.state.warnings && <WarningComponent warnings={this.state.warnings} />}
                                        {this.state.errors && <ErrorComponent errors={this.state.errors} />}
                                        <Button type="submit" disabled={this.state.errors.length > 0}>Salvar</Button>
                                    </form> 
                                </TabContent>
                                <TabContent index={1} selected={this.state.tab}>
                                    <GalleryAircraft aircraft={this.state.inputs} />
                                </TabContent>
                            </PageView>  
                        )
                    )}
                </GridContent>
            </GridContainerTC>
        );
    }
}

export default withRouter(EditAircraft);