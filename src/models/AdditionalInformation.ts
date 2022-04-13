import BaseEntity from "./Base/BaseEntity";

class AdditionalInformation extends BaseEntity
{
    index: number = 0;
    text: string = "";
    aircraft_quote_id?: string = "";
}

export default AdditionalInformation;