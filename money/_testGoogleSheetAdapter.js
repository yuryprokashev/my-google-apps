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
    var googleSheetAdapter = new GoogleSheetAdapterBuilder()
        .setSheet(rangeAdapterTestSheet)
        .setPrimaryKeyColumnIndex(0)
        .setHeaderRow(["id", "propertyOne", "propertyTwo"])
        .setStartCell(1, 2)
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
    test("Google Sheet Adapter. Can delete random existing row", function () {
        expect(2);
        var allRows = googleSheetAdapter.getAll();
        var randomIndex = Math.floor(Math.random() * allRows.length);
        var targetRowPk = allRows[randomIndex][0];
        equal(true, true, "Removing row: " + targetRowPk);
        googleSheetAdapter.removeOne(allRows[randomIndex][0]);
        equal(googleSheetAdapter.getByPk(targetRowPk), undefined, targetRowPk + " row does not exist");

    });
    var BATCH_SIZE = 2000;
    var newRowBatch = [];
    var newEntitiesBatch = [];
    test("Google Sheet Adapter. Performance. Creating batch of " + BATCH_SIZE + " new rows", function () {
        expect(0);
        var currentObjectCount = 0;
        while(currentObjectCount < BATCH_SIZE){
            var entity = new TestApp.TestEntity(Utilities.getUuid(), entityValueObject);
            newEntitiesBatch.push(entity);
            var row = objectToRowMapper.mapOne(entity);
            newRowBatch.push(row);
            currentObjectCount++;
        }
    });
    test("Google Sheet Adapter. Performance. Can insert " + BATCH_SIZE + " batch of new rows", function () {
        expect(0);
        googleSheetAdapter.saveBatch(newRowBatch);
    });
    test("Google Sheet Adapter. Update one row by id", function () {
        var randomIndex = Math.floor(Math.random() * BATCH_SIZE);
        newEntitiesBatch[randomIndex].setPropertyTwo("random prop two set");
        var row = objectToRowMapper.mapOne(newEntitiesBatch[randomIndex]);
        row = googleSheetAdapter.saveOne(row);
        equal(row[2], "random prop two set", row[0] + " " + row[1] + " " + row[2]);
    });

    test("Google Sheet Adapter. Performance. Updating " + BATCH_SIZE + " batch of entities", function () {
        expect(0);
        var currentObjectCount = 0;
        while(currentObjectCount < BATCH_SIZE){
            newEntitiesBatch[currentObjectCount].setPropertyTwo("another prop two");
            currentObjectCount++;
        }
    });

    test("Google Sheet Adapter. Performance. Persisting updates for " + BATCH_SIZE + " entities to sheet", function () {
        expect(2);
        equal(newEntitiesBatch.length, BATCH_SIZE, "There are " + BATCH_SIZE + " entities in the batch");
        var rowBatch = objectToRowMapper.mapBatch(newEntitiesBatch);
        equal(rowBatch.length, BATCH_SIZE, "There are " + BATCH_SIZE + " rows in the batch");
        googleSheetAdapter.saveBatch(rowBatch);
    });
}