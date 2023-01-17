import { InvalidNumber } from "./Exceptions.js";
class Coordinate {
    #Latitude;
    #Longitude;

    constructor(latitude, longitude) {
        if (isNaN(latitude)) throw new InvalidNumber();
        if (isNaN(longitude)) throw new InvalidNumber();
        this.#Latitude = latitude;
        this.#Longitude = longitude;
    }

    getLongitude() {
        return this.#Longitude;
    }

    setLongitude(longitude) {
        if (isNaN(longitude)) throw new InvalidNumber();
        this.#Longitude = longitude;
    }

    getLatitude() {
        return this.#Latitude
    }

    addLatitude(latitude) {
        if (isNaN(latitude)) throw new InvalidNumber();
        this.#Latitude.push(latitude);
    }
}

export default Coordinate;