import Person from './Person.js';
import Production from './Production.js';
try {
    let person= new Person("Lucia","Ruiz","30/2/2002","Suarez","example.jpg");
    console.log(person.getBorn());
    console.log("test");
} catch (error) {
    console.log(error.message);
}