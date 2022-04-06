import React from "react";
import Modal from "@mui/material/Modal";
import { theme_colors } from "./theme";

// types
import { AlertProps } from "./types";

// styles
import { Title, Subtitle, AlertView, AlertCard, AlertHeader, AlertContent, AlertActions } from "./styles";
import { Button, ButtonText } from "../../design";

export default function Alert(props: AlertProps)
{
    const { open, title, subtitle, theme, onConfirm, onCancel } = props;

    return(
        <Modal open={open} onClose={onCancel} onBackdropClick={onCancel}>
            <AlertView>
                <AlertCard>
                    <AlertHeader>
                        <Title>{title}</Title>
                        {subtitle && <Subtitle>{subtitle}</Subtitle>}
                    </AlertHeader>
                    <AlertContent>

                    </AlertContent>
                    <AlertActions>
                        <Button color={theme_colors[theme].main} onClick={onConfirm}>
                            <ButtonText color={theme_colors[theme].text}>SIM</ButtonText>
                        </Button>
                        <Button color="transparent" onClick={onCancel}>NÃO</Button>
                    </AlertActions>
                </AlertCard>
            </AlertView>
        </Modal>
    );
}