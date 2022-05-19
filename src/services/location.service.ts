import BaseService from "./Base/base.service";
import Location from "../models/Location";

class LocationService extends BaseService<Location> {
    url = "/Locations";
};

export default LocationService;