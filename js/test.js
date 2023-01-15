import Person from './Person.js';
try {
    let person= new Person("Lucia","Ruiz","15/9/2002","Suarez","example.jpg");
    console.log(person.getBorn());
    console.log("test");
} catch (error) {
    console.log(error.message);
}