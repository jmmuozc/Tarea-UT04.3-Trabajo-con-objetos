import {AbstractClass,InvalidString,InvalidDate,InvalidString,InvalidFile} from "./Exceptions.js";
import { stringPattern, imgPattern, datePattern, stringToDate,nationalityPattern } from "./Modules.js";
class Production {
    #Title;
    #Nationality;
    #Publication;
    #Synopsis;
    #Image;
    constructor(title,publication,nationality="NaN",synopsis="",image="default.png") {
        if (new.target === Production) throw new AbstractClass();
        if (!stringPattern.test(title)) throw new InvalidString();
        if (!datePattern.test(publication)) throw new InvalidDate();
        if (!nationalityPattern.test(nationality)) throw new InvalidString();
        if (!imgPattern.test(image)) throw new InvalidFile();
        this.#Title=title;
        this.#Publication=stringToDate(publication);
        this.#Nationality=nationality;
        this.#Synopsis=synopsis;
        this.#Image=image;
    }
    // Devuelve el nombre de la Production
    getTitle() {
        if (new.target === Production) throw new AbstractFunction();
        return this.#Title;
    }
    // Devuelve el DNI de la Production
    getNationality() {
        // No es necesario?
        if (new.target === Production) throw new AbstractFunction();
        return this.#Nationality;
    }
    // Devuelve la fecha de la Production
    getbirth() {
        if (new.target === Production) throw new AbstractFunction();
        return this.#birth;
    }

    //Devuelve la lista en formato cadena
    toString() {
        if (new.target === Production) throw new AbstractFunction();

        return "Production " + this.#Title + "\n" + "Nationality: " + this.#Nationality + "\n" + "Publication Date: " + this.#Publication + "\n"
        + "Synopsis: " + this.#Synopsis + "Image: " + this.#Image;
    }

}

export default Production; 