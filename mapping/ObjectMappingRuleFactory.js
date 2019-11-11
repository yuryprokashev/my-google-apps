/**
 *
 * @constructor
 */
function ObjectMappingRuleFactory() {

    this.getBuilder = function () {
        return new ObjectMappingRuleBuilder();
    };

    /**
     *
     * @constructor
     */
    function ObjectMappingRuleBuilder() {
        var _propertyMappingRules = [];
        var _sourceObjectConditionCollection;
        var _sourceObjectType;
        this.setSourceObjectType = function (str) {
            _sourceObjectType = str;
            return this;
        };
        this.setSourceObjectConditionCollection = function (conditionCollection) {
            _sourceObjectConditionCollection = conditionCollection;
            return this;
        };
        this.addPropertyMappingRule = function (propertyMappingRule) {
            _propertyMappingRules.push(propertyMappingRule);
            return this;
        };
        this.build = function () {
            return new ObjectMappingRule(_sourceObjectType, _sourceObjectConditionCollection, _propertyMappingRules);
        };
    }

    /**
     *
     * @constructor
     */
    function ObjectMappingRule(sourceObjectType, sourceObjectConditionCollection, propertyMappingRules) {
        this.getSourceObjectType = function () {
            return sourceObjectType;
        };
        this.getSourceObjectConditionCollection = function () {
            return sourceObjectConditionCollection;
        };
        this.getPropertyMappingRules = function () {
            return propertyMappingRules;
        };
    }
}