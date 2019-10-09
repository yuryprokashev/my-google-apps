/**
 * @description ValidatorApp checks the condition and throws an Error if it is not true.
 * Error messages are the input for ValidatorApp methods.
 * @constructor
 */
function ValidatorAppFactory() {
    this.isDefined = function (inputParameterName, value, additionalMessage) {
        if(value === undefined || value === "") throw new Error(inputParameterName + " is not defined.\n" + additionalMessage);
    };
    this.isOneElement = function (objects, messageIfNothing, messageIfMany) {
        if(objects.length === 0){
            throw new Error(messageIfNothing);
        }
        if(objects.length > 1){
            throw new Error(messageIfMany);
        }
    };
    this.isTrue = function (condition, messageIfFalse) {
        if(!condition) throw new Error(messageIfFalse);
    };
}