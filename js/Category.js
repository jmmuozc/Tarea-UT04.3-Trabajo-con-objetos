import {InvalidString} from "./Exceptions.js";
const stringPattern= /^[A-Z]{1}[a-z]{2,}/;

class Category{
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

export default Category;