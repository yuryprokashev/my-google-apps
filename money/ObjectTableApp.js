function ObjectTableAppFactory() {
    this.create = function (sheetUrl, tableName) {
        return new ObjectTable().setUrl(sheetUrl).setName(tableName);
    };
    function ObjectTable() {
        var _sheetUrl;
        var _tableName;
        var _objects;
        var _headerIndex;
        var _Constructor;
        var _objectIndexById;
        var _rowIndexByObjectId;
        var _sheet;
        this.setUrl = function (str) {
            _sheetUrl = str;
            return this;
        };
        this.setName = function (str) {
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
        this.save = function (object) {
            if(Array.isArray(object)){
                return _saveBatch(object);
            }
            else {
                return _saveOne(object);
            }
        };
        this.getById = function (id) {
            return _objectIndexById.get(id);
        };
        this.remove = function (id) {
            var object = _objectIndexById.get(id);
            _removeOne(object);
        };

        function _init(){
            _objects = [];
            _objectIndexById = IndexApp.createOneToOneIndex();
            _rowIndexByObjectId = IndexApp.createOneToOneIndex();
            _sheet = SpreadsheetApp.openByUrl(_sheetUrl).getSheetByName(_tableName);
            _sheet.getDataRange().getValues().forEach(function (row, rowIndex) {
                if(rowIndex === 0){
                    _headerIndex = IndexApp.createOneToOneIndex();
                    row.forEach(function(objectPropertyName, colIndex){
                        _headerIndex.set(objectPropertyName, colIndex);
                    });
                }
                if(row[0] !== "" && rowIndex > 0){
                    var object = new _Constructor();
                    Object.keys(object).forEach(function (objectFunctionName) {
                        if(objectFunctionName.indexOf("set") === 0){
                            var objectPropertyName = _objectFunctionNameToObjectPropertyName(objectFunctionName);
                            var objectPropertyColumnIndex = _headerIndex.get(objectPropertyName);
                            object[objectFunctionName](row[objectPropertyColumnIndex]);
                        }
                    });
                    _addObjectToIndex(object, rowIndex);
                }
            })
        }

        function _addObjectToIndex(object, rowIndex) {
            _objects.push(object);
            _objectIndexById.set(object.getId(), object);
            _rowIndexByObjectId.set(object.getId(), rowIndex);
        }

        function _removeObjectFromIndex(object){
            var objectIndex;
            _objects.forEach(function (item, index){
                if(item.getId() === object.getId()){
                    objectIndex = index;
                }
            });
            _objects.splice(objectIndex, 1);
            _objectIndexById.remove(object.getId());
            _rowIndexByObjectId.set(object.getId());
        }

        function _saveOne(object){
            if(_objectIndexById.has(object.getId())){
                _updateOne(object);
            }
            else {
                object.setId(_generateId());
                _insertOne(object);
            }
            return object;
        }

        function _saveBatch(objects) {
            var objectsToInsert = [];
            var objectsToUpdate = [];
            objects.forEach(function (object) {
                if(_objectIndexById.get(object.getId())) {
                    objectsToUpdate.push(object);
                }
                else {
                    object.setId(_generateId());
                    objectsToInsert.push(object);
                }
            });
            _insertBatch(objectsToInsert);
            _updateBatch(objectsToUpdate);
        }

        function _removeOne(object) {
            var objectRowIndex = _rowIndexByObjectId.get(object.getId());
            _sheet.deleteRow(objectRowIndex);
            _removeObjectFromIndex(object);
        }

        function _insertOne(object) {
            var objectRow = _createObjectRow(object);
            _sheet.appendRow(objectRow);
            var appendedRowIndex = _sheet.getLastRow();
            _addObjectToIndex(object, appendedRowIndex);
        }

        function _insertBatch(objects) {
            var rangeValues = [];
            objects.forEach(function (object) {
                var objectRow = _createObjectRow(object);
                rangeValues.push(objectRow);
            });
            if(objects.length > 0){
                var lastRowIndex = _sheet.getLastRow();
                _sheet.insertRowsAfter(lastRowIndex, objects.length);
                _sheet.getRange(lastRowIndex + 1, 1, objects.length, _headerIndex.keys().length).setValues(rangeValues);

                var newObjectCount = 0;
                while(newObjectCount < objects.length){
                    _addObjectToIndex(objects[newObjectCount], lastRowIndex + newObjectCount + 1);
                    newObjectCount++;
                }
            }
        }

        function _updateOne(object) {
            var objectRowIndex = _rowIndexByObjectId.get(object.getId());
            var objectRange = _sheet.getRange(objectRowIndex, 1, 1, _headerIndex.keys().length);
            var objectRow = _createObjectRow(object);
            objectRange.setValues([objectRow]);
            _addObjectToIndex(object, objectRowIndex);
        }

        function _updateBatch(objects) {
            objects.forEach(function (object) {
                _updateOne(object);
            });
        }

        function _objectFunctionNameToObjectPropertyName(functionName){
            var objectPropertyName = functionName.substring(3);
            objectPropertyName = objectPropertyName.charAt(0).toLowerCase() + objectPropertyName.substring(1);
            return objectPropertyName;
        }

        function _objectPropertyNameToObjectFunctionName(objectPropertyName) {
            var objectFunctionName = objectPropertyName.charAt(0).toUpperCase() + objectPropertyName.substring(1);
            return "get" + objectFunctionName;
        }

        function _createObjectRow(object){
            var row = [];
            _headerIndex.keys().forEach(function(objectPropertyName){
                var objectFunctionName = _objectPropertyNameToObjectFunctionName(objectPropertyName);
                row.push(object[objectFunctionName]());
            });
            return row;
        }

        function _generateId() {
            return Utilities.getUuid();
        }
    }
}