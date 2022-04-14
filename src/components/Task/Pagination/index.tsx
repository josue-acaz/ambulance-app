import React from "react";
import TablePagination from "@mui/material/TablePagination";
import { isMobile } from "react-device-detect";

// types
import { TablePaginationProps } from "./types";

export default function Pagination(props: TablePaginationProps) {
    const { labelRowsPerPage = "Registros por página" } = props;

    return(
        <TablePagination
            className="root-pagination"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.count}
            rowsPerPage={props.limit}
            page={props.page-1}
            labelRowsPerPage={isMobile ? "Registros" : labelRowsPerPage}
            labelDisplayedRows={({ from, to }) => (`${from}-${to} de ${props.count !== -1 ? props.count : `${to}`}`)}
            onPageChange={props.handleChangePage}
            onRowsPerPageChange={props.handleChangeRowsPerPage}
        />
    );
}