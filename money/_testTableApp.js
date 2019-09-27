function testTableApp() {
    function TestModelConstructor(){
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
    var testModelSheetName = "test-model";
    var TestModelTableApp = new TableAppFactory(testSheetUrl, testModelSheetName);
    TestModelTableApp.setObjectConstructor(TestModelConstructor);

    test("Table App. Return Objects", function () {
        var objects = TestModelTableApp.getAll();
        expect(3);
        equal(objects.length, 4, "There are 4 objects in this table");
        equal(objects[0].getId(), 1, "First object has id = 1");
        equal(objects[0].getSomeProperty(), "four", "First object has 'getSomeProperty' function and it outputs 'four'");
    });
}