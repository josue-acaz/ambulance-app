import React, {useState} from "react";

// types
import {SecureInputProps} from "./types";

// styles
import {SecureInputView, Adorment} from "./styles";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// components
import Input from "../Input";

export default function SecureInput(props: React.InputHTMLAttributes<HTMLInputElement> & SecureInputProps) {
    const [visible, setVisible] = useState(false);

    function toggleVisible() {
        setVisible(!visible);
    }

    return(
        <SecureInputView>
            <Input {...props} type={visible ? "text" : "password"} adorment={(
                <Adorment onClick={toggleVisible}>
                    {visible ? <VisibilityIcon className="icon" /> : <VisibilityOffIcon className="icon" />}
                </Adorment>
            )} adormentPosition="end" />
        </SecureInputView>
    );
}
