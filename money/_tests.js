QUnit.helpers(this);

function tests() {
    console = Logger;
    // testObjectTableApp();
    testGoogleSheetAdapter();
    // testIndexedEntityCollectionApp();
}

function TestAppFactory() {
    function TestEntity(id, entityValueObject) {
        this.getId = function () {
            return id;
        };
        this.getPropertyOne = function () {
            return entityValueObject.propertyOne;
        };
        this.setPropertyOne = function(str){
            entityValueObject.propertyOne = str;
            return this;
        };
        this.getPropertyTwo = function () {
            return entityValueObject.propertyTwo;
        };
        this.setPropertyTwo = function (str) {
            entityValueObject.propertyTwo = str;
            return this;
        };
        this.getTwoProperties = function () {
            return entityValueObject.propertyOne + entityValueObject.propertyTwo;
        };
    }
    var testSheetUrl = "https://docs.google.com/spreadsheets/d/1M1rWxufwDiQRF3lBwft-3BLJsl-iQsSSIHapKWyVWj0/edit";
    this.TestEntity = TestEntity;
    this.TEST_SHEET_URL = testSheetUrl;
}