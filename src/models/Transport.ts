import BaseEntity from "./Base/BaseEntity";
import TransportSegment from "./TransportSegment";

class Transport extends BaseEntity {
    code: number = 0;
    ambulance_id: string = "";
    ambulance_quote_id: string = "";
    transport_segments: Array<TransportSegment> = [];
};

export default Transport;