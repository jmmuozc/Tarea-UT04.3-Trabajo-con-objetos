import { InvalidObject } from "./Exceptions.js";
import Coordinate from "./Coordinate.js";
import Production from "./Production.js";
import Resource from "./Resource.js";
class Movie extends Production{
    #Resource;
    #Locations=[];

    constructor(resource = new Resource(5, "example.png")) {
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource = resource;
    }

    getResource() {
        return this.#Resource;
    }

    setResource(resource) {
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource = resource;
    }
    
    getLocations() {
        return this.#Locations
    }
    
    addLocations(location) {
        if (!(location instanceof Coordinate)) throw new InvalidObject();
        this.#Locations.push(location);
    }
}

export default Movie;