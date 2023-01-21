import Person from "./Person.js";
import Category from "./Category.js";
import User from "./User.js";
import Movie from "./Movie.js";
import Serie from "./Serie.js";
import { stringPattern } from "./Modules.js";
import { InvalidObject, InvalidString, CategoryExists, UsernameExists, EmailExists } from "./Exceptions.js";
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
                        // Recorremos todas las imágenes de la categoría que estamos borrando 
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
                    } else {
                        throw new DefaultCategoryproductionManagerException();
                    }
                }
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
                let position = this.#getUserPositionUsername(user);
                let positionEmail = this.#getUserPositionEmail(user);
                if (position === -1) {
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