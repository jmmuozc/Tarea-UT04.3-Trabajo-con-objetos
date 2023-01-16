import {InvalidString} from "./Exceptions.js";
import stringPattern from "./Modules.js";

class Movie{
    #Name;
    #Description;

    constructor(name,description=""){
        if (!stringPattern.test(name)) throw new InvalidString();
        this.#Name=name;
        this.#Description=description;
    }

    getName(){
        return this.#Name;
    }

    getDescription(){
        return this.#Description
    }

    setDescription(description){
        this.#Description=description;
    }
}

export default Movie;