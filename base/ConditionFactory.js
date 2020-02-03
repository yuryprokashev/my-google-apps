/**
 *
 * @constructor
 */
function ConditionFactory() {
    this.getBuilder = function () {
        return new ConditionBuilder();
    };

    /**
     *
     * @constructor
     */
    function ConditionBuilder(){
        var _objectGetter, _operator, _expectedValue;
        this.setExpectedKeyValue = function (keyValue) {
            _objectGetter = keyValue.getKey();
            _expectedValue = keyValue.getValue();
            return this;
        };
        this.setOperatorName = function (str) {
            _operator = str;
            return this;
        };
        this.build = function () {
            return new Condition(_objectGetter, _operator, _expectedValue);
        }
    }

    /**
     *
     * @constructor
     */
    function Condition(objectGetterName, operatorName, expectedValue) {
        this.getObjectGetterName = function () {
            return objectGetterName;
        };
        this.getOperatorName = function () {
            return operatorName;
        };
        this.getExpectedValue = function () {
            return expectedValue;
        };
    }
}