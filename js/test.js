"use strict"
import Person from './Person.js';
import Serie from './Serie.js';
try {
    let person= new Person("Lucia","Ruiz","30/2/2002","Suarez","example.jpg");
    console.log(person.getBorn());
    console.log("test");
} catch (error) {
    console.log(error.message);
}
try {
    let serie= new Serie("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);
    console.log(serie.getNationality());
    serie.Nationality("NaN");
    console.log(serie.toString());
    console.log(serie.getNationality());
} catch (error) {
    console.log(error.message);
}