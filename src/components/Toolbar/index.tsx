import React from "react";
import { Link } from "react-router-dom";

// constants
import { ENUM_ACTIONS } from "../../constants";

// types
import { ToolbarProps } from "./types";

// styles
import {
    Title, 
    ToolbarView, 
    AddButton, 
    RightActions,
    LeftActions,
    History,
    HistorySpan,
    HistoryText,
    ActionsView,
    ToolbarActionView,
} from "./styles";
import { GoBackButton  } from "../../design";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Toolbar(props: ToolbarProps) {
    const {title, onAdd, action, actions = [], onGoBack, routes, Custom} = props;

    return(
        <ToolbarView>
            {action === ENUM_ACTIONS.LIST && (
                <>
                    <Title>{title}</Title>
                    <RightActions>
                        {(Custom && action === ENUM_ACTIONS.LIST) && <Custom />}
                        {onAdd && <AddButton onClick={onAdd}>Adicionar</AddButton>}
                    </RightActions>
                </>
            )}
            {action === ENUM_ACTIONS.ADD && (
                <LeftActions>
                    <GoBackButton onClick={onGoBack}>
                        <ArrowBackIcon className="icon" />
                    </GoBackButton>
                    <ActionsView>
                        <History>
                            {routes?.map((route, index) => (
                                <HistorySpan>
                                    {index !== routes.length - 1 ? (
                                        <>
                                            <Link className="link" to={route.path}>{route.label}</Link>
                                            <ArrowForwardIosIcon className="icon" />
                                        </>
                                    ) : <HistoryText><p>{route.label}</p></HistoryText>}
                                </HistorySpan>
                            ))}
                        </History>
                        <RightActions>
                            {actions?.map(action => (
                                <ToolbarActionView onClick={action.onClick}>
                                    <p>{action.label}</p>
                                </ToolbarActionView>
                            ))}
                        </RightActions>
                    </ActionsView>
                </LeftActions>
            )}
        </ToolbarView>
    );
}
