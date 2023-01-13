class Person{
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name,lastname1,lastname2,born,picture){
        this.#name=name;
        this.#lastname1=lastname1;
        this.#lastname2=lastname2;
        this.#born=born;
        this.#picture=picture;
    }

    getName(){
        return this.#name;
    }

    getFirstLastName(){
        return this.#lastname1;
    }

    getSecondLastName(){
        return this.#lastname2;
    }

    getBorn(){
        return this.#born;
    }

    getPicture(){
        return this.#picture;
    }

    setPicture(newPicture){
        this.#picture=newPicture;
    }

    toString(){
        return "PERSON: " + this.#name + "\n" + "last Name: " + this.#lastname1 + "\n" 
        + "last Name2: "+this.#lastname2+"\n" + "Born in: " + this.#date + "\n"
        +"picture: "+this.#picture+"\n"
    }
}