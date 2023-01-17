import { InvalidObject } from "./Exceptions.js";
import Coordinate from "./Coordinate.js";
import Production from "./Production.js";
import Resource from "./Resource.js";
import { stringToDate } from "./Modules.js";
class Movie extends Production {
    #Resource;
    #Title;
    #Publication;
    #Nationality;
    #Synopsis;
    #Image;
    #Locations = [];

    constructor(title, publication, nationality = "NaN", synopsis = "", image = "default.png", resource = new Resource(5, "example.png")) {
        super(title, publication, nationality, synopsis, image);
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource = resource;
        this.#Title = title;
        this.#Publication = stringToDate(publication);
        this.#Nationality = nationality;
        this.#Synopsis = synopsis;
        this.#Image = image;
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

    addLocation(location) {
        if (!(location instanceof Coordinate)) throw new InvalidObject();
        this.#Locations.push(location);
    }
}

export default Movie;