/**
 *
 * @param baseModule {BaseModule}
 * @constructor
 */
function PropertyMapperFactory(baseModule) {
    this.getBuilder = function () {
        return new PropertyMapperBuilder();
    };

    /**
     *
     * @constructor
     */
    function PropertyMapperBuilder() {
        var _objectMappingRuleCollection;
        var _propertyConstructors = baseModule.IndexFactory.createOneToOneIndex();
        _propertyConstructors.set("primitive", PrimitiveValueProperty);
        _propertyConstructors.set("function", FunctionGetterProperty);
        this.setObjectMappingRuleCollection = function (collection) {
            _objectMappingRuleCollection = collection;
            return this;
        };
        this.build = function () {
            return new PropertyMapper(_objectMappingRuleCollection, _propertyConstructors);
        }
    }

    /**
     *
     * @constructor
     */
    function PropertyMapper(objectMappingRuleCollection, propertyConstructors) {
        this.map = function (propertyMappingRule, sourceObject) {
            var sourcePropertyPathType = propertyMappingRule.getSourcePropertySpec().getBy("getKey", "pathType").getValue();
            var sourcePropertyPath = propertyMappingRule.getSourcePropertySpec().getBy("getKey", "path").getValue();
            Logger.log("sourcePropertyPathType: %s; sourcePropertyPath: %s", sourcePropertyPathType, sourcePropertyPath);
            var sourceValueExtractor = baseModule.PropertyExtractorCollection.getByType(sourcePropertyPathType);
            var sourceValue = sourceValueExtractor.extract(sourcePropertyPath, sourceObject);

            var targetValue = sourceValue;
            var targetValueType = propertyMappingRule.getTargetPropertySpec().getBy("getKey", "type").getValue();
            var targetValueMappingRule = objectMappingRuleCollection.getBy("getSourceObjectType", targetValueType);
            if(targetValueMappingRule) {
                targetValue = targetValueMappingRule.map(sourceValue);
            }
            var targetProperPathType = propertyMappingRule.getTargetPropertySpec().getBy("getKey", "pathType").getValue();
            var TargetPropertyConstructor = propertyConstructors.get(targetProperPathType);
            return new TargetPropertyConstructor(targetValue);
        };
    }


    /**
     *
     * @param value
     * @param isWritable
     * @param isConfigurable
     * @param isEnumerable
     * @constructor
     */
    function PrimitiveValueProperty(value, isWritable, isConfigurable, isEnumerable){
        this.value = value;
        this.enumerable = isEnumerable || false;
        this.configurable = isConfigurable || false;
        this.writable = isWritable || false;
    }

    /**
     *
     * @param value
     * @param isWritable
     * @param isConfigurable
     * @param isEnumerable
     * @constructor
     */
    function FunctionGetterProperty(value, isWritable, isConfigurable, isEnumerable){
        this.prototype = new PrimitiveValueProperty(value, isWritable, isConfigurable, isEnumerable);
        this.value = function(){return value}
    }
}