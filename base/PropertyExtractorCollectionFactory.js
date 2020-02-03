/**
 *
 * @param baseModule {BaseModule}
 * @constructor
 */
function PropertyExtractorCollectionFactory(baseModule) {
    var valueTypes = ["boolean", "number", "bigint", "string", "symbol", "object"];
    var _propertyExtractors = baseModule.MapFactory.getBuilder().build();
    _propertyExtractors.set("value", ValuePathExtractor);
    _propertyExtractors.set("function", FunctionExtractor);

    this.getByType = function (valueType) {
        var extractorType;
        if(valueTypes.indexOf(valueType) !== -1) extractorType = "value";
        if(valueType === "function") extractorType = "function";
        baseModule.Validator.isDefined("Property Extractor Type", extractorType, "For valueType: " + valueType);
        var Extractor = _propertyExtractors.get(extractorType);
        return new Extractor();
    };
    /**
     *
     * @constructor
     */
    function ValuePathExtractor() {
        this.extract = function (sourcePropertyPath, sourceObject) {
            var pathSegments = sourcePropertyPath.split(".");
            if(pathSegments.length === 1) return sourceObject[sourcePropertyPath];
            var nextSegmentExtractor = new ValuePathExtractor();
            return nextSegmentExtractor.extract(pathSegments.slice(1).join("."), sourceObject[pathSegments[0]]);
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