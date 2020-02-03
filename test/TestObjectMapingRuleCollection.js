/**
 *
 * @constructor
 */
function TestObjectMappingRuleCollection(baseModule, mappingModule, testModule) {
    var conditionStringParser = new ConditionStringParser(baseModule);
    var conditionStrings = [
        "type:JiraUser=>path:age|value:30|operator:gt",
    ];
    var userConditions = [];
    conditionStrings.forEach(function (conditionString) {
        userConditions.push(conditionStringParser.parse(conditionString.split("=>")[1]));
    });
    var userConditionCollection = baseModule.CollectionFactory.getBuilder()
        .setInstances(userConditions)
        .build();
    var objectRules = [];
    var jiraUserMappingRuleBuilder = mappingModule.ObjectMappingRuleFactory.getBuilder()
        .setSourceObjectType("JiraUser")
        .setSourceObjectConditionCollection(userConditionCollection);
    testModule.propertyMappingRulesCollection.getBy("getSourceObjectType", "JiraUser")
        .forEach(function (propertyMappingRule) {
            jiraUserMappingRuleBuilder.addPropertyMappingRule(propertyMappingRule);
        });
    objectRules.push(jiraUserMappingRuleBuilder.build());

    var issueConditionCollection = baseModule.CollectionFactory.getBuilder()
        .setInstances([])
        .build();
    var jiraIssueMappingRuleBuilder = mappingModule.ObjectMappingRuleFactory.getBuilder()
        .setSourceObjectType("JiraIssue")
        .setSourceObjectConditionCollection(issueConditionCollection);
    testModule.propertyMappingRulesCollection.getBy("getSourceObjectType", "JiraIssue")
        .forEach(function(propertyMappingRule){
            jiraIssueMappingRuleBuilder.addPropertyMappingRule(propertyMappingRule);
        });
    objectRules.push(jiraIssueMappingRuleBuilder.build());

    var indexBySourceType = baseModule.IndexFactory.getBuilder()
        .setStorageMap(baseModule.MapFactory.getBuilder().build())
        .setIndexedPropertyName("getSourceObjectType")
        .build();
    var collection = baseModule.CollectionFactory.getBuilder()
        .setInstances(objectRules)
        .addPropertyIndex(indexBySourceType)
        .build();

    this.getAll = function () {
        return collection.getAll();
    };
    this.getBySourceObjectType = function (objectType) {
        return collection.getBy("getSourceObjectType", objectType);
    };
    this.getBy = function (propertyKey, propertyValue) {
        return collection.getBy(propertyKey, propertyValue);
    }
}