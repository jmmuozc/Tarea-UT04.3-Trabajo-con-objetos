import {InvalidString} from "./Exceptions.js";
import {stringPattern,emailPattern,passwdPattern} from "./Modules.js";

class User{
    #Username;
    #Email;
    #Password;

    constructor(username,email,password){
        if (!stringPattern.test(username)) throw new InvalidString();
        if (!emailPattern.test(email)) throw new InvalidString();
        if (!passwdPattern.test(password)) throw new InvalidString();
        this.#Username=username;
        this.#Email=email;
        this.password=password;
    }
    
    getUsername(){
        return this.#Username
    }
    
    setUsername(username){
        if (!stringPattern.test(username)) throw new InvalidString();
        this.#Username=username;
    }
    
    getEmail(){
        return this.#Email
    }
    
    setEmail(email){
        if (!emailPattern.test(email)) throw new InvalidString();
        this.#Email=email;
    }
    
    getPassword(){
        return this.#Password
    }
    
    setPassword(password){
        if (!passwdPattern.test(password)) throw new InvalidString();
        this.#Password=password;
    }
}

export default User;