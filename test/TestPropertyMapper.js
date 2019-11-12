/**
 *
 * @param baseModule
 * @param mappingModule
 * @param testModule
 * @constructor
 */
function TestPropertyMapper(baseModule, mappingModule, testModule) {
    var propertyMapper = mappingModule.PropertyMapperFactory.getBuilder()
        .setObjectMappingRuleCollection(testModule.objectMappingRuleCollection)
        .build();
    this.map = function (propertyMappingRule, sourceObject) {
        return propertyMapper.map(propertyMappingRule, sourceObject);
    }
}