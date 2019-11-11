/**
 * Constructs the object mapper interactor.
 * @param baseModule {BaseModule}
 * @constructor
 */
function ObjectMapperFactory(baseModule) {
    this.getBuilder = function () {
        return new ObjectMapperBuilder();
    };

    /**
     *
     * @constructor
     */
    function ObjectMapperBuilder() {
        var _propertyMapper;
        this.setPropertyMapper = function (mapper) {
            _propertyMapper = mapper;
            return this;
        };
        this.build = function () {
            return new ObjectMapper(_propertyMapper);
        }
    }

    /**
     *
     * @param propertyMapper
     * @constructor
     */
    function ObjectMapper(propertyMapper) {
        /**
         * Maps the sourceObject to targetObject using objectMappingRule.
         * @param objectMappingRule {ObjectMappingRule} - the rule that describes mappings between source and target objects
         * @param sourceObject {Object} - any object
         * @throws {Error} - when the sourceObject does not meet the conditions defined in the objectMappingRule
         * @return {*}
         */
        this.map = function (objectMappingRule, sourceObject) {
            baseModule.Validator.isTrue(baseModule.ConditionEvaluator.evaluate(objectMappingRule.getSourceObjectConditionCollection(), sourceObject),
                "Source Object does not meet conditions defined in the object mapping rule");
            var targetObject = {};
            objectMappingRule.getPropertyMappingRules().forEach(function (propertyMappingRule) {
                var targetObjectProperty = propertyMapper.map(propertyMappingRule, sourceObject);
                var targetObjectPropertyKey = propertyMappingRule.getTargetPropertySpec().getByPk("path");
                Object.defineProperty(targetObject, targetObjectPropertyKey, targetObjectProperty);
            });
            return targetObject;
        };
    }
}