/**
 *
 * @param baseModule {BaseModule}
 * @constructor
 */
function PropertyExtractorCollectionFactory(baseModule) {
    var primitiveTypes = ["boolean", "number", "bigint", "string", "symbol"];
    var _propertyExtractors = baseModule.MapFactory.getBuilder().build();
    _propertyExtractors.set("primitive", PrimitiveExtractor);
    _propertyExtractors.set("function", FunctionExtractor);

    this.getByType = function (valueType) {
        var extractorType;
        if(primitiveTypes.indexOf(valueType) !== -1) extractorType = "primitive";
        if(valueType === "function") extractorType = "function";
        var Extractor = _propertyExtractors.get(extractorType);
        return new Extractor();
    };
    /**
     *
     * @constructor
     */
    function PrimitiveExtractor() {
        this.extract = function (sourcePropertyName, sourceObject) {
            return sourceObject[sourcePropertyName];
        }
    }

    /**
     *
     * @constructor
     */
    function FunctionExtractor() {
        this.extract = function (sourcePropertyName, sourceObject) {
            return sourceObject[sourcePropertyName]();
        }
    }
}