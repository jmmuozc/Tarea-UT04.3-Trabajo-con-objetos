import {InvalidFile,InvalidNumber} from "./Exceptions.js";
import {imgPattern} from "./Modules.js";

class Resource{
    #Duration;
    #link;

    constructor(duration,link){
        if (isNaN(duration)) throw new InvalidNumber();
        if (!imgPattern.test(link)) throw new InvalidFile();
        this.#Duration=duration;
        this.#link=link;
    }

    getDuration(){
        return this.#Duration;
    }

    getlink(){
        return this.#link
    }

}

export default Resource;