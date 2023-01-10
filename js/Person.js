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

    toString(){
        return "PERSON: " + this.#name + "\n" + "last Name: " + this.#lastname1 + "\n" 
        + "last Name2: "+this.#lastname2+"\n" + "Born in: " + this.#date + "\n"
        +"picture: "+this.#picture+"\n"
    }
}