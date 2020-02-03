/**
 *
 * @constructor
 */
function ConditionEvaluator(baseModule){
    this.evaluate = function (conditionCollection, actualObject) {
        var isAllMatch = true;
        conditionCollection.getAll().forEach(function(condition){
            isAllMatch = isAllMatch && _evaluateCondition(condition, actualObject);
        });
        return isAllMatch;
    };
    function _evaluateCondition(condition, actualObject){
        var objectGetterName = condition.getObjectGetterName();
        var operatorName = condition.getOperatorName();
        var actualValue = actualObject[objectGetterName];
        if(typeof actualObject[objectGetterName] === "function") actualValue = actualObject[objectGetterName]();
        var operator = baseModule.OperatorCollection.getByName(operatorName);
        return operator(actualValue, condition.getExpectedValue());
    }
}