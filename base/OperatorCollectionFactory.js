/**
 * 
 * @constructor
 */
function OperatorCollectionFactory(baseModule) {
    var _operatorMap = baseModule.IndexFactory.createOneToOneIndex();
    _operatorMap.set("eq", eq);
    _operatorMap.set("gte", gte);
    _operatorMap.set("gt", gt);
    _operatorMap.set("lte", lte);
    _operatorMap.set("lt", lt);
    _operatorMap.set("not", not);
    this.getByName = function (operatorName) {
        return _operatorMap.get(operatorName);
    };
    function eq(firstValue, secondValue) {
        if(typeof secondValue === "string"){
            return firstValue.toLowerCase().trim() === secondValue.toLowerCase().trim();
        }
        else {
            return firstValue === secondValue;
        }
    }
    function gte(firstValue, secondValue){
        return firstValue >= secondValue;
    }
    function gt(firstValue, secondValue) {
        return firstValue > secondValue;
    }
    function lte(firstValue, secondValue){
        return firstValue <= secondValue;
    }
    function lt(firstValue, secondValue) {
        return firstValue < secondValue;
    }
    function not(firstValue, secondValue){
        return firstValue !== secondValue;
    }
}