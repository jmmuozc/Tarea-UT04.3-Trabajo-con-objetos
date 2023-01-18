import { InvalidString } from "./Exceptions";
let videoSystem = (function () {

    let instantiated;
    function init(systemName) {
        class VideoSystem {

            #SystemName;
            #Users;
            #ProductionsList;
            #CategoriesList;
            #ActorList;
            #DirectorList;

            constructor(systemName){
                this.#SystemName=systemName;
            }


        }
        
        let vs= new VideoSystem(systemName);
        
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