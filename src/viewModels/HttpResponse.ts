class HttpResponse<T> {
    data!: T;
    warnings: Array<string> = [];
};

export default HttpResponse;