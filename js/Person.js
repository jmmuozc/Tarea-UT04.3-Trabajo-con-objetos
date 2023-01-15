const stringPattern= /^[A-Z]{1}[a-z]{2,}/;
const imgPattern= /.*(png|jpg|jpeg)$/;
const datePattern= /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
class Person{
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name,lastname1,lastname2,born,picture){
        if (!this.StringPattern.test(name)) throw new InvalidString(); 
        if (!this.StringPattern.test(lastname1)) throw new InvalidString(); 
        if (!this.StringPattern.test(lastname2)) throw new InvalidString(); 
        if (!this.datePattern.test(born)) throw new InvalidDate();
        if (!this.imgPattern.test(picture)) throw new InvalidFile();
        this.#name=name;
        this.#lastname1=lastname1;
        this.#lastname2=lastname2;
        this.#born=this.stringToDate(born);
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
        if (!this.imgPattern.test(newPicture)) throw new InvalidFile();
        this.#picture=newPicture;
    }

    toString(){
        return "PERSON: " + this.#name + "\n" + "last Name: " + this.#lastname1 + "\n" 
        + "last Name2: "+this.#lastname2+"\n" + "Born in: " + this.#born + "\n"
        +"picture: "+this.#picture+"\n"
    }

    stringToDate(StringDate){
        //Transforma en array el String de la fecha dividiendolo por /
        let fechaArray=StringDate.split("/");
        // Transforma en un objeto fecha un conjunto de números
        let fecha= new Date(Date.UTC(fechaArray[2],fechaArray[1],fechaArray[0],0,0,0));
        return fecha;
    }
}

export default Person;