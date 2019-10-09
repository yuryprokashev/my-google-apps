function GoogleSheetAdapter(googleSheet, pkColumnIndex, headerRow, startRow, startCol) {
    var _state;
    this.getAll = function () {
        if(!_state) _state = _init();
        return _state.rows;
    };
    this.getByPk = function (primaryKey) {
        if(!_state) _state = _init();
        return _state.rowPkToRowMap.get(primaryKey);
    };
    this.saveOne = function (row) {
        if(!_state) _state = _init();
        if(_state.rowPkToRowMap.has(row[pkColumnIndex])){
            return _updateOne(_state, row);
        }
        else {
            var rowRange = _allocateRowRange(_state, 1, row.length);
            rowRange.setValues([row]);
            _addRowRange(_state, rowRange);
            return row;
        }
    };
    this.saveBatch = function (rows) {
        if(!_state) _state = _init();
        var groupedRows = _groupInsertionsAndUpdates(rows);
        var updatedRows = _updateBatch(_state, groupedRows.update);
        var insertedRows = _insertBatch(_state, groupedRows.insert);
        return updatedRows.concat(insertedRows);
    };
    this.removeOne = function (primaryKey) {
        ValidatorApp.isTrue(primaryKey !== headerRow[pkColumnIndex], "Header Row can not be deleted");
        if(!_state) _state = _init();
        var targetRowRange = _removeRowRange(_state, primaryKey);
        targetRowRange.deleteCells(SpreadsheetApp.Dimension.ROWS);
    };

    function _init(){
        var state = {};
        state.rows = [];
        state.rowRanges = [];
        state.rowPkToRowMap = IndexApp.createOneToOneIndex();
        state.primaryKeyToRowRange = IndexApp.createOneToOneIndex();
        state.rowPkToRowIndex = IndexApp.createOneToOneIndex();
        var headerRange = _allocateRowRange(state, 1, headerRow.length);
        if(headerRange.getValues()[0][pkColumnIndex] === "") headerRange.setValues([headerRow]);
        _addRowRange(state, headerRange);

        var rangeHasData = true;
        while(rangeHasData){
            var nextRange = _allocateRowRange(state, 1, headerRow.length);
            if(nextRange.getValues()[0][pkColumnIndex] !== ""){
                _addRowRange(state, nextRange);
            }
            else {
                rangeHasData = false;
            }
        }
        return state;
    }
    function _addRowRange(state, rowRange) {
        var row = rowRange.getValues()[0];
        var pk = row[pkColumnIndex];
        state.primaryKeyToRowRange.set(pk, rowRange);
        state.rowRanges.push(rowRange);
        state.rowPkToRowMap.set(pk, row);
        var rowIndex = state.rows.push(row);
        state.rowPkToRowIndex.set(pk, rowIndex);
        return rowIndex;
    }
    function _removeRowRange(state, pk){
        var targetRowIndex = state.rowPkToRowIndex.get(pk) - 1;
        state.rowPkToRowIndex.remove(pk);
        var targetRowRange = state.rowRanges.splice(targetRowIndex, 1)[0];
        state.rows.splice(targetRowIndex, 1);
        state.primaryKeyToRowRange.remove(pk);
        state.rowPkToRowMap.remove(pk);
        return targetRowRange;
    }
    function _insertBatch(state, rows){
        if(rows.length > 0){
            var newRowsRange = _allocateRowRange(state, rows.length, headerRow.length);
            newRowsRange.setValues(rows);
            rows.forEach(function (row) {
                var rowRange = _allocateRowRange(state, 1, row.length);
                _addRowRange(state, rowRange);
            });
        }
        return rows;
    }
    function _updateBatch(state, rows){
        rows.forEach(function (row) {
            _updateOne(state, row);
        });
        return rows;
    }
    function _updateOne(state, row){
        var rowRange = state.primaryKeyToRowRange.get(row[pkColumnIndex]);
        rowRange.setValues([row]);
        return row;
    }
    function _allocateRowRange(state, numRows, numColumns){
        var nextRowNumber = state.rows.length;
        return googleSheet.getRange(startRow + nextRowNumber, startCol, numRows, numColumns);
    }
    function _groupInsertionsAndUpdates(rows){
        var existingRows = [];
        var newRows = [];
        rows.forEach(function (row) {
            if(_state.rowPkToRowMap.has(row[pkColumnIndex])){
                existingRows.push(row);
            }
            else {
                newRows.push(row);
            }
        });
        return {
            update: existingRows,
            insert: newRows
        }
    }
}

function GoogleSheetAdapterBuilder() {
    var _googleSheet, _pkColumnIndex, _headerRow, _startRow, _startCol;
    this.setSheet = function (googleSheet) {
        _googleSheet = googleSheet;
        return this;
    };
    this.setPrimaryKeyColumnIndex = function (number) {
        _pkColumnIndex = number;
        return this;
    };
    this.setHeaderRow = function (row) {
        _headerRow = row;
        return this;
    };
    this.setStartCell = function (startRow, startCol) {
        _startRow = startRow;
        _startCol = startCol;
        return this;
    };
    this.build = function () {
        return new GoogleSheetAdapter(_googleSheet, _pkColumnIndex, _headerRow, _startRow, _startCol);
    }
}