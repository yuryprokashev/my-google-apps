/**
 *
 * @param baseModule
 * @param mappingModule
 * @param testModule
 * @constructor
 */
function TestPropertyMapper(baseModule, mappingModule, testModule) {
    var indexBySourceObjectType = baseModule.IndexFactory.getPropertyIndexBuilder()
        .setStorageIndex(baseModule.IndexFactory.createOneToOneIndex())
        .setIndexedPropertyName("getSourceObjectType")
        .build();
    var emptyCollection = baseModule.CollectionFactory.getBuilder()
        .setInstances([])
        .addPropertyIndex(indexBySourceObjectType)
        .build();
    var propertyMapper = mappingModule.PropertyMapperFactory.getBuilder()
        .setObjectMappingRuleCollection(emptyCollection)
        .build();
    this.map = function (propertyMappingRule, sourceObject) {
        return propertyMapper.map(propertyMappingRule, sourceObject);
    }
}