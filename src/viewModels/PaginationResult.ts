class PaginationResult {
    page_number: number = 0;
    page_size: number = 0;
    total_pages: number = 0;
    total_records: number = 0;
    data: Array<any> = [];
};

export default PaginationResult;