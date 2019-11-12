/**
 *
 * @param baseModule
 * @param mappingModule
 * @constructor
 */
function TestPropertyMappingRuleCollection(baseModule, mappingModule) {
    var propertyRuleStrings = [
        "type:JiraUser=>path:name|pathType:string=>type:string|path:getName|pathType:function",
        "type:JiraUser=>path:role|pathType:string=>type:string|path:getRole|pathType:function",
        "type:JiraUser=>path:age|pathType:string=>type:number|path:getAge|pathType:function",
        "type:JiraUser=>path:displayName|pathType:string=>type:string|path:getDisplayName|pathType:function",
        "type:JiraIssue=>path:key|pathType:string=>type:string|path:getKey|pathType:function",
        "type:JiraIssue=>path:fields.status.name|pathType:string=>type:string|path:getStatus|pathType:function",
        "type:JiraIssue=>path:fields.assignee|pathType:object=>type:JiraUser|path:getAssignee|pathType:function"
    ];
    var specStringParser = new SpecStringParser(baseModule);
    var argumentStringParser = new ArgumentStringParser(baseModule);
    var propertyRules = [];
    propertyRuleStrings.forEach(function (propertyRuleString) {
        var objectTypeString = propertyRuleString.split("=>")[0];
        var sourceConditionsString = propertyRuleString.split("=>")[1];
        var targetConditionsString = propertyRuleString.split("=>")[2];
        var sourcePropertyConditionCollection = specStringParser.parse(sourceConditionsString);
        var targetPropertyConditionCollection = specStringParser.parse(targetConditionsString);
        var objectType = argumentStringParser.parse(objectTypeString);
        var propertyRule = mappingModule.PropertyMappingRuleFactory.getBuilder()
            .setSourceObjectType(objectType.getValue())
            .setTargetPropertySpec(targetPropertyConditionCollection)
            .setSourcePropertySpec(sourcePropertyConditionCollection)
            .build();
        propertyRules.push(propertyRule);
    });
    var indexByType = baseModule.IndexFactory.getBuilder()
        .setIndexedPropertyName("getSourceObjectType")
        .setStorageMap(baseModule.MapFactory.getBuilder().setOneToMany(true).build())
        .build();
    var collection = baseModule.CollectionFactory.getBuilder()
        .addPropertyIndex(indexByType)
        .setInstances(propertyRules)
        .build();
    this.getAll = function () {
        return collection.getAll();
    };
    this.getBy = function (propertyName, propertyValue) {
        return collection.getBy(propertyName, propertyValue);
    }
}