/**
 *
 * @constructor
 */
function ValidatorFactory() {
    this.isDefined = function (inputParameterName, value, additionalMessage) {
        if(!additionalMessage) additionalMessage ="";
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
    this.isFalse = function (condition, messageIfFalse) {
        if(!condition) throw new Error(messageIfFalse);
    };
}