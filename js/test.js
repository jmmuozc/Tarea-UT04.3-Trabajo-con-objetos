"use strict"
import videoSystem from './VideoSystem.js';
console.log("------------Intento primer VideoSystem (name=VideoSystemTest)------------");
let videoSystemTest= videoSystem.getInstance("VideoSystemTest");
console.log("--------------Intento Segundo VideoSystem (name=noCreated)---------------");
let videoSystemTestFail= videoSystem.getInstance("noCreated");
console.log(videoSystemTestFail.systemName);
console.log("--------------Crear Person---------------");
try {
    let personTest=videoSystemTest.personFactory("Lucia","01234567A" ,"Ruiz","01/2/2002","Suarez");
    console.log(personTest.toString());
    console.log("--------------Prueba con datos invalidos---------------");
    let personError=videoSystemTest.personFactory("Lucia","0124567A" ,"Ruiz","01/2/2002","Suarez");
    
    
    
    
    
   
    console.log("Eliminar Categorias");
    console.log(videoSystemTest.removeCategory(categoryTest));
    console.log("Añadir usuario");
    console.log(videoSystemTest.addUser(userTest));
    console.log(personTest.Born);
    
    
    let serie= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);
    
    let serietest= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);
} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear Category----------------");
try {
    let categoryTest= videoSystemTest.categoryFactory("Test","Es una categoria de prueba");
    console.log(categoryTest.toString());
    console.log("--------------Añadir Categorias--------------");
    console.log(videoSystemTest.addCategory(categoryTest));
    console.log(videoSystemTest.addCategory(categoryTest));
    console.log(videoSystemTest.removeCategory(categoryTest));
    
} catch (error) {
    console.log(error.message);
}

console.log("--------------Eliminar Category----------------");
try {
    let categoryTestRemove= videoSystemTest.categoryFactory("TestEliminar","Es una categoria de prueba");
    console.log("--------------Añadir Category--------------");
    console.log(videoSystemTest.addCategory(categoryTestRemove));
    console.log("--------------Eliminar Category--------------");
    console.log(videoSystemTest.removeCategory(categoryTestRemove));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear User----------------");
try {
    let userTest= videoSystemTest.userFactory("Test","Test@gmail.com","TestPasswd123");
    console.log(userTest.toString());
    console.log("--------------Añadir User--------------");
    
} catch (error) {
    console.log(error.message);
}
console.log("");
