function TableAppFactory(sheetUrl, tableName) {
    var _sheetUrl = sheetUrl;
    var _tableName = tableName;
    var _objects;
    var _headerColumns, _headerIndexes;
    var _Constructor;
    this.setUrl = function (str) {
        _sheetUrl = str;
        return this;
    };
    this.setTableName = function (str) {
        _tableName = str;
        return this;
    };
    this.setObjectConstructor = function (Constructor) {
        _Constructor = Constructor;
        return this;
    };
    this.getAll = function(){
        if(!_objects) _init();
        return _objects;
    };
    function _init(){
        _objects = [];
        SpreadsheetApp.openByUrl(_sheetUrl).getSheetByName(_tableName).getDataRange().getValues().forEach(function (row, rowIndex) {
            if(rowIndex === 0){
                _headerColumns = IndexApp.createOneToOneIndex();
                _headerIndexes = IndexApp.createOneToOneIndex();
                row.forEach(function(objectPropertyName, colIndex){
                    _headerColumns.set(colIndex, objectPropertyName);
                    _headerIndexes.set(objectPropertyName, colIndex);
                });
            }
            if(row[0] !== "" && rowIndex > 0){
                var object = new _Constructor();
                Object.keys(object).forEach(function (objectFunctionName) {
                    if(objectFunctionName.indexOf("set") === 0){
                        var objectPropertyName = _objectFunctionNameToObjectPropertyName(objectFunctionName);
                        var objectPropertyColumnIndex = _headerIndexes.get(objectPropertyName);
                        object[objectFunctionName](row[objectPropertyColumnIndex]);
                    }
                });
                _objects.push(object);
            }
        })
    }
    function _objectFunctionNameToObjectPropertyName(functionName){
        var objectPropertyName = functionName.substring(3);
        objectPropertyName = objectPropertyName.charAt(0).toLowerCase() + objectPropertyName.substring(1);
        return objectPropertyName;
    }
}