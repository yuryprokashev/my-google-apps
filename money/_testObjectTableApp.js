function testObjectTableApp() {
    function TestModel(){
        var _id, _someProperty;
        this.getId = function () {
            return _id;
        };
        this.setId = function (id) {
            _id = id;
            return this;
        };
        this.getSomeProperty = function(){
            return _someProperty;
        };
        this.setSomeProperty = function (str) {
            _someProperty = str;
            return this;
        }
    }
    var testSheetUrl = "https://docs.google.com/spreadsheets/d/1M1rWxufwDiQRF3lBwft-3BLJsl-iQsSSIHapKWyVWj0/edit";
    var testModelSheetName = "TestModels";
    var ObjectTableApp = new ObjectTableAppFactory();
    var TestModelTable = new ObjectTableApp.create(testSheetUrl, testModelSheetName);
    TestModelTable.setObjectConstructor(TestModel);

    var objects, objectCountBefore;
    test("Object Table App. Return Objects. Read 4 Objects from Table", function () {
        expect(0);
        objects = TestModelTable.getAll();
        objectCountBefore = objects.length;
    });

    test("Object Table App. Return Objects", function () {
        var objects = TestModelTable.getAll();
        expect(3);
        equal(objects.length, 4, "There are 4 objects in this table");
        equal(objects[0].getId(), "512807fc-2eb4-401c-a96f-20db7dbc434b", "First object has id = '512807fc-2eb4-401c-a96f-20db7dbc434b'");
        equal(objects[0].getSomeProperty(), "four", "First object has 'getSomeProperty' function and it outputs 'four'");
    });

    var newModelId;
    test("Object Table App. Can insert new Object. Step 1. Insertion in Table", function () {
        var newTestModel = new TestModel().setSomeProperty("some new property");
        newModelId = TestModelTable.save(newTestModel).getId();
        equal(true, true, "New object created with id= " + newModelId);
    });
    test("Object Table App. Can insert new Object. Step 2. Reading table again", function () {
        var objectsAfter = TestModelTable.getAll();
        var objectCountAfter = objectsAfter.length;
        equal(objectCountBefore + 1, objectCountAfter, "The new object has been added");
    });

    test("Object Table App. Can return object by it's id", function () {
        var newTestModelDeserialized = TestModelTable.getById(newModelId);
        equal(newTestModelDeserialized.getSomeProperty(), "some new property", "The new object has 'getSomeProperty' to return 'some new property' value");
    });

    test("Object Table App. Can update object", function () {
        expect(0);
        var newTestModelDeserialized = TestModelTable.getById(newModelId);
        newTestModelDeserialized.setSomeProperty("Updated some property");
        TestModelTable.save(newTestModelDeserialized);
    });

    test("Object Table App. Can return object by it's id. And the property is updated after the update", function () {
        var newTestModelDeserialized = TestModelTable.getById(newModelId);
        equal(newTestModelDeserialized.getSomeProperty(), "Updated some property", "The new object has 'getSomeProperty' to return 'Updated some property' value");
    });
    test("Object Table App. Can return remove object by it's id", function () {
        expect(0);
        TestModelTable.remove(newModelId);
    });
    var testModels = [];
    test("ObjectTableApp. Performance Test. Insertion of 10k records. Step 1. Object Creation In Memory", function () {
        expect(0);
        var objectCount = 0;
        while(objectCount < 10000){
            testModels.push(new TestModel().setSomeProperty("some string"));
            objectCount++;
        }
    });
    test("ObjectTableApp. Performance Test. Insertion of 10k records. Step 2. Object Insertion in Table", function () {
        expect(0);
        TestModelTable.save(testModels);
    });
    test("ObjectTableApp. Performance Test. Update of 10k records. Step 1. Object Update In Memory", function () {
        expect(0);
        var objectCount = 0;
        while(objectCount < 10000){
            testModels[objectCount].setSomeProperty("another some property");
            objectCount++;
        }
    });
    test("ObjectTableApp. Performance Test. Update of 10k records. Step 2. Object Update in Table", function () {
        expect(0);
        TestModelTable.save(testModels);
    });
    test("ObjectTableApp. Performance Test. Reading 10k records.", function () {
        expect(0);
        TestModelTable.getAll();
    });
}