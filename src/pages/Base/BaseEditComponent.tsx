import React, {Component} from "react";
import BaseEntity from "../../models/Base/BaseEntity";
import { ENUM_ACTIONS } from "../../constants";
import { colors } from "../../design/colors";

// types
import { InputElementProps } from "./types";
import { RouteComponentProps } from "react-router-dom";
import { ToolbarRouteProps } from "../../components/Toolbar/types";
import { OnOptionSelectedEvent } from "../../components/form/Autocomplete/types";

// services
import BaseService from "../../services/Base/base.service";
import AuthService from "../../contexts/auth/auth.service";

// components
import Toolbar from "../../components/Toolbar";
import ErrorComponent from "../../components/ErrorComponent";
import WarningComponent from "../../components/WarningComponent";
import ProcessingLoader from "../../components/spinners/ProcessingLoader";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";

// styles
import {
    GridContainerTC, 
    GridToolbar, 
    GridContent,
} from "../../design/grid";
import { PageView, Button } from "../../design";

class PropsType<T>
{
    inputs!: T;
    loading: boolean = true;
    processing: boolean = false;
    submitted: boolean = false;
    current_datetime: Date = new Date();
    history_actions: Array<ToolbarRouteProps> = [];
    errors: Array<string> = [];
    warnings: Array<string> = [];
    open: boolean = false;
    tab: number = 0;
    modalNumber: number = 0;
}

class BaseEditComponent<T extends BaseEntity> extends Component<RouteComponentProps & any, PropsType<T>> {
    id: string = "0";
    title: string = "";
    main_title: string = "";
    state = new PropsType<T>();
    authService: AuthService = new AuthService();

    constructor(props: any, public service: BaseService<T>, public resource: T)
    {
        super(props);
        if(props.match)
        {
            this.id = props.match.params.id;
            this.main_title = props.location.state.main_title;
        }

        this.setTab = this.setTab.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setInputs = this.setInputs.bind(this);
        this.setWarnings = this.setWarnings.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.setProcessing = this.setProcessing.bind(this);
        this.setSubmitted = this.setSubmitted.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.RenderComponent = this.RenderComponent.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.handleOpenEditForm = this.handleOpenEditForm.bind(this);
        this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
        this.handleChangeChecked = this.handleChangeChecked.bind(this);
        this.afterShow = this.afterShow.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount()
    {
        this.setState({ inputs: this.resource });

        if(this.id.length > 1)
        {
            this.show(this.id);
        }
        else
        {
            this.setState({ loading: false });
        }

        // History Actions
        if(this.main_title.length > 0)
        {
            const history_actions: Array<ToolbarRouteProps> = [
                {
                    label: this.main_title,
                    path: this.props.location.pathname.split(`/${this.id}`)[0],
                },
                {
                    label: this.id.length > 1 ? this.id : this.title,
                    path: this.props.location.pathname,
                },
            ];
    
            this.setState({ history_actions });
        }
    }

    setInputs(inputs: T)
    {
        this.setState({ inputs });
    }

    setModalNumber(modalNumber: number)
    {
        this.setState({ modalNumber });
    }

    setLoading(loading: boolean)
    {
        this.setState({ loading });
    }

    setSubmitted(submitted: boolean)
    {
        this.setState({ submitted });
    }

    setProcessing(processing: boolean)
    {
        this.setState({ processing });
    }

    setTab(tab: number)
    {
        this.setState({ tab });
    }

    setOpen(open: boolean)
    {
        this.setState({ open });
    }

    setErrors(errors: Array<string>)
    {
        this.setState({ errors });
    }

    setWarnings(warnings: Array<string>)
    {
        this.setState({ warnings });
    }

    /**Input and other input elements */
    handleChange(event: React.ChangeEvent<InputElementProps>)
    {
        let inputs: any = this.state.inputs;
        const {name, value} = event.target;
        inputs[name] = value;

        this.setInputs(inputs);
        this.onChange(event.target.name, inputs);
    }

    /**Select */
    handleChangeOption(event: React.ChangeEvent<InputElementProps>)
    {
        let inputs: any = this.state.inputs;
        const {name, value} = event.target;
        inputs[name] = value.value;

        this.setInputs(inputs);
        this.onChange(event.target.name, inputs);
    }

    /**Autocomplete */
    handleOptionSelected(option: OnOptionSelectedEvent)
    {
        const { name, value } = option;
        let inputs: any = this.state.inputs;

        console.log(option);

        if(value || value === '')
        {
            Object.keys(inputs).forEach(parentKey => {
                if(parentKey === name)
                {
                    inputs[parentKey] = value["id"];
                }
    
                if(typeof inputs[parentKey] === 'object' && !Array.isArray(inputs[parentKey]) && inputs[parentKey] !== null)
                {
                    Object.keys(inputs[parentKey]).forEach(childKey => {
                        if(childKey === name)
                        {
                            inputs[parentKey][childKey] = value["id"];
                        }
                    })
                }
            });
    
            this.setInputs(inputs);
            this.onChange(name, inputs);
        }
    }

    /**Switch */
    handleChangeChecked(event: React.ChangeEvent<HTMLInputElement>, checked: boolean)
    {
        let inputs: any = this.state.inputs;
        inputs[event.target.name] = checked;

        this.setInputs(inputs);
        this.onChange(event.target.name, inputs);
    }

    onChange(name: string, inputs: T)
    {
        
    }

    handleGoBack()
    {
        this.props.history.goBack();
    }

    RenderComponent()
    {
        return(
            <h1>Main Component</h1>
        );
    }

    handleSave()
    {

    }

    async save(data: T)
    {
        this.setErrors([]);
        this.setWarnings([]);
        this.setProcessing(true);
        try {
            const response = await this.service.save(data);
            this.setWarnings(response.warnings);
            this.handleGoBack();
        } catch (error: any) {
            this.setErrors(error.response.data);
        }
        this.setProcessing(false);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        this.setState({ submitted: true });

        this.handleSave();
    }

    async show(id: string)
    {
        this.setErrors([]);
        this.setWarnings([]);
        this.setLoading(true);
        try {
            const response = await this.service.getById(id);
            this.afterShow(response.data);
            this.setWarnings(response.warnings);
        } catch (error: any) {
            this.setErrors(error.response.data);
            this.setLoading(false);
        }
    }

    afterShow(data: T)
    {
        this.setInputs(data);
        this.setLoading(false);
    }

    handleOpenEditForm()
    {
        this.setOpen(true);
    }

    handleCloseEditForm()
    {
        this.setOpen(false);
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
                            <PageView padding="15" style={{paddingBottom: 50}}>
                                <form onSubmit={this.handleSubmit}>
                                    <this.RenderComponent />
                                    {this.state.warnings && <WarningComponent warnings={this.state.warnings} />}
                                    {this.state.errors && <ErrorComponent errors={this.state.errors} />}
                                    <Button type="submit" disabled={this.state.errors.length > 0}>Salvar</Button>
                                </form> 
                            </PageView>  
                        )
                    )}
                </GridContent>
            </GridContainerTC>
        );
    }
}

export default BaseEditComponent;