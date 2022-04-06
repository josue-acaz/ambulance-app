import React, { Component } from "react";
import logo from "../../assets/img/logo.png";
import LoginCredentials from "../../viewModels/LoginCredentials";

// contexts
import { AuthContext } from "../../contexts/auth/auth.context";

// components
import Input from "../../components/form/Input";
import SecureInput from "../../components/form/SecureInput";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorComponent from "../../components/ErrorComponent";

// styles
import { 
    SignInView,
    SignInCard,
    Header,
    Title,
    Subtitle,
    LogoView,
    Logo
 } from "./styles";
import { Row, Col } from "react-bootstrap";
import { Button, FormGroup, Label } from "../../design";

class PropsType {
    submitted: boolean = false;
    inputs: LoginCredentials = new LoginCredentials();
};

class SignIn extends Component<any, PropsType>
{
    static contextType = AuthContext;
    state: PropsType = new PropsType();

    constructor(props: any)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any)
    {
        let inputs = this.state.inputs;
        const {name, value} = event.target;
        inputs[name] = value;

        this.setState({ inputs });
    }

    async handleSubmit(event: any)
    {
        event.preventDefault();
        this.setState({ submitted: true });
        
        if(this.state.inputs.username && this.state.inputs.password)
        {
            await this.context.signIn(this.state.inputs);
        }
    }

    render()
    {
        return(
            <SignInView>
                <SignInCard>
                    <LogoView>
                        <Logo src={logo} alt="logo" />
                    </LogoView>
                    <Header>
                        <Title>Sistema de Orçamentos</Title>
                        <Subtitle>v1.0</Subtitle>
                    </Header>
                    <form id="signin-form">
                        <FormGroup>
                            <Row>
                                <Col sm="12">
                                    <Label htmlFor="username">Nome de usuário</Label>
                                    <Input name="username" value={this.state.inputs.username} onChange={this.handleChange} placeholder="Nome de usuário ou email" error={this.state.submitted && !this.state.inputs.username} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Label htmlFor="password">Senha</Label>
                                    <SecureInput name="password" value={this.state.inputs.password} onChange={this.handleChange} placeholder="Informe sua senha" error={this.state.submitted && !this.state.inputs.password} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <ErrorComponent errors={this.context.errors} />

                        <Button onClick={this.handleSubmit}>{this.context.processing ? <CircularProgress size={24} color="inherit" /> : "Entrar"}</Button>
                    </form>
                </SignInCard>
            </SignInView>
        );
    }
}

export default SignIn;