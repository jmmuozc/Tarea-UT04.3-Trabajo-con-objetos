import Person from "./Person.js";
import Category from "./Category.js";
import Movie from "./Movie.js";
import Serie from "./Serie.js";
import { InvalidObject, InvalidString,CategoryExists } from "./Exceptions.js";
let videoSystem = (function () {

    let instantiated;
    function init(systemName) {
        class VideoSystem {

            #SystemName;
            #Users;
            #CategoriesList;
            #ProductionsList;
            #ActorList;
            #DirectorList;

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
            // Imágenes del autor y la categoría por defecto.
            #defaultAuthorImages;
            #defaultCategoryImages;

            //Funciones privadas
            //Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
            //Hemos elegido comparar por contenido no por referencia.
            #getCategoryPosition(category) {
                if (!(category instanceof Category)) {
                    throw new InvalidObject();
                }

                function compareElements(element) {
                    return (element.category.name === category.name)
                }

                return this.#CategoriesList.findIndex(compareElements);
            }

            constructor(systemName) {
                // No puede tener menos de 3 letras, para formar un Acronimo o una palabra con sentido
                if (!stringPattern.test(systemName)) throw new InvalidString();
                this.#SystemName = systemName;
            }

            get systemName() {
                return this.#SystemName;
            }

            set systemName(systemName) {
                // No puede tener menos de 3 letras, para formar un Acronimo o una palabra con sentido
                if (!stringPattern.test(systemName)) throw new InvalidString();
                this.#SystemName = systemName
            }

            // Devuelve un iterador de Categories
            get CategoriesList() {
                return this.#CategoriesList[Symbol.iterator]();
            }

            addCategory(category) {
                if (!(category instanceof Category)) throw new InvalidObject();
                let position = this.#getCategoryPosition(category);
                if (position === -1) {
                    // Añade objeto literal con una propiedad para la categoría y un array para las imágenes dentro de la categoría
                    this.#CategoriesList.push(
                        {
                            category: category,
                            images: []
                        }
                    );
                } else {
                    throw new CategoryExists();
                }

                return this;
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