class PaginationFilter {
    [key: string]: any;
    page_number: number = 1;
    page_size: number = 10;
    text: string = "";
    order: string = "DESC";
    order_by: string = "created_at";

    // Pagination result
    total_pages: number = 0;
    total_records: number = 0;
};

export default PaginationFilter;