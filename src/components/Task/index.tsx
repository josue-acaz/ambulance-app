import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";

// types
import {
    TableProps, 
    TableRowComponentProps,
    TableHeadComponentProps,
    EditableCellProps,
} from "./types";

// styles
import {
    TableView, 
    TableHead, 
    TableRow, 
    TableHeadCell,
    TableBody,
    TableCell,
    ActionsView,
    ActionButton,
    SelectedRow,
    EditableCellView
} from "./styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function EditableCell(props: EditableCellProps)
{
    const {name, editable, onChange, RenderComponent} = props;
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(props.value);

    const isCustomComponent = !!RenderComponent;

    function onFocus()
    {
        setEditing(true);
    }

    function onBlur(event: any)
    {
        setEditing(false);
        if(onChange)
        {
            onChange(event);
        }
    }

    function handleChange(e: any)
    {
        const {value} = e.target;
        setValue(value);
    }

    return(
        editable ? 
        (
            <EditableCellView editing={editing} isCustomComponent={isCustomComponent}>
                {RenderComponent ? (
                    <RenderComponent 
                        name={name} 
                        value={value} 
                        onBlur={onBlur} 
                        onFocus={onFocus} 
                    />
                ) : (
                    <input 
                        name={name} 
                        value={value} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={handleChange} 
                    />
                )}
            </EditableCellView>
        ) :
        (
            <div>
                {RenderComponent ? (
                    <RenderComponent 
                        name={name} 
                        value={value} 
                        onBlur={onBlur} 
                        onFocus={onFocus} 
                    />
                ) : value}
            </div>
        )
    );
}

function TableHeadComponent(props: TableHeadComponentProps) {
    const {color, style, rowCount, selectable, numSelected, headLabels, fixedHeader, withActions, onSelectAllClick} = props;

    return(
        <TableHead>
            <TableRow>
                {selectable && (
                    <TableHeadCell style={style} padding="checkbox" fixedHeader={fixedHeader}>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableHeadCell>
                )}
                {headLabels.map(head_label => (
                    <TableHeadCell 
                        key={head_label.key} 
                        style={style}
                        color={color}
                        textColor={head_label.textColor}
                        fixedHeader={fixedHeader}
                    >
                        {head_label.value}
                    </TableHeadCell>
                ))}
                {withActions && <TableHeadCell style={style} align="right">Ações</TableHeadCell>}
            </TableRow>
        </TableHead>
    );
}

function TableRowComponent(props: TableRowComponentProps) {
    const {row, selected, selectable, withActions, disableActions, hoverTitle, hoverSelected, disable_select, actions, onClick, onEdit, onHoverClick} = props;
    const hoverEnabled = !!hoverTitle || !!onHoverClick;

    return(
        <TableRow selected={selected} enableHover={hoverEnabled} hoverSelected={hoverSelected && !selected} onClick={() => {
            if(hoverEnabled && onHoverClick) {
                onHoverClick();
            }
        }}>
            {selectable && (
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onClick={(event) => {
                        if(!disable_select) {
                            onClick(event, row.id);
                        }
                    }} />
                </TableCell>
            )}
            {row.cells.map(cell => (
                <TableCell color={cell.color} style={cell.style}>
                    <EditableCell 
                        value={cell.value} 
                        name={cell.name} 
                        editable={cell.editable}
                        onChange={cell.onChange} 
                        RenderComponent={cell.RenderComponent}
                    />
                </TableCell>
            ))}
            {withActions && (
                <TableCell align="right" style={{padding: 0, height: "auto", width: "auto"}}>
                    {!disableActions && (
                        <ActionsView>
                            {onEdit && (
                                <Tooltip title="Editar">
                                    <ActionButton onClick={() => onEdit(row.id)}>
                                        <EditOutlinedIcon className="icon" />
                                    </ActionButton>
                                </Tooltip>
                            )}
                            {actions && actions.map(action => (
                                <Tooltip title={action.label}>
                                    <ActionButton onClick={() => { if(action.onClick) { action.onClick(row.id) } }} rel={action.rel} href={action.href} target={action.target} className={action.className}>
                                        {action.icon}
                                    </ActionButton>
                                </Tooltip>
                            ))}
                        </ActionsView>
                    )}
                </TableCell>
            )}
        </TableRow>
    );
}

export default function Task(props: TableProps) {
    const {color, headStyle, rows, selectable=true, headLabels, fixedHeader, selecteds, withActions=true, onEditRow, onChangeSelecteds} = props;

    const handleClick = (event: any, id: string) => {
        const selectedIndex = selecteds.indexOf(id);
        let newSelected: Array<string> = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selecteds, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selecteds.slice(1));
        } else if (selectedIndex === selecteds.length - 1) {
          newSelected = newSelected.concat(selecteds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selecteds.slice(0, selectedIndex),
            selecteds.slice(selectedIndex + 1),
          );
        }
    
        onChangeSelecteds(newSelected);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
          const newSelecteds = rows.filter(row => !row.disable_select).map((n) => n.id);
          onChangeSelecteds(newSelecteds);
          return;
        }

        onChangeSelecteds([]);
    };

    const isSelected = (id: string) => selecteds.indexOf(id) !== -1;

    return(
        <TableView>
            <TableHeadComponent 
                color={color}
                style={headStyle}
                rowCount={rows.length} 
                headLabels={headLabels}
                selectable={selectable}
                fixedHeader={fixedHeader}
                withActions={withActions}
                numSelected={selecteds.length}
                onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
                {rows.map(row => (
                    <TableRowComponent 
                        row={row}
                        onEdit={onEditRow}
                        onClick={handleClick} 
                        actions={row.actions}
                        selectable={selectable}
                        selected={isSelected(row.id)}
                        withActions={withActions}
                        hoverTitle={row.hoverTitle}
                        disable_select={row.disable_select}
                        hoverSelected={row.hoverSelected}
                        onHoverClick={row.onHoverClick}
                        disableActions={selecteds.length > 0}
                    />
                ))}
            </TableBody>
        </TableView>
    );
}