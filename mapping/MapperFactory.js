/**
 * Constructs the main mapper interactor.
 * @constructor
 */
function MapperFactory() {
    this.getBuilder = function () {
        return new MapperBuilder();
    };

    /**
     *
     * @constructor
     */
    function MapperBuilder() {
        var _objectMappingRuleCollection;
        this.setObjectMappingRuleCollection = function (collection) {
            _objectMappingRuleCollection = collection;
            return this;
        };
        this.setObjectMapper = function (mapper) {
            _objectMapper = mapper;
            return this;
        };
        this.build = function () {
            return new Mapper(_objectMappingRuleCollection, _objectMapper);
        }
    }

    /**
     *
     * @param objectMappingRuleCollection
     * @param objectMapper
     * @constructor
     */
    function Mapper(objectMappingRuleCollection, objectMapper) {
        /**
         * Maps sourceObject to targetObject. Uses sourceObjectType to obtain the ObjectMappingRule
         * @param sourceObjectType
         * @param sourceObject
         * @return {*}
         */
        this.map = function (sourceObjectType, sourceObject) {
            var objectMappingRule = objectMappingRuleCollection.getBy("getSourceObjectType", sourceObjectType);
            return objectMapper.map(objectMappingRule, sourceObject);
        };
    }
}