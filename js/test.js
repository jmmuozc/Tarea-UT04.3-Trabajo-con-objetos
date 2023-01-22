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
    
} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear Category Error----------------");
try {
    let categoryTest= videoSystemTest.categoryFactory("","Es una categoria de prueba");
    
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar Category----------------");
try {
    let categoryTestRemove= videoSystemTest.categoryFactory("TestEliminar","Es una categoria de prueba");
    console.log("--------------Añadir Category--------------");
    console.log(videoSystemTest.addCategory(categoryTestRemove));
    console.log("--------------Eliminar Category--------------");
    console.log(videoSystemTest.removeCategory(categoryTestRemove));
    console.log("--------------Eliminar Category Error--------------");
    console.log(videoSystemTest.removeCategory(categoryTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear User----------------");
try {
    let userTest= videoSystemTest.userFactory("Test","Test@gmail.com","TestPasswd123");
    console.log(userTest.toString());
    console.log("--------------Crear User Error--------------");
    let userTestError= videoSystemTest.userFactory("Test","Test@gmail.com","wd123");
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Añadir User----------------");
try {
    let userTest= videoSystemTest.userFactory("Test","Test@gmail.com","TestPasswd123");

    console.log("--------------Añadir Users--------------");
    console.log(videoSystemTest.addUser(userTest));
    console.log("--------------Añadir Users Error--------------");
    console.log(videoSystemTest.addUser(userTest));
    
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar User----------------");
try {
    let userTestRemove= videoSystemTest.userFactory("TestEliminar","TestEliminar@gmail.com","Passwd123");
    console.log("--------------Añadir User--------------");
    console.log(videoSystemTest.addUser(userTestRemove));
    console.log("--------------Eliminar User--------------");
    console.log(videoSystemTest.removeUser(userTestRemove));
    console.log("--------------Eliminar User Error--------------");
    console.log(videoSystemTest.removeUser(userTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear Serie----------------");
try {
    let serieTest= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);
    console.log(serieTest.toString());
    console.log("--------------Crear Serie Error--------------");
    let serieTestError= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg","a");
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Añadir Serie----------------");
try {
    let serieTest= videoSystemTest.serieFactory("Prueba","15/9/2002","ES","Es una prueba","default.jpg",1);

    console.log("--------------Añadir Serie--------------");
    console.log(videoSystemTest.addProductions(serieTest));
    console.log("--------------Añadir Serie Error--------------");
    console.log(videoSystemTest.addProductions(serieTest));
    
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar Serie----------------");
try {
    let serieTestRemove= videoSystemTest.serieFactory("PruebaBorrar","15/9/2002","ES","Es una prueba","default.jpg",1);
    console.log("--------------Añadir Serie--------------");
    console.log(videoSystemTest.addProductions(serieTestRemove));
    console.log("--------------Eliminar Serie--------------");
    console.log(videoSystemTest.removeProductions(serieTestRemove));
    console.log("--------------Eliminar Serie Error--------------");
    console.log(videoSystemTest.removeProductions(serieTestRemove));
} catch (error) {
    console.log(error.message);
}
console.log("");
