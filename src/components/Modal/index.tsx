import React from "react";
import { ModalProps } from "@mui/material/Modal";

// styles
import { ModalView } from "./styles";

// types
import { ModalViewProps } from "./types";

const Modal: React.FC<ModalViewProps> = (props) => (
    <ModalView {...props} open={props.number === props.currentModalNumber}>{props.children}</ModalView>
);

export default Modal;