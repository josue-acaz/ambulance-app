import React from "react";
import BaseEditComponent from "../../Base/BaseEditComponent";
import { withRouter } from "react-router-dom";
import { ENUM_ACTIONS } from "../../../constants";
import { colors } from "../../../design/colors";

// models
import Ambulance from "../../../models/Ambulance";

// services
import AmbulanceService from "../../../services/ambulance.service";

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
import GalleryAmbulance from "./GalleryAmbulance";

// styles
import { GridContainerTC, GridToolbar, GridContent } from "../../../design/grid";
import { FormGroup, Label, SwitchHorizontalView, PageView, Button } from "../../../design";
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
                                <Tab tabs={[ { title: "Informações" }, { title: "Imagens", disabled: this.id === "0" } ]} selected={this.state.tab} onChange={this.setTab} />
                                <TabContent index={0} selected={this.state.tab}>
                                    <form onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label>Preço Fixo (UTI)</Label>
                                                <CurrencyInput 
                                                    name="fixed_price_uti"
                                                    placeholder="Preço Fixo UTI"
                                                    onChange={this.handleChange} 
                                                    value={this.state.inputs.fixed_price_uti}
                                                    error={this.state.submitted && !this.state.inputs.fixed_price_uti}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label>Preço do Km (UTI)</Label>
                                                <CurrencyInput 
                                                    name="price_per_km_uti"
                                                    placeholder="Preço por Km UTI (INTERMUNICIPAL)"
                                                    onChange={this.handleChange} 
                                                    value={this.state.inputs.price_per_km_uti}
                                                    error={this.state.submitted && !this.state.inputs.price_per_km_uti}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label>Preço Fixo (Básica)</Label>
                                                <CurrencyInput 
                                                    name="fixed_price_basic"
                                                    placeholder="Preço Fixo Básica"
                                                    onChange={this.handleChange} 
                                                    value={this.state.inputs.fixed_price_basic}
                                                    error={this.state.submitted && !this.state.inputs.fixed_price_basic}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label>Preço do Km (Básica)</Label>
                                                <CurrencyInput 
                                                    name="price_per_km_basic"
                                                    placeholder="Preço por Km Básica (INTERMUNICIPAL)"
                                                    onChange={this.handleChange} 
                                                    value={this.state.inputs.price_per_km_basic}
                                                    error={this.state.submitted && !this.state.inputs.price_per_km_basic}
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
                                    <GalleryAmbulance ambulance={this.state.inputs} />
                                </TabContent>
                            </PageView>  
                        )
                    )}
                </GridContent>
            </GridContainerTC>
        );
    }
}

export default withRouter(EditAmbulance);