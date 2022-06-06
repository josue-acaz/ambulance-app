import BaseService from "./Base/base.service";
import Aerodrome from "../models/Aerodrome";

class AerodromeService extends BaseService<Aerodrome> {
    url = "/Aerodromes";
};

export default AerodromeService;