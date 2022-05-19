import BaseEntity from "./Base/BaseEntity";

class AdditionalInformation extends BaseEntity
{
    index: number = 0;
    text: string = "";
    resource: string = "";
    resource_id?: string = "";
}

export default AdditionalInformation;