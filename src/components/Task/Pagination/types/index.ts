interface PaginationProps {
    [key: string]: any;
    page_size: number;
    page_number: number; 
    page: number;
    count: number;
    text: string;
    filter: string; 
    orderBy: string;
    order: "ASC" | "DESC"; 
};

interface TablePaginationProps {
    limit: number;
    page: number;
    count: number;
    labelRowsPerPage?: string;
    handleChangePage(event: any, new_page: number): void;
    handleChangeRowsPerPage(event: any): void;
};

export type {PaginationProps, TablePaginationProps};