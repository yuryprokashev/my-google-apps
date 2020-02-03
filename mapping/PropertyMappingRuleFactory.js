/**
 *
 * @param objectMappingRuleCollection
 * @constructor
 */
function PropertyMappingRuleFactory(objectMappingRuleCollection) {

    this.getBuilder = function () {
        return new PropertyMappingRuleBuilder();
    };

    /**
     *
     * @constructor
     */
    function PropertyMappingRuleBuilder() {
        var _sourceObjectType, _sourcePropertySpec, _targetPropertySpec;
        this.setSourceObjectType = function (str) {
            _sourceObjectType = str;
            return this;
        };
        this.setSourcePropertySpec = function (collection) {
            _sourcePropertySpec = collection;
            return this;
        };
        this.setTargetPropertySpec = function (collection) {
            _targetPropertySpec = collection;
            return this;
        };
        this.build = function () {
            return new PropertyMappingRule(_sourceObjectType, _sourcePropertySpec, _targetPropertySpec);
        }
    }
    /**
     *
     * @constructor
     */
    function PropertyMappingRule(sourceObjectType, sourcePropertySpec, targetPropertySpec) {
        this.getSourceObjectType = function () {
            return sourceObjectType;
        };
        this.getTargetPropertySpec = function () {
            return targetPropertySpec;
        };
        this.getSourcePropertySpec = function () {
            return sourcePropertySpec;
        };
    }
}