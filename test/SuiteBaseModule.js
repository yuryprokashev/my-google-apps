function suiteBaseModule() {
    var baseModule;
    module("Base.KeyValueFactory");
    test("BaseModule is created", function () {
        baseModule = new Base.BaseModule();
        equal(baseModule !== undefined, true);
    });
    test("Can create new KeyValue object", function () {
        var keyValue = baseModule.KeyValueFactory.create("yprokashev", new TestJiraUser("yprokashev", "Yury Prokashev", "yury.prokashev@aurea.com"));
        equal(keyValue.getKey(), "yprokashev");
        equal(keyValue.getValue().displayName , "Yury Prokashev");
    });
    module("Base.Validator");
    test("isDefined. Can throw an error, when arg is not defined",function () {
        try{
            baseModule.Validator.isDefined(
                "Some Parameter",
                undefined,
                "Additional message");
        } catch (e) {
            equal(e.message.indexOf("Some Parameter") !== -1, true);
            equal(e.message.indexOf("Additional message") !== -1, true);
        }
    });
    test("isOneElement. Can throw an error, when no objects in array", function () {
        try{
            baseModule.Validator.isOneElement([], "Nothing", "Many");
        } catch (e) {
            equal(e.message.indexOf("Nothing") !== -1, true);
        }
    });
    test("isOneElement. Can throw an error, when many objects in array", function () {
        try{
            baseModule.Validator.isOneElement([1,2,3], "Nothing", "Many");
        } catch (e) {
            equal(e.message.indexOf("Many") !== -1, true);
        }
    });
    test("mustBeTrue. Can throw an error, when condition is false", function () {
        try{
            baseModule.Validator.mustBeTrue(false, "Condition is False");
        } catch (e) {
            equal(e.message.indexOf("Condition is False") !== -1, true, e.message);
        }
    });
    module("Base.IndexFactory");
    test("Can create 1-to-1 Index", function () {
        var index = baseModule.IndexFactory.createOneToOneIndex();
        index.set("yprokashev", new TestJiraUser("yprokashev", "Yury Prokashev", "yury.prokashev@aurea.com"));
        equal(index.has("yprokashev"), true);
        equal(index.get("yprokashev").displayName, "Yury Prokashev");
        index.remove("yprokashev");
        equal(index.has("yprokashev"), false);
        equal(index.get("yprokashev"), undefined);
    });
    test("Can create PropertyIndex", function () {
        var indexByUsername = baseModule.IndexFactory.getPropertyIndexBuilder()
            .setIndexedPropertyName("name")
            .setStorageIndex(baseModule.IndexFactory.createOneToOneIndex())
            .build();
        var yprokashev = new TestJiraUser("yprokashev", "Yury Prokashev", "yury.prokashev@aurea.com");
        indexByUsername.index(yprokashev);
        equal(indexByUsername.get("yprokashev").displayName, "Yury Prokashev");
        equal(indexByUsername.getIndexedPropertyName(), "name");
    });
    test("Can create 1-to-N Index", function () {
        var indexByRole = baseModule.IndexFactory.createOneToManyIndex();
        var yprokashev = new TestJiraUser("yprokashev", "Yury Prokashev", "yury.prokashev@aurea.com", "P2TPM");
        var mani = new TestJiraUser("mani", "Manimaran Selvan", "mani@devfactory.com", "P2TPM");
        indexByRole.set(yprokashev.role, yprokashev);
        indexByRole.set(mani.role, mani);
        equal(indexByRole.get("P2TPM").length, 2);
        equal(indexByRole.get("P2TPM")[0].name, "yprokashev");
        equal(indexByRole.get("P2TPM")[1].name, "mani");
        indexByRole.remove("P2TPM");
        equal(indexByRole.get("P2TPM"), undefined);
    });
    module("Base.CollectionFactory");
    test("Can create Collection", function () {
        var users = [
            new TestJiraUser("yury", "Yury", "yury@aurea.com", "P2TPM"),
            new TestJiraUser("mani", "Mani", "mani@df.com", "P2TPM")
        ];
        var collection = baseModule.CollectionFactory.getBuilder()
            .setInstances(users)
            .build();
        equal(collection.getAll().length, 2);
        collection.getAll().forEach(function(instance){
            equal(instance.hasOwnProperty("name"), true);
            equal(instance.hasOwnProperty("role"), true);
            equal(instance.hasOwnProperty("displayName"), true);
            equal(instance.hasOwnProperty("emailAddress"), true);
        })
    });
    test("Can insert instance to Collection", function () {
        var indexByEmail = baseModule.IndexFactory.getPropertyIndexBuilder()
            .setStorageIndex(baseModule.IndexFactory.createOneToOneIndex())
            .setIndexedPropertyName("emailAddress")
            .build();
        var collection = baseModule.CollectionFactory.getBuilder()
            .addPropertyIndex(indexByEmail)
            .build();
        var yprokashev = new TestJiraUser("yury", "Yury", "yury@aurea.com", "P2TPM");
        var yprokashevPosition = collection.insertOne(yprokashev);
        equal(yprokashevPosition, 1);
        equal(collection.getAll().length, 1);
        equal(collection.getAll()[0].displayName, "Yury");
        equal(collection.getBy("emailAddress", "yury@aurea.com").displayName, 'Yury');
    });
    module("Base.ConditionFactory");
    test("Can create Condition", function () {
        var expectedKeyValue = baseModule.KeyValueFactory.create("name", "yprokashev");
        var condition = baseModule.ConditionFactory.getBuilder()
            .setOperatorName("eq")
            .setExpectedKeyValue(expectedKeyValue)
            .build();
        equal(condition.getObjectGetterName(), "name");
        equal(condition.getExpectedValue(), "yprokashev");
        equal(condition.getOperatorName(), "eq");
    });
    module("Base.ConditionEvaluator");
    test("Can evaluate Condition collection", function () {
        var displayNameIsYury = baseModule.ConditionFactory.getBuilder()
            .setExpectedKeyValue(baseModule.KeyValueFactory.create("displayName", "Yury"))
            .setOperatorName("eq")
            .build();
        var roleIsNotSVP = baseModule.ConditionFactory.getBuilder()
            .setExpectedKeyValue(baseModule.KeyValueFactory.create("role", "SVPTPM"))
            .setOperatorName("not")
            .build();
        var ageIsAbove30 = baseModule.ConditionFactory.getBuilder()
            .setExpectedKeyValue(baseModule.KeyValueFactory.create("age", 30))
            .setOperatorName("gt")
            .build();
        var conditions = [displayNameIsYury, roleIsNotSVP, ageIsAbove30];
        var collection = baseModule.CollectionFactory.getBuilder()
            .setInstances(conditions)
            .build();
        var matchObject =  new TestJiraUser("yprokashev", "Yury", "yury@aurea.com", "P2TPM", 39);
        var nonMatchObject = new TestJiraUser("mani", "Mani", "mani@df.com", "P2TPM", 30);

        equal(baseModule.ConditionEvaluator.evaluate(collection, matchObject), true);
        equal(baseModule.ConditionEvaluator.evaluate(collection, nonMatchObject), false);

        var lessStrictConditions = [ageIsAbove30];
        var lessStrictConditionCollection = baseModule.CollectionFactory.getBuilder()
            .setInstances(lessStrictConditions)
            .build();
        equal(baseModule.ConditionEvaluator.evaluate(lessStrictConditionCollection, matchObject), true);
        equal(baseModule.ConditionEvaluator.evaluate(lessStrictConditionCollection, nonMatchObject), false);
    });
    module("Base.PropertyExtractorCollection");
    test("Can provide extractor for primitive property", function () {
        var stringExtractor = baseModule.PropertyExtractorCollection.getByType("string");
        var numberExtractor = baseModule.PropertyExtractorCollection.getByType("number");
        var sourceObject = new TestJiraUser("yprokashev", "Yury", "yury@aurea.com", "P2TPM", 39);
        equal(stringExtractor.extract("role", sourceObject), "P2TPM");
        equal(numberExtractor.extract("age", sourceObject), 39);
    });
    test("Can provide extractor for function property", function () {
        var functionExtractor = baseModule.PropertyExtractorCollection.getByType("function");
        var sourceObject = baseModule.KeyValueFactory.create("username", "yprokashev");
        equal(functionExtractor.extract("getKey", sourceObject), "username");
        equal(functionExtractor.extract("getValue", sourceObject), "yprokashev");
    })
}