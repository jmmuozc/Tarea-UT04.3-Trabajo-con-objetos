import Person from "./Person.js";
import Category from "./Category.js";
import User from "./User.js";
import Resource from "./Resource.js";
import Movie from "./Movie.js";
import Serie from "./Serie.js";
import { stringPattern } from "./Modules.js";
import { InvalidObject, InvalidString, CategoryExists, CategoryNoExists, UsernameExists, EmailExists, UserNoExists, UserExists,PersonExists,
    ProductionExists,ProductionNoExists } from "./Exceptions.js";
import Production from "./Production.js";
let videoSystem = (function () {

    let instantiated;
    function init(systemName) {
        class VideoSystem {

            #SystemName;
            #Users = [];
            #CategoriesList = [];
            #ProductionsList = [];
            #ActorList = [];
            #DirectorList = [];

            /* Estructura para almacenar los objetos
            #SystemNme //Nombre del sistema
            #Users: [] //Array con los usuarios
            #CategoriesList: [ // Array que contiene un objeto literal con la categoria y un array
            {
                Category: Category,
                Productions [Serie,Movie] //Array con las referencias a los objetos Production
            }
            ]
            #ProductionsList: [] //Array con las producciones
            #ActorList{
                Actor: Person,
                Productions [Serie,Movie] //Array con las referencias a los objetos Production
            }
            #DirectorList{
                Director: Person,
                Productions [Serie,Movie] //Array con las referencias a los objetos Production
            }
            */
            #defaultCategory = new Category("Anonymous category"); //Categoría por defecto	

            //Funciones privadas
            //Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
            //Hemos elegido comparar por contenido.
            #getCategoryPosition(category) {
                if (!(category instanceof Category)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.category.Name === category.Name)
                }

                return this.#CategoriesList.findIndex(compareElements);
            }

            //Dado una produccion, devuelve su posición 
            //Hemos elegido comparar por contenido.
            #getProductionPosition(production, productions = this.#ProductionsList) {
                if (!(production instanceof Production)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.tittle === production.tittle)
                }

                return productions.findIndex(compareElements);
            }

            #getUserPositionUsername(user) {
                if (!(user instanceof User)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.username === user.username)
                }

                return this.#Users.findIndex(compareElements);
            }

            #getUserPositionEmail(user) {
                if (!(user instanceof User)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.email === user.email)
                }

                return this.#Users.findIndex(compareElements);
            }

            #getActorPosition(actor) {
                if (!(actor instanceof Person)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.dni === actor.dni)
                }

                return this.#ActorList.findIndex(compareElements);
            }

            #getDirectorPosition(director) {
                if (!(director instanceof Person)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.dni === director.dni)
                }

                return this.#DirectorList.findIndex(compareElements);
            }


            constructor(systemName) {
                // No puede tener menos de 3 letras, para formar un Acronimo o una palabra con sentido
                if (!stringPattern.test(systemName)) throw new InvalidString();
                this.#SystemName = systemName;
                this.addCategory(this.#defaultCategory);
            }

            get systemName() {
                return this.#SystemName;
            }

            set systemName(systemName) {
                // No puede tener menos de 3 letras, para formar un Acronimo o una palabra con sentido
                if (!stringPattern.test(systemName)) throw new InvalidString();
                this.#SystemName = systemName
            }

            // Devuelve un iterador de CategoriesList
            get CategoriesList() {
                return this.#CategoriesList[Symbol.iterator]();
            }

            addCategory(category) {
                if (!(category instanceof Category)) throw new InvalidObject();
                let position = this.#getCategoryPosition(category);
                if (position === -1) {
                    // Añade objeto literal con una propiedad para la categoría y un array para las producciones dentro de la categoría
                    this.#CategoriesList.push(
                        {
                            category: category,
                            productions: []
                        }
                    );
                } else {
                    throw new CategoryExists();
                }

                return this.#CategoriesList.length;
            }

            removeCategory(category) {
                if (!(category instanceof Category)) throw new InvalidObject();
                let position = this.#getCategoryPosition(category);
                if (position != -1) {
                    if (category.Name !== this.#defaultCategory.Name) {
                        // Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
                        let restPositions = Array.from(Array(this.#CategoriesList.length), (el, i) => i);
                        restPositions.splice(position, 1);
                        restPositions.splice(0, 1);
                        // Recorremos todas las producciones de la categoría que estamos borrando 
                        for (let production of this.#CategoriesList[position].productions) {
                            let insertInDefault = true;
                            for (let index of restPositions) { // Chequeamos si cada productionn pertenece a otra categoría que no sea la de por defecto
                                if (this.#getProductionPosition(production, this.#CategoriesList[index].productions) > -1) {
                                    insertInDefault = false;
                                    break;
                                }
                            }
                            if (insertInDefault) this.#CategoriesList[0].productions.push(production);
                        }
                        this.#CategoriesList.splice(position, 1);
                    }
                } else throw new CategoryNoExists();
                return this.#CategoriesList.length;
            }


            //Devuelve todos los usuarios
            get Users() {
                let usersArray = this.#Users;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < usersArray.length; i++) {
                            yield usersArray[i];

                        }
                    }
                }
            }

            addUser(user) {
                if (!(user instanceof User)) throw new InvalidObject();
                let positionUsername = this.#getUserPositionUsername(user);
                let positionEmail = this.#getUserPositionEmail(user);
                if (positionUsername === -1) {
                    if (positionEmail === -1) {
                        this.#Users.push(user)

                    } else {
                        throw new EmailExists();
                    }
                } else {
                    throw new UsernameExists();
                }

                return this.#Users.length;
            }

            removeUser(user) {
                if (!(user instanceof User)) throw new InvalidObject();
                let positionUsername = this.#getUserPositionUsername(user);
                let positionEmail = this.#getUserPositionEmail(user);
                if (positionUsername != -1 && positionUsername == positionEmail) {
                    this.#Users.splice(positionUsername, 1);
                } else throw new UserNoExists();
                return this.#Users.length;
            }

            //Devuelve todos los usuarios
            get Productions() {
                let productionsArray = this.#ProductionsList;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < productionsArray.length; i++) {
                            yield productionsArray[i];

                        }
                    }
                }
            }

            addProductions(production) { 
                if (!(production instanceof Production)) throw new InvalidObject();
                let position= this.#getProductionPosition(production);
                if (position===-1) {
                    this.#ProductionsList.push(production);
                }else throw new ProductionExists();
                
                return this.#ProductionsList.length;
            }
            
            removeProductions(production){
                if (!(production instanceof Production)) throw new InvalidObject();
                if (!(this.#getProductionPosition(production)===-1)) throw new ProductionNoExists();
                let productionPosition;
                for (let index of this.#ProductionsList) {
                    // Comprueba que la produccion exista dentro de cada array de producciones
                    productionPosition=this.#getProductionPosition(production, this.#CategoriesList[index].productions);
                    if ( productionPosition> -1) {
                        this.#CategoriesList[index].productions.splice(productionPosition,1);
                    }
                }
                return this.#ProductionsList.length;
            }

            //Devuelve todos los usuarios
            get Actors() {
                let actorsArray = this.#ActorList;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < actorsArray.length; i++) {
                            yield actorsArray[i];

                        }
                    }
                }
            }

            personFactory(name, dni, lastname1, born, lastname2 = "Example", picture = "Base.jpg") {
                let createdPerson = new Person(name, dni, lastname1, born, lastname2, picture);
                let positionActor = this.#getActorPosition(createdPerson);
                let positionDirector = this.#getDirectorPosition(createdPerson);
                if (positionDirector == -1 && positionActor ==-1) {
                    return createdPerson;
                } else throw new PersonExists();

            }

            userFactory(username, email, password) {
                let createdUser = new User(username, email, password);
                let positionUsername = this.#getUserPositionUsername(createdUser);
                let positionEmail = this.#getUserPositionEmail(createdUser);
                if (positionEmail === -1 && positionUsername == positionEmail) {
                    return createdUser;
                } else throw new UserExists();

            }

            movieFactory(title, publication, nationality = "NaN", synopsis = "", image = "default.png", resource = new Resource(5, "example.png")){
                let createdMovie = new Movie(title, publication, nationality,synopsis,image,resource);
                let position=this.#getProductionPosition(createdMovie);
                if (position===-1) {
                    return createdMovie;
                }else throw new ProductionExists();
            }

            serieFactory(title, publication, nationality = "NaN", synopsis = "", image = "default.png", resource = new Resource(5, "example.png")){
                let createdSerie = new Serie(title, publication, nationality,synopsis,image,resource);
                let position=this.#getProductionPosition(createdSerie);
                if (position===-1) {
                    return createdSerie;
                }else throw new ProductionExists();
            }
        }

        let vs = new VideoSystem(systemName);

        Object.freeze(vs);

        return vs;
    }
    return {
        getInstance(systemName) {
            // Si no existe instantiated lo crea y le da el valor del objeto
            if (!instantiated) {
                instantiated = init(systemName);
            }
            // Si existe simplemente devuelve el existente
            return instantiated;
        }
    }
}
)();

export default videoSystem;