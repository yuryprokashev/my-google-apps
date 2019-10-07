function testGoogleSheetAdapter() {
    var fieldMap = IndexApp.createOneToOneIndex()
        .set("getPropertyOne", "1")
        .set("getId", "0")
        .set('getPropertyTwo', "2");
    var objectToRowMapper = new MapperAppFactory()
        .getBuilder()
        .setToConstructor(Array)
        .setFieldMap(fieldMap)
        .build();
    var rangeAdapterTestSheet = SpreadsheetApp.openByUrl(TestApp.TEST_SHEET_URL).getSheetByName("RangeAdapterTest");
    var googleSheetAdapter = new GoogleRangeAdapterBuilder()
        .setSheet(rangeAdapterTestSheet)
        .setPrimaryKeyColumnIndex(0)
        .setHeaderRow(["id", "propertyOne", "propertyTwo"])
        .setStartCell(1, 2)
        .setNumberOfColumns(3)
        .build();

    var entityValueObject = {
        propertyOne: "property one",
        propertyTwo: "property two"
    };

    var newEntity, newRow;
    test("Google Sheet Adapter. Can create new row", function () {
        newEntity = new TestApp.TestEntity(Utilities.getUuid(), entityValueObject);
        newRow = objectToRowMapper.mapOne(newEntity);
        newRow = googleSheetAdapter.saveOne(newRow);
        equal(newRow[1], "property one", newRow[0] + " " + newRow[1] + " " + newRow[2]);
    });
    test("Google Sheet Adapter. Can read row by the primary key", function () {
        newRow = googleSheetAdapter.getByPk(newRow[0]);
        equal(newRow[2], "property two");
    });
    test("Google Sheet Adapter. Can update the existing row", function () {
        newEntity.setPropertyOne("updated property one");
        var updatedRow = objectToRowMapper.mapOne(newEntity);
        updatedRow = googleSheetAdapter.saveOne(updatedRow);
        equal(updatedRow[1], "updated property one");
    });
    test("Google Sheet Adapter. Can delete existing row", function () {
        expect(1);
        googleSheetAdapter.removeOne(newRow[0]);
        equal(googleSheetAdapter.getByPk(newRow[0]), undefined);
    });
    var newRowBatch = [];
    test("Google Sheet Adapter. Performance. Creating batch of 10 new rows", function () {
        expect(0);
        var currentObjectCount = 0;
        while(currentObjectCount < 10){
            var entity = new TestApp.TestEntity(Utilities.getUuid(), entityValueObject);
            var row = objectToRowMapper.mapOne(entity);
            newRowBatch.push(row);
            currentObjectCount++;
        }
    });
    test("Google Sheet Adapter. Performance. Can insert 10k batch of new rows", function () {
        expect(0);
        googleSheetAdapter.saveBatch(newRowBatch);
    });
}