class BaseEntity {
    [key: string]: any;
    id: string = "";
    created_at: string = "";
    updated_at: string = "";
    created_by: string = "";
    updated_by: string = "";
    excluded: boolean = false;
};

export default BaseEntity;