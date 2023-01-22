"use strict"
import Person from './Person.js';
import Serie from './Serie.js';
import Category from './Category.js';
import videoSystem from './VideoSystem.js';
import User from './User.js';
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
    let videoSystemTest= videoSystem.getInstance("CinesAmigos");
    let userTest= videoSystemTest.userFactory("Test","Test@gmail.com","TestPasswd123");
    let categoryTest= new Category("Test");
    console.log("Añadir Categorias");
    console.log(videoSystemTest.addCategory(categoryTest));
    console.log("Eliminar Categorias");
    console.log(videoSystemTest.removeCategory(categoryTest));
    console.log("Añadir usuario");
    console.log(videoSystemTest.addUser(userTest));
    // console.log(videoSystemTest.removeCategory(categoryTest));
} catch (error) {
    console.log(error.message);
}