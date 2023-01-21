"use strict"
import Person from './Person.js';
import Serie from './Serie.js';
import Category from './Category.js';
import videoSystem from './VideoSystem.js';
try {
    let person= new Person("Lucia","01234567A" ,"Ruiz","30/2/2002","Suarez","example.jpg");
    console.log(person.Born);
    console.log("test");
} catch (error) {
    console.log(error.message);
}
try {
    let serie= new Serie("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);
    console.log("serie.Nationality");
    console.log(serie.Nationality);
    serie.Nationality="NaN";
    console.log("serie.toString()");
    console.log(serie.toString());
    console.log("serie.Nationality");
    console.log(serie.Nationality);
} catch (error) {
    console.log(error.message);
}

try {
    let categoryTest= new Category("Test");
    let videoSystemTest= videoSystem.getInstance("CinesAmigos");
    console.log(videoSystemTest.addCategory(categoryTest));
    console.log(videoSystemTest.removeCategory(categoryTest));
} catch (error) {
    console.log(error.message);
}