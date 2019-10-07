function GoogleRangeAdapter(googleSheet, pkColumnIndex, headerRow, startRow, startCol, numColumns) {
    var _rows, _rowRanges, _rowPkToRowMap, _primaryKeyToRowRange, _rowPkToRowIndex;
    this.getAll = function () {
        if(!_rows) _init();
        return _rows;
    };
    this.getByPk = function (primaryKey) {
        return _rowPkToRowMap.get(primaryKey);
    };
    this.saveOne = function (row) {
        if(!_rows) _init();
        if(_rowPkToRowMap.has(row[pkColumnIndex])){
            return _updateOne(row);
        }
        else {
            var rowRange = _allocateRowRange(row);
            _indexRowRange(row[pkColumnIndex], rowRange);
            _indexRow(row[pkColumnIndex], row);
            rowRange.setValues([row]);
            return row;
        }
    };
    this.saveBatch = function (rows) {
        if(!_rows) _init();
        var existingRows = [];
        var newRows = [];
        rows.forEach(function (row) {
            if(_rowPkToRowMap.has(row[pkColumnIndex])){
                existingRows.push(row);
            }
            else {
                newRows.push(row);
            }
        });
        var updatedRows = _updateBatch(existingRows);
        var insertedRows = _insertBatch(newRows);
        return updatedRows.concat(insertedRows);
    };
    this.removeOne = function (primaryKey) {
        if(!_rows) _init();
        var targetRowRange = _primaryKeyToRowRange.get(primaryKey);
        targetRowRange.deleteCells(SpreadsheetApp.Dimension.ROWS);
        _primaryKeyToRowRange.remove(primaryKey);
        _rowPkToRowMap.remove(primaryKey);
        var targetRowIndex = _rowPkToRowIndex.get(primaryKey);
        _rows.splice(targetRowIndex, 1);
    };

    function _init(){
        _rows = [];
        _rowRanges = [];
        _rowPkToRowMap = IndexApp.createOneToOneIndex();
        _primaryKeyToRowRange = IndexApp.createOneToOneIndex();
        _rowPkToRowIndex = IndexApp.createOneToOneIndex();
        var headerRange = googleSheet.getRange(startRow, startCol, 1, numColumns);
        if(headerRange.getValues()[0][pkColumnIndex] === "") headerRange.setValues([headerRow]);
        _indexRowRange(headerRow[pkColumnIndex], headerRange);
        _indexRow(headerRow[pkColumnIndex], headerRow);

        var currentRowCount = 1;
        var currentRowRange = googleSheet.getRange(startRow + currentRowCount, startCol, 1, numColumns);
        while(currentRowRange.getValues()[0][pkColumnIndex] !== ""){
            var rowPk = currentRowRange.getValues()[0][pkColumnIndex];
            _indexRowRange(rowPk, currentRowRange);
            _indexRow(rowPk, currentRowRange.getValues()[0]);
            currentRowCount++;
            currentRowRange = googleSheet.getRange(startRow + currentRowCount, startCol, 1, numColumns);
        }
    }
    function _allocateRowRange(row){
        var lastRange = _rowRanges[_rowRanges.length - 1];
        return googleSheet.getRange(lastRange.getRow() + 1, lastRange.getColumn(), 1, row.length);
    }
    function _indexRowRange(pk, rowRange) {
        _primaryKeyToRowRange.set(pk, rowRange);
        _rowRanges.push(rowRange);
    }
    function _indexRow(pk, row){
        _rowPkToRowMap.set(pk, row);
        var rowIndex = _rows.push(row);
        _rowPkToRowIndex.set(rowIndex);
    }
    function _insertBatch(rows){
        var lastRange = _rowRanges[_rowRanges.length - 1];
        var newRowsRange = googleSheet.getRange(lastRange.getRow(), lastRange.getColumn(), rows.length, headerRow.length);
        rows.forEach(function (row) {
            var rowRange = _allocateRowRange(row);
            _indexRowRange(row[pkColumnIndex], rowRange);
            _indexRow(row[pkColumnIndex], row);
        });
        newRowsRange.setValues(rows);
        return rows;
    }
    function _updateBatch(rows){
        rows.forEach(function (row) {
            _updateOne(row);
        });
        return rows;
    }
    function _updateOne(row){
        var rowRange = _primaryKeyToRowRange.get(row[pkColumnIndex]);
        rowRange.setValues([row]);
        return row;
    }
}

function GoogleRangeAdapterBuilder() {
    var _googleSheet, _pkColumnIndex, _headerRow, _startRow, _startCol, _numColumns;
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
    this.setNumberOfColumns = function (number) {
        _numColumns = number;
        return this;
    };
    this.build = function () {
        return new GoogleRangeAdapter(_googleSheet, _pkColumnIndex, _headerRow, _startRow, _startCol, _numColumns);
    }
}