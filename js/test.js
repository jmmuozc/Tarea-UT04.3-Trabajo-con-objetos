"use strict"
import Person from './Person.js';
import Serie from './Serie.js';
import Category from './Category.js';
import videoSystem from './VideoSystem.js';
import User from './User.js';
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
    let personTest=videoSystemTest.personFactory("Lucia","01234567A" ,"Ruiz","30/2/2002","Suarez");
    console.log(personTest.Born);


    let serie= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);
    
    let serietest= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);



} catch (error) {
    console.log(error.message);
}

