import { InvalidObject,InvalidNumber } from "./Exceptions.js";
import Coordinate from "./Coordinate.js";
import Production from "./Production.js";
import Resource from "./Resource.js";
class Serie extends Production{
    #Resource=[];
    #Locations=[];
    #Seasons;

    constructor(seasons=1) {
        this.#Seasons=seasons;
    }

    getSeasons(){
        return this.#Seasons;
    }

    setSeasons(seasons){
        if (isNaN(seasons)) throw new InvalidNumber();
        this.#Seasons=seasons;
    }

    getResource() {
        return this.#Resource;
    }

    addResource(resource) {
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource.push(resource);
    }
    
    getLocations() {
        return this.#Locations
    }
    
    addLocation(location) {
        if (!(location instanceof Coordinate)) throw new InvalidObject();
        this.#Locations.push(location);
    }
}

export default Serie;