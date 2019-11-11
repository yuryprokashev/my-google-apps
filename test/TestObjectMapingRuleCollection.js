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
    var objectMappingRuleBuilder = mappingModule.ObjectMappingRuleFactory.getBuilder()
        .setSourceObjectType("JiraUser")
        .setSourceObjectConditionCollection(userConditionCollection);
    testModule.propertyMappingRulesCollection.getAll().forEach(function (propertyMappingRule) {
        objectMappingRuleBuilder.addPropertyMappingRule(propertyMappingRule);
    });
    objectRules.push(objectMappingRuleBuilder.build());

    var collection = baseModule.CollectionFactory.getBuilder()
        .setInstances(objectRules)
        .build();

    this.getAll = function () {
        return collection.getAll();
    }
}