import Person from "./Person.js";
import Category from "./Category.js";
import User from "./User.js";
import Resource from "./Resource.js";
import Movie from "./Movie.js";
import Serie from "./Serie.js";
import { stringPattern } from "./Modules.js";
import {
    InvalidObject, InvalidString, CategoryExists, CategoryNoExists, UsernameExists, EmailExists, UserNoExists, UserExists, PersonExists,
    ProductionExists, ProductionNoExists, ActorExists, ActorNoExists, DirectorExists, DirectorNoExists
} from "./Exceptions.js";
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
                    return (element.actor.dni === actor.dni)
                }

                return this.#ActorList.findIndex(compareElements);
            }

            #getDirectorPosition(director) {
                if (!(director instanceof Person)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.director.dni === director.dni)
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
                let position = this.#getProductionPosition(production);
                if (position === -1) {
                    this.#ProductionsList.push(production);
                } else throw new ProductionExists();

                return this.#ProductionsList.length;
            }

            removeProductions(production) {
                if (!(production instanceof Production)) throw new InvalidObject();
                if (!(this.#getProductionPosition(production) === -1)) throw new ProductionNoExists();
                let productionPosition;
                for (let index of this.#ProductionsList) {
                    // Comprueba que la produccion exista dentro de cada array de producciones
                    productionPosition = this.#getProductionPosition(production, this.#CategoriesList[index].productions);
                    if (productionPosition > -1) {
                        this.#CategoriesList[index].productions.splice(productionPosition, 1);
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

            addActor(actor) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                position = this.#getActorPosition(actor);
                if (position === -1) {
                    this.#ActorList.push(
                        {
                            actor: actor,
                            productions: []
                        }
                    );
                } else throw new ActorExists();

                return this.#ActorList.length;
            }

            removeActor(actor) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                let position = this.#getActorPosition(actor);
                if (position != -1) {
                    this.#ActorList.splice(position, 1);
                } else throw new ActorNoExists();
                return this.#ActorList.length;
            }

            //Devuelve todos los usuarios
            get Directors() {
                let directorsArray = this.#DirectorList;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < directorsArray.length; i++) {
                            yield directorsArray[i];

                        }
                    }
                }
            }

            addDirector(director) {
                if (!(director instanceof Person)) throw new InvalidObject();
                position = this.#getDirectorPosition(director);
                if (position === -1) {
                    this.#DirectorList.push(
                        {
                            director: director,
                            productions: []
                        }
                    );
                } else throw new DirectorExists();

                return this.#DirectorList.length;
            }

            removeDirector(director) {
                if (!(director instanceof Person)) throw new InvalidObject();
                let position = this.#getDirectorPosition(director);
                if (position != -1) {
                    this.#DirectorList.splice(position, 1);
                } else throw new DirectorNoExists();
                return this.#DirectorList.length;
            }

            assignCategory(category, ...production) {
                if (!(category instanceof Category)) throw new InvalidObject();
                let catPosition = this.#getCategoryPosition(category);
                if (catPosition === -1) this.addCategory(category);
                production.forEach(element => {
                    if (!(element instanceof Production)) throw new InvalidObject();
                    if (this.#getProductionPosition(element) === -1) this.addProductions(element);
                    if (this.#getProductionPosition(element, this.#CategoriesList[catPosition].productions) === -1) {
                        this.#CategoriesList[catPosition].productions.push(element);
                    }
                });
                return this.#CategoriesList[catPosition].length;
            }

            deassignCategory(category, ...production) {
                if (!(category instanceof Category)) throw new InvalidObject();
                let catPosition = this.#getCategoryPosition(category);
                if (catPosition === -1) throw new CategoryNoExists;
                let prodPosition;
                production.forEach(element => {
                    if (!(element instanceof Production)) throw new InvalidObject();
                    if (this.#getProductionPosition(element) > -1) {
                        prodPosition = this.#getProductionPosition(element, this.#CategoriesList[catPosition].productions);
                        if (prodPosition > -1) {
                            this.#CategoriesList[catPosition].productions.splice(prodPosition, 1);
                        }
                    }else console.log("Production does not exists");
                });
                return this.#CategoriesList[catPosition].length;
            }

            assignDirector(director, ...production){
                if (!(director instanceof Person)) throw new InvalidObject();
                let directorPosition = this.#getDirectorPosition(director);
                if (directorPosition === -1) this.#DirectorList.push(director);
                production.forEach(element => {
                    if (!(element instanceof Production)) throw new InvalidObject();
                    if (this.#getProductionPosition(element) === -1) this.addProductions(element);
                    if (this.#getProductionPosition(element, this.#DirectorList[directorPosition].productions) === -1) {
                        this.#DirectorList[directorPosition].productions.push(element);
                    }
                });
                return this.#DirectorList[directorPosition].length;
            }

            deassignDirector(director, ...production){
                if (!(director instanceof Person)) throw new InvalidObject();
                let directorPosition = this.#getCategoryPosition(director);
                if (directorPosition === -1) throw new DirectorNoExists;
                let prodPosition;
                production.forEach(element => {
                    if (!(element instanceof Production)) throw new InvalidObject();
                    if (this.#getProductionPosition(element) > -1) {
                        prodPosition = this.#getProductionPosition(element, this.#DirectorList[directorPosition].productions);
                        if (prodPosition > -1) {
                            this.#DirectorList[directorPosition].productions.splice(prodPosition, 1);
                        }
                    }else console.log("Production does not exists");
                });
                return this.#DirectorList[directorPosition].length;
            }

            assignActor(actor, ...production){
                if (!(actor instanceof Person)) throw new InvalidObject();
                let actorPosition = this.#getActorPosition(director);
                if (actorPosition === -1) this.#ActorList.push(director);
                production.forEach(element => {
                    if (!(element instanceof Production)) throw new InvalidObject();
                    if (this.#getProductionPosition(element) === -1) this.addProductions(element);
                    if (this.#getProductionPosition(element, this.#ActorList[actorPosition].productions) === -1) {
                        this.#ActorList[actorPosition].productions.push(element);
                    }
                });
                return this.#ActorList[actorPosition].length;
            }

            deassignActor(actor, ...production){
                if (!(actor instanceof Person)) throw new InvalidObject();
                let actorPosition = this.#getActorPosition(actor);
                if (actorPosition === -1) throw new ActorNoExists();
                let prodPosition;
                production.forEach(element => {
                    if (!(element instanceof Production)) throw new InvalidObject();
                    if (this.#getProductionPosition(element) > -1) {
                        prodPosition = this.#getProductionPosition(element, this.#ActorList[actorPosition].productions);
                        if (prodPosition > -1) {
                            this.#ActorList[actorPosition].productions.splice(prodPosition, 1);
                        }
                    }else console.log("Production does not exists");
                });
                return this.#ActorList[actorPosition].length;
            }

            *getCast(production){
                if (!(production instanceof Production)) throw new InvalidObject();
                let CastArray=[];
                let prodPosition;
                this.#ActorList.forEach(element =>{
                    prodPosition=this.#getProductionPosition(production,element.productions);
                    if(prodPosition>-1){
                        CastArray.push(element.productions[prodPosition]);
                    }
                });

                for (let cast of CastArray){
                    yield cast;
                }
            }

            *getProductionsDirector(director){
                if (!(director instanceof Person)) throw new InvalidObject();

                let arrayProductionsDirector= this.#DirectorList[this.#getDirectorPosition(director)].productions;

                for (let productions of arrayProductionsDirector){
                    yield productions;
                }
            }

            *getProductionsActor(actor){
                if (!(actor instanceof Person)) throw new InvalidObject();

                let arrayProductionsActor= this.#ActorList[this.#getActorPosition(actor)].productions;

                for (let productions of arrayProductionsActor){
                    yield productions;
                }
            }

            *getProductionsCategory(category){
                if (!(category instanceof Category)) throw new InvalidObject();

                let arrayProductionsCategory= this.#ProductionsList[this.#getCategoryPosition(category)].productions;

                for (let productions of arrayProductionsCategory){
                    yield productions;
                }
            }

            personFactory(name, dni, lastname1, born, lastname2 = "Example", picture = "Base.jpg") {
                let createdPerson = new Person(name, dni, lastname1, born, lastname2, picture);
                let positionActor = this.#getActorPosition(createdPerson);
                let positionDirector = this.#getDirectorPosition(createdPerson);
                if (positionDirector == -1 && positionActor == -1) {
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
            categoryFactory(name,description="") {
                let createdCategory = new Category(name,description);
                let position = this.#getCategoryPosition(createdCategory);
                if (position === -1) {
                    return createdCategory;
                } else throw new UserExists();

            }

            movieFactory(title, publication, nationality = "NaN", synopsis = "", image = "default.png", resource = new Resource(5, "example.png")) {
                let createdMovie = new Movie(title, publication, nationality, synopsis, image, resource);
                let position = this.#getProductionPosition(createdMovie);
                if (position === -1) {
                    return createdMovie;
                } else throw new ProductionExists();
            }

            serieFactory(title, publication, nationality = "NaN", synopsis = "", image = "default.png", resource = new Resource(5, "example.png")) {
                let createdSerie = new Serie(title, publication, nationality, synopsis, image, resource);
                let position = this.#getProductionPosition(createdSerie);
                if (position === -1) {
                    return createdSerie;
                } else throw new ProductionExists();
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