import React from "react";
import Checkbox from "@mui/material/Checkbox";

// components
import Search from "./Search";
import Tooltip from "@mui/material/Tooltip";

// styles
import {
    ToolbarView,
    ToolbarLeft,
    ToolbarRight,
    Title,
    NumSelectedText,
    NumSelectedActions,
    DeleteButton,
    Subtitle,
    Header,
} from "./styles";
import { Button } from "../../../design";

// icons
import DeleteIcon from "@mui/icons-material/Delete";

// types
import { ToolbarProps } from "./types";

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const {title, subtitle, padding, numSelected, children, rowCount, onAdd, onDelete, onSearch, onSelectAllClick} = props;
    const activeSelection = numSelected > 0;

    return(
        <ToolbarView activeSelection={activeSelection} padding={padding}>
            <ToolbarLeft>
                {onSelectAllClick && rowCount !== undefined && (
                    <Checkbox
                        style={{marginLeft: 5}}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                )}
                {activeSelection ? (
                    <React.Fragment>
                        <NumSelectedText>{numSelected} selecionado(s)</NumSelectedText>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Header>
                            <Title>{title}</Title>
                            {subtitle && (<Subtitle>{subtitle}</Subtitle>)}
                        </Header>
                        {onSearch && (<Search onSearch={onSearch} />)}
                    </React.Fragment>
                )}
            </ToolbarLeft>
            <ToolbarRight>
                <NumSelectedActions>
                    {activeSelection ? (
                        <React.Fragment>
                            {onDelete && (
                                <Tooltip title="Excluir selecionado(s)">
                                    <DeleteButton onClick={() => onDelete()}>
                                        <DeleteIcon className="icon" />
                                    </DeleteButton>
                                </Tooltip>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {onAdd && <Button onClick={onAdd}>Novo</Button>}
                            {children}
                        </React.Fragment>
                    )}
                </NumSelectedActions>
            </ToolbarRight>
        </ToolbarView>
    );
}

export default Toolbar;
