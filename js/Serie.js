import { InvalidObject, InvalidNumber } from "./Exceptions.js";
import Coordinate from "./Coordinate.js";
import Production from "./Production.js";
import Resource from "./Resource.js";
import { stringToDate } from "./Modules.js";
class Serie extends Production {
    #Resource = [];
    #Locations = [];
    #Title;
    #Publication;
    #Nationality;
    #Synopsis;
    #Image;
    #Seasons;

    constructor(title, publication, nationality = "NaN", synopsis = "", image = "default.png", seasons = 1) {
        super(title, publication, nationality, synopsis, image);
        this.#Seasons = seasons;
        this.#Title = title;
        this.#Publication = stringToDate(publication);
        this.#Nationality = nationality;
        this.#Synopsis = synopsis;
        this.#Image = image;
    }

    getSeasons() {
        return this.#Seasons;
    }

    setSeasons(seasons) {
        if (isNaN(seasons)) throw new InvalidNumber();
        this.#Seasons = seasons;
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

    toString(){
        return this.#Nationality;
    }
}

export default Serie;