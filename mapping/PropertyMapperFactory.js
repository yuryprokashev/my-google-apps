/**
 *
 * @param baseModule {BaseModule}
 * @param mappingModule {MappingModule}
 * @constructor
 */
function PropertyMapperFactory(baseModule, mappingModule) {
    this.getBuilder = function () {
        return new PropertyMapperBuilder();
    };

    /**
     *
     * @constructor
     */
    function PropertyMapperBuilder() {
        var _objectMappingRuleCollection;
        var _propertyConstructors = baseModule.MapFactory.getBuilder().build();
        _propertyConstructors.set("primitive", PrimitiveValueProperty);
        _propertyConstructors.set("function", FunctionGetterProperty);
        this.setObjectMappingRuleCollection = function (collection) {
            _objectMappingRuleCollection = collection;
            return this;
        };
        this.build = function () {
            baseModule.Validator.isDefined("Object Mapping Rule Collection", _objectMappingRuleCollection);
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
            var sourceValueExtractor = baseModule.PropertyExtractorCollection.getByType(sourcePropertyPathType);
            var sourceValue = sourceValueExtractor.extract(sourcePropertyPath, sourceObject);

            var targetValue = sourceValue;
            var targetValueType = propertyMappingRule.getTargetPropertySpec().getBy("getKey", "type").getValue();
            var targetValueMappingRule = objectMappingRuleCollection.getBy("getSourceObjectType", targetValueType);
            if(targetValueMappingRule) {
                var objectMapper = mappingModule.ObjectMapperFactory.getBuilder()
                    .setPropertyMapper(this)
                    .build();
                targetValue = objectMapper.map(targetValueMappingRule, sourceValue);
            }
            var targetPropertyPathType = propertyMappingRule.getTargetPropertySpec().getBy("getKey", "pathType").getValue();
            var TargetPropertyConstructor = propertyConstructors.get(targetPropertyPathType);
            return new TargetPropertyConstructor(targetValue, false, false, true);
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
        this.enumerable = isEnumerable || true;
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