function suiteMappingModule(){
    var baseModule, mappingModule, testModule;
    module("Mapping. Set up");
    test("Base Module is created", function () {
        expect(0);
        baseModule = new Base.BaseModule();
    });
    test("Mapping Module is created", function () {
        expect(0);
        mappingModule = new Mapping.MappingModule(baseModule);
    });
    test("Test Module is created", function () {
        expect(0);
        testModule = new TestModule(baseModule, mappingModule);
    });
    module("Mapping.PropertyMappingRuleFactory");
    test("Can create PropertyMappingRule", function () {
        testModule.propertyMappingRulesCollection.getAll().forEach(function (propertyMappingRule) {
            equal(propertyMappingRule.getSourceObjectType(), "JiraUser");
            propertyMappingRule.getSourcePropertySpec().getAll().forEach(function(keyValue){
                equal(true, true, keyValue.getKey() + ":" + keyValue.getValue())
            });
            propertyMappingRule.getTargetPropertySpec().getAll().forEach(function(keyValue){
                equal(true, true, keyValue.getKey() + ":" + keyValue.getValue())
            });
        });
    });
    module("Mapping.PropertyMapperFactory");
    test("Can map property", function () {
        var sourceObject = testModule.jiraUserCollection.getBy("name", "yprokashev");
        testModule.propertyMappingRulesCollection.getAll().forEach(function(propertyMappingRule){
            var newProperty = testModule.propertyMapper.map(propertyMappingRule, sourceObject);
            equal(true, true, newProperty.value());
        });
    });
    module("Mapping.ObjectMappingRuleFactory");
    test("Can create ObjectMappingRule", function () {
        testModule.objectMappingRuleCollection.getAll().forEach(function (rule) {
            var message = Utilities.formatString("%s|%s|%s",
                rule.getSourceObjectType(),
                rule.getSourceObjectConditionCollection().getAll().length,
                rule.getPropertyMappingRules().length);
            equal(true, true, message);
        })
    });
    test("Can create object from other object using ObjectMappingRule", function () {

        var objectMappingRule = testModule.objectMappingRuleCollection.getBySourceObjectType("JiraUser");
        var sourceObject = testModule.jiraUserCollection.getBy("name", "yprokashev");
        var targetObject = testModule.objectMapper.map(objectMappingRule, sourceObject);
        equal(targetObject.getName(), "yprokashev", targetObject.getName());
        equal(targetObject.getRole(), "P2TPM", targetObject.getRole());
        equal(targetObject.getAge(), 39, targetObject.getAge());
        equal(targetObject.getDisplayName(), "Yury Prokashev", targetObject.getDisplayName());
    });
    test("Can map object from other object using the source type and object", function () {
        var sourceObject = testModule.jiraUserCollection.getBy("name", "yprokashev");
        var targetObject = testModule.mapper.map("JiraUser", sourceObject);
        equal(targetObject.getName(), "yprokashev", targetObject.getName());
        equal(targetObject.getRole(), "P2TPM", targetObject.getRole());
        equal(targetObject.getAge(), 39, targetObject.getAge());
        equal(targetObject.getDisplayName(), "Yury Prokashev", targetObject.getDisplayName());
    });
}

/**
 *
 * @param baseModule
 * @constructor
 */
function SpecStringParser(baseModule) {
    this.parse = function (specString) {
        var argumentStrings = specString.split("|");
        var argumentKeyValues = [];
        argumentStrings.forEach(function (argumentString) {
            argumentKeyValues.push(new ArgumentStringParser(baseModule).parse(argumentString));
        });
        var indexByKey = baseModule.IndexFactory.getPropertyIndexBuilder()
            .setIndexedPropertyName("getKey")
            .setStorageIndex(baseModule.IndexFactory.createOneToOneIndex())
            .build();
        return baseModule.CollectionFactory.getBuilder()
            .addPropertyIndex(indexByKey)
            .setInstances(argumentKeyValues).build();
    }
}

/**
 *
 * @param baseModule
 * @constructor
 */
function ArgumentStringParser(baseModule) {
    this.parse = function (argumentString) {
        var keyValueStrings = argumentString.split(":");
        return baseModule.KeyValueFactory.create(keyValueStrings[0], keyValueStrings[1]);
    };
}

/**
 *
 * @param baseModule
 * @constructor
 */
function ConditionStringParser(baseModule) {
    this.parse = function (conditionString) {
        var argumentStrings = conditionString.split("|");
        var keyValues = [];
        argumentStrings.forEach(function (argumentString) {
            keyValues.push(new ArgumentStringParser(baseModule).parse(argumentString));
        });
        var key = keyValues.filter(function (keyValue) {
            return keyValue.getKey() === "path";
        })[0].getValue();
        var value = keyValues.filter(function (keyValue) {
            return keyValue.getKey() === "value";
        })[0].getValue();
        var operatorName = keyValues.filter(function (keyValue) {
            return keyValue.getKey() === "operator"
        })[0].getValue();
        var expectedKeyValue = baseModule.KeyValueFactory.create(key, value);
        return baseModule.ConditionFactory.getBuilder()
            .setExpectedKeyValue(expectedKeyValue)
            .setOperatorName(operatorName)
            .build()
    };
}