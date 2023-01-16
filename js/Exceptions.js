"use strict";
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can’t be called as a Function.", fileName, lineNumber);
        this.name = "Invalid Access Constructor Exception";
    }
}

//Excepción String no cumple su patrón
class InvalidString extends BaseException {
    constructor(fileName, lineNumber) {
        super("String is not valid according to its pattern.", fileName, lineNumber);
        this.name = "Invalid String Exception";
    }
}

//Excepción fecha es invalida
class InvalidDate extends BaseException {
    constructor(fileName, lineNumber) {
        super("Date is not valid", fileName, lineNumber);
        this.name = "Invalid Date Exception";
    }
}

//Excepción número es invalida
class InvalidNumber extends BaseException {
    constructor(fileName, lineNumber) {
        super("Number is not valid", fileName, lineNumber);
        this.name = "Invalid Number Exception";
    }
}

//Excepción File no es valido
class InvalidFile extends BaseException {
    constructor(fileName, lineNumber) {
        super("File is not valid", fileName, lineNumber);
        this.name = "Invalid File Exception";
    }
}

//Excepción Clase abstracta
class AbstractClass extends BaseException {
    constructor(fileName, lineNumber) {
        super("Class is abstract", fileName, lineNumber);
        this.name = "Abstracts Class Exception";
    }
}

export {InvalidAccessConstructorException,InvalidString,InvalidDate,InvalidNumber,InvalidFile,
AbstractClass}