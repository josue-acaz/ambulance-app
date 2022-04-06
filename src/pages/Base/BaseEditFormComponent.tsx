import React from "react";
import BaseEntity from "../../models/Base/BaseEntity";
import BaseService from "../../services/Base/base.service";

// types
import { InputElementProps } from "./types";

class PropsType<T>
{
    inputs!: T;
    submitted: boolean = false;
}

class BaseEditFormComponent<T extends BaseEntity> extends React.Component
{
    state = new PropsType<T>();

    constructor(props: any, public service: BaseService<T>, public resource: T)
    {
        super(props);

        this.setInputs = this.setInputs.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount()
    {
        this.setInputs(this.resource);
    }

    setInputs(inputs: T)
    {
        this.setState({ inputs });
    }

    handleChange(event: React.ChangeEvent<InputElementProps>)
    {
        let inputs: any = this.state.inputs;
        const {name, value} = event.target;
        inputs[name] = value;
        this.setInputs(inputs);
    }
}

export default BaseEditFormComponent;