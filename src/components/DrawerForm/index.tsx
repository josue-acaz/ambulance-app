import React from "react";
import Drawer from "@mui/material/Drawer";

// types
import { DrawerFormProps } from "./types";

// styles
import { PopUpCloseButton } from "../../design";
import { DrawerFormView, DrawerFormHeader, DrawerFormBody, DrawerFormContent, Title } from "./styles";

const DrawerForm: React.FC<DrawerFormProps> = (props) => (
    <Drawer
        anchor="bottom"
        open={props.open}
        onClose={props.onClose}
    >
        <DrawerFormView>
            <DrawerFormBody>
                <DrawerFormHeader>
                    <Title>{props.title}</Title>
                    <PopUpCloseButton onClick={props.onClose}>Fechar</PopUpCloseButton>
                </DrawerFormHeader>
                <DrawerFormContent>
                    {props.children}
                </DrawerFormContent>
            </DrawerFormBody>
        </DrawerFormView>
    </Drawer>
);

export default DrawerForm;